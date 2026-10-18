import { describe, expect, it } from 'vitest'
import { provisionFromCheckout, type OrderRecord, type ProvisionStore } from '@shared/provision'
import { subscriptionRowFromStripe } from '@shared/subscription'

const sub = subscriptionRowFromStripe({
  id: 'sub_1', customer: 'cus_1', status: 'active', current_period_end: 1790000000,
  metadata: { tier: 'platform', project_limit: '3', billing: 'monthly', min_term_months: '6' },
})

function fakeStore(order: Partial<OrderRecord> = {}, inviteResult: string | null = 'user-1') {
  const calls: string[] = []
  const o: OrderRecord = {
    id: 'o1', status: 'pending_payment', company_name: 'Acme', contact_name: 'Jo', contact_email: 'jo@acme.com',
    first_project_name: 'Tower', stage: 'launch', account_id: null, project_id: null, owner_user_id: null, invited_at: null, ...order,
  }
  const store: ProvisionStore = {
    getOrder: async (id) => (id === 'o1' ? { ...o } : null),
    patchOrder: async (_id, patch) => { calls.push('patch'); Object.assign(o, patch) },
    createAccount: async () => { calls.push('account'); return 'acc-1' },
    createProject: async () => { calls.push('project'); return 'proj-1' },
    inviteOwner: async () => { calls.push('invite'); return inviteResult },
    addMember: async () => { calls.push('member') },
    upsertSubscription: async () => { calls.push('subscription') },
  }
  return { store, calls, order: o }
}

describe('subscriptionRowFromStripe', () => {
  it('maps plan, project limit and status from metadata', () => {
    expect(sub).toMatchObject({ plan: 'platform', project_limit: 3, status: 'active', min_term_months: 6, cancel_at_period_end: false })
    expect(sub.current_period_end).toBe(new Date(1790000000 * 1000).toISOString())
  })
  it('reads the period end from the item on newer API versions and tolerates missing metadata', () => {
    const row = subscriptionRowFromStripe({ id: 's', customer: { id: 'c' }, status: 'past_due', items: { data: [{ current_period_end: 1790000000 }] } })
    expect(row.stripe_customer_id).toBe('c')
    expect(row.plan).toBeNull()
    expect(row.project_limit).toBeNull()
    expect(row.current_period_end).not.toBeNull()
  })
})

describe('provisionFromCheckout', () => {
  it('creates account, project, subscription and Owner invite', async () => {
    const { store, calls, order } = fakeStore()
    expect(await provisionFromCheckout(store, 'o1', sub, 'cus_1')).toBe('provisioned')
    expect(calls).toEqual(expect.arrayContaining(['account', 'project', 'subscription', 'invite', 'member']))
    expect(order.status).toBe('provisioned')
    expect(order.owner_user_id).toBe('user-1')
  })

  it('is a no-op the second time (webhook retry)', async () => {
    const { store, calls } = fakeStore({ status: 'provisioned' })
    expect(await provisionFromCheckout(store, 'o1', sub, 'cus_1')).toBe('already_provisioned')
    expect(calls).toEqual([])
  })

  it('resumes after a partial failure without duplicating records', async () => {
    const { store, calls } = fakeStore({ status: 'paid', account_id: 'acc-1', project_id: 'proj-1' })
    await provisionFromCheckout(store, 'o1', sub, 'cus_1')
    expect(calls).not.toContain('account')
    expect(calls).not.toContain('project')
    expect(calls).toContain('invite')
  })

  it('flags an existing login for manual linking instead of failing', async () => {
    const { store, order } = fakeStore({}, null)
    await provisionFromCheckout(store, 'o1', sub, 'cus_1')
    expect(order.status).toBe('provisioned')
    expect((order as Record<string, unknown>).provision_note).toMatch(/manually/)
  })

  it('reports an unknown order', async () => {
    const { store } = fakeStore()
    expect(await provisionFromCheckout(store, 'missing', sub, 'cus_1')).toBe('order_not_found')
  })
})
