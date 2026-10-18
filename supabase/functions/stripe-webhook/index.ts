// POST /functions/v1/stripe-webhook
// Verifies Stripe's signature, de-duplicates by event id, then:
//   checkout.session.completed      -> provision account, project, Owner invite, subscription
//   customer.subscription.updated/deleted -> keep `subscriptions` in step with Stripe
import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@17'
import { provisionFromCheckout, type ProvisionStore } from '../_shared/provision.ts'
import { subscriptionRowFromStripe, type StripeSubscriptionLike } from '../_shared/subscription.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

function check<T>(res: { data: T | null; error: { message: string } | null }, what: string): T {
  if (res.error || res.data === null) throw new Error(`${what}: ${res.error?.message ?? 'no data'}`)
  return res.data
}

function makeStore(client: SupabaseClient): ProvisionStore {
  return {
    async getOrder(id) {
      const { data, error } = await client.from('onboarding_orders').select('*').eq('id', id).maybeSingle()
      if (error) throw new Error(`getOrder: ${error.message}`)
      return data
    },
    async patchOrder(id, patch) {
      const { error } = await client.from('onboarding_orders').update(patch).eq('id', id)
      if (error) throw new Error(`patchOrder: ${error.message}`)
    },
    async createAccount(name) {
      return check(await client.from('accounts').insert({ name }).select('id').single(), 'createAccount').id
    },
    async createProject(accountId, name, stage) {
      return check(
        await client.from('projects').insert({ account_id: accountId, name, stage }).select('id').single(),
        'createProject',
      ).id
    },
    async inviteOwner(email, accountId) {
      const { data, error } = await client.auth.admin.inviteUserByEmail(email, {
        redirectTo: Deno.env.get('INVITE_REDIRECT_URL') ?? undefined,
        data: { account_id: accountId, role: 'owner' },
      })
      if (error) {
        if (/already.*(registered|exists)/i.test(error.message)) return null
        throw new Error(`inviteOwner: ${error.message}`)
      }
      return data.user.id
    },
    async addMember(accountId, role, userId, email) {
      const { error } = await client
        .from('account_members')
        .upsert({ account_id: accountId, user_id: userId, invited_email: email, role }, { onConflict: 'account_id,invited_email' })
      if (error) throw new Error(`addMember: ${error.message}`)
    },
    async upsertSubscription(accountId, row) {
      const { error } = await client
        .from('subscriptions')
        .upsert({ ...row, account_id: accountId, updated_at: new Date().toISOString() }, { onConflict: 'stripe_subscription_id' })
      if (error) throw new Error(`upsertSubscription: ${error.message}`)
    },
  }
}

async function handle(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode !== 'subscription' || !session.subscription) return
      const orderId = session.client_reference_id ?? session.metadata?.order_id
      if (!orderId) return
      const sub = await stripe.subscriptions.retrieve(String(typeof session.subscription === 'string' ? session.subscription : session.subscription.id))
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id ?? ''
      const result = await provisionFromCheckout(
        makeStore(db),
        orderId,
        subscriptionRowFromStripe(sub as unknown as StripeSubscriptionLike),
        customerId,
      )
      if (result === 'order_not_found') console.error('stripe-webhook: order not found', orderId)
      return
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const row = subscriptionRowFromStripe(event.data.object as unknown as StripeSubscriptionLike)
      // Only touches rows that provisioning already created; ordering between this and
      // checkout.session.completed is not guaranteed, so a miss is retried by Stripe's next event.
      const { error } = await db
        .from('subscriptions')
        .update({ ...row, updated_at: new Date().toISOString() })
        .eq('stripe_subscription_id', row.stripe_subscription_id)
      if (error) throw new Error(`subscription update: ${error.message}`)
      return
    }
  }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400 })

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    )
  } catch (err) {
    console.error('stripe-webhook: bad signature', err)
    return new Response('Invalid signature', { status: 400 })
  }

  // Claim the event id first; a duplicate delivery hits the primary key and is skipped.
  const claim = await db.from('stripe_events').insert({ id: event.id, type: event.type })
  if (claim.error) {
    if (claim.error.code === '23505') return new Response('Already processed', { status: 200 })
    console.error('stripe-webhook: claim failed', claim.error)
    return new Response('Server error', { status: 500 })
  }

  try {
    await handle(event)
    return new Response('ok', { status: 200 })
  } catch (err) {
    console.error('stripe-webhook: handler failed', event.id, err)
    // Release the claim so Stripe's retry runs the handler again (steps are idempotent).
    await db.from('stripe_events').delete().eq('id', event.id)
    return new Response('Handler error', { status: 500 })
  }
})
