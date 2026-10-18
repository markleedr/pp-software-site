import type { Selections } from '@shared/pricing'

export interface CheckoutPayload {
  selections: Selections
  companyName: string
  contactName: string
  contactEmail: string
  firstProjectName: string
  signedName: string
  agreed: boolean
}

export const DEMO_URL = 'https://www.projectprofile.agency/discovery'

export async function startCheckout(payload: CheckoutPayload): Promise<string> {
  const base = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  if (!base || !key) throw new Error('Checkout is not configured yet. Book a demo and we will set you up.')
  const res = await fetch(`${base}/functions/v1/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify(payload),
  })
  const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
  if (!res.ok || !body.url) throw new Error(body.error ?? 'Could not start checkout. Try again or book a demo.')
  return body.url
}
