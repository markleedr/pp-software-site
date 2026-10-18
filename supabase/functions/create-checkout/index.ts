// POST /functions/v1/create-checkout
// Validates the selections, recomputes the price on the server (the browser's
// number is never trusted), stores the signed agreement, and returns a Stripe
// Checkout URL.
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@17'
import { renderAgreementDocument, renderAgreementHtml, sha256Hex } from '../_shared/agreement.ts'
import { buildCheckoutParams } from '../_shared/checkout.ts'
import { corsHeaders, json } from '../_shared/http.ts'
import { computeQuote, QuoteError } from '../_shared/pricing.ts'
import { parseCheckoutRequest } from '../_shared/validate.ts'

const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? Deno.env.get('SITE_URL') ?? '').split(',').map((s) => s.trim())

Deno.serve(async (req) => {
  const cors = corsHeaders(req, allowedOrigins)
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, cors)

  try {
    const request = parseCheckoutRequest(await req.json().catch(() => null))
    const quote = computeQuote(request.selections)

    const effectiveDate = new Intl.DateTimeFormat('en-AU', { dateStyle: 'long', timeZone: 'Australia/Brisbane' }).format(new Date())
    const article = renderAgreementHtml(
      quote,
      {
        companyName: request.companyName,
        contactName: request.contactName,
        contactEmail: request.contactEmail,
        firstProjectName: request.firstProjectName,
      },
      effectiveDate,
    )
    const agreementHtml = renderAgreementDocument(article)

    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: order, error: orderError } = await db
      .from('onboarding_orders')
      .insert({
        tier: quote.tier,
        project_count: quote.projectCount,
        stage: quote.stage,
        services: quote.services,
        billing: quote.billing,
        quote,
        config_version: quote.configVersion,
        company_name: request.companyName,
        contact_name: request.contactName,
        contact_email: request.contactEmail,
        first_project_name: request.firstProjectName,
        agreement_html: agreementHtml,
        agreement_sha256: await sha256Hex(agreementHtml),
        signed_name: request.signedName,
        signed_ip: req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null,
        signed_user_agent: req.headers.get('user-agent'),
      })
      .select('id')
      .single()
    if (orderError || !order) throw new Error(`Could not save the order: ${orderError?.message}`)

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
    const session = await stripe.checkout.sessions.create(
      buildCheckoutParams({
        quote,
        orderId: order.id,
        customerEmail: request.contactEmail,
        siteUrl: Deno.env.get('SITE_URL')!,
        automaticTax: Deno.env.get('STRIPE_AUTOMATIC_TAX') === 'true',
      }) as unknown as Stripe.Checkout.SessionCreateParams,
    )
    await db.from('onboarding_orders').update({ stripe_checkout_session_id: session.id }).eq('id', order.id)

    return json({ url: session.url }, 200, cors)
  } catch (err) {
    // Validation and pricing errors are written for the customer; anything else is logged, not shown.
    if (err instanceof QuoteError || (err instanceof Error && /^(Enter|Type|Accept)/.test(err.message))) {
      return json({ error: err.message }, 400, cors)
    }
    console.error('create-checkout failed', err)
    return json({ error: 'Something went wrong starting checkout. Try again or book a demo.' }, 500, cors)
  }
})
