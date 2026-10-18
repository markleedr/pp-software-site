// Validates the untrusted create-checkout request body.
import type { Selections } from './pricing.ts'

export interface CheckoutRequest {
  selections: Selections
  companyName: string
  contactName: string
  contactEmail: string
  firstProjectName: string
  signedName: string
  agreed: boolean
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown, field: string, max = 120): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.length > max) {
    throw new Error(`Enter a valid ${field}.`)
  }
  return value.trim()
}

export function parseCheckoutRequest(body: unknown): CheckoutRequest {
  const b = (body ?? {}) as Record<string, unknown>
  const s = (b.selections ?? {}) as Record<string, unknown>
  const email = text(b.contactEmail, 'email', 200).toLowerCase()
  if (!EMAIL.test(email)) throw new Error('Enter a valid email.')
  const contactName = text(b.contactName, 'contact name')
  const signedName = text(b.signedName, 'signature')
  if (signedName.toLowerCase() !== contactName.toLowerCase()) {
    throw new Error('Type your full name exactly as entered above to sign.')
  }
  if (b.agreed !== true) throw new Error('Accept the agreement to continue.')
  return {
    selections: {
      tier: s.tier as Selections['tier'],
      projectCount: s.projectCount as number,
      stage: s.stage as Selections['stage'],
      services: s.services as Selections['services'],
      billing: s.billing as Selections['billing'],
    },
    companyName: text(b.companyName, 'company name'),
    contactName,
    contactEmail: email,
    firstProjectName: text(b.firstProjectName, 'project name'),
    signedName,
    agreed: true,
  }
}
