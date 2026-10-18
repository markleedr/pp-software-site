// Account provisioning after a successful checkout. Written against a small
// `ProvisionStore` interface so it is unit-tested with an in-memory fake and
// so the Supabase project can be swapped (e.g. to the CRM database) without
// touching the logic. Every step records its result on the order, so a webhook
// retry resumes where it stopped instead of duplicating records.
import type { SubscriptionRow } from './subscription.ts'

export interface OrderRecord {
  id: string
  status: string
  company_name: string
  contact_name: string
  contact_email: string
  first_project_name: string
  stage: string
  account_id: string | null
  project_id: string | null
  owner_user_id: string | null
  invited_at: string | null
}

export interface ProvisionStore {
  getOrder(id: string): Promise<OrderRecord | null>
  patchOrder(id: string, patch: Partial<OrderRecord> & Record<string, unknown>): Promise<void>
  createAccount(name: string): Promise<string>
  createProject(accountId: string, name: string, stage: string): Promise<string>
  /** Sends the Owner invite. Returns the user id, or null if the email already has a login. */
  inviteOwner(email: string, accountId: string): Promise<string | null>
  addMember(accountId: string, role: 'owner', userId: string | null, email: string): Promise<void>
  upsertSubscription(accountId: string, row: SubscriptionRow): Promise<void>
}

export type ProvisionResult = 'provisioned' | 'already_provisioned' | 'order_not_found'

export async function provisionFromCheckout(
  store: ProvisionStore,
  orderId: string,
  subscription: SubscriptionRow,
  customerId: string,
  now: () => Date = () => new Date(),
): Promise<ProvisionResult> {
  const order = await store.getOrder(orderId)
  if (!order) return 'order_not_found'
  if (order.status === 'provisioned') return 'already_provisioned'

  const accountId = order.account_id ?? (await store.createAccount(order.company_name))
  if (!order.account_id) await store.patchOrder(orderId, { account_id: accountId, status: 'paid' })

  let projectId = order.project_id
  if (!projectId) {
    projectId = await store.createProject(accountId, order.first_project_name, order.stage)
    await store.patchOrder(orderId, { project_id: projectId })
  }

  await store.upsertSubscription(accountId, { ...subscription, stripe_customer_id: customerId })

  let ownerId = order.owner_user_id
  if (!order.invited_at) {
    ownerId = await store.inviteOwner(order.contact_email, accountId)
    await store.addMember(accountId, 'owner', ownerId, order.contact_email)
    await store.patchOrder(orderId, {
      owner_user_id: ownerId,
      invited_at: now().toISOString(),
      provision_note: ownerId ? null : 'Email already has a login. Link it to the account manually.',
    })
  }

  await store.patchOrder(orderId, { status: 'provisioned' })
  return 'provisioned'
}
