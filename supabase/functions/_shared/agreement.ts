// Standard agreement generator. Pure string building, so the browser preview
// and the server-stored copy come from the same code. Every interpolated value
// goes through esc(). The legal wording is a DRAFT for a lawyer to review.
import { pricingConfig } from './pricing.config.ts'
import { formatMoney, type PricingConfig, type Quote } from './pricing.ts'

export interface AgreementParty {
  companyName: string
  contactName: string
  contactEmail: string
  firstProjectName: string
}

export const PROVIDER = { name: 'Project Profile Pty Ltd', abn: '57 674 795 745' }

export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function renderAgreementHtml(
  quote: Quote,
  party: AgreementParty,
  effectiveDate: string,
  config: PricingConfig = pricingConfig,
): string {
  const tier = config.tiers[quote.tier]
  const stage = config.stages[quote.stage]
  const money = (c: number) => formatMoney(c, quote.currency)
  const serviceItems = quote.services.map((id) => `<li>${esc(config.services[id].label)}</li>`).join('')
  const deliverables = tier.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')
  const projects = `${quote.projectCount} ${quote.projectCount === 1 ? 'project' : 'projects'}`

  const billingClause = quote.upfront
    ? `The Customer pays the Setup Fee and a single upfront block of ${quote.upfront.months} months of the Subscription Fee (${money(quote.upfront.blockCents)}, which includes a ${quote.upfront.discountPct}% discount) at checkout. The block renews every ${quote.upfront.months} months at the then-current rate unless cancelled under clause 6.`
    : `The Customer pays the Setup Fee at checkout and the Subscription Fee of ${money(quote.monthlyCents)} each month in advance, starting at checkout.`

  return `<article class="agreement">
<h1>Software and services agreement</h1>
<p><strong>Effective date:</strong> ${esc(effectiveDate)}</p>

<h2>1. Parties</h2>
<p><strong>Provider:</strong> ${esc(PROVIDER.name)} (ABN ${esc(PROVIDER.abn)}), trading as Project Profile.</p>
<p><strong>Customer:</strong> ${esc(party.companyName)}, represented by ${esc(party.contactName)} (${esc(party.contactEmail)}).</p>

<h2>2. Plan and scope</h2>
<p><strong>Plan:</strong> ${esc(tier.label)}. <strong>Projects:</strong> ${esc(projects)}, starting with &ldquo;${esc(party.firstProjectName)}&rdquo; at the ${esc(stage.label.toLowerCase())} stage.</p>
<p><strong>Services included for each project:</strong></p>
<ul>${serviceItems}</ul>
<p><strong>Deliverables:</strong></p>
<ul>${deliverables}</ul>
<p>The Customer may invite an unlimited number of users, including partner agencies, to each project.</p>

<h2>3. Fees</h2>
<table>
<tbody>
<tr><th scope="row">Setup Fee (one-off, all projects)</th><td>${money(quote.setupFeeCents)}</td></tr>
<tr><th scope="row">Subscription Fee (per month, all projects)</th><td>${money(quote.monthlyCents)}</td></tr>
${quote.volumeDiscountPct > 0 ? `<tr><th scope="row">Volume discount included</th><td>${quote.volumeDiscountPct}%</td></tr>` : ''}
<tr><th scope="row">Due at checkout</th><td>${money(quote.dueTodayCents)}</td></tr>
</tbody>
</table>
<p>All fees are in Australian dollars and exclude GST, which is added where applicable (${Math.round(quote.gstRate * 100)}%).</p>

<h2>4. Billing</h2>
<p>${esc(billingClause)}</p>

<h2>5. Minimum term</h2>
<p>The minimum term is ${quote.minTermMonths} ${quote.minTermMonths === 1 ? 'month' : 'months'} from the effective date. Fees for the minimum term remain payable if the Customer cancels earlier.</p>

<h2>6. Cancellation</h2>
<p>After the minimum term, either party may cancel by giving 30 days&rsquo; written notice. The subscription ends at the end of the billing period in which the notice period expires.</p>

<h2>7. Customer data</h2>
<p>The Customer owns all data it uploads to or generates in the platform, including leads, content, creative and campaign results. The Provider uses that data only to deliver the services. On request, the Provider exports the Customer&rsquo;s data in a standard format.</p>

<h2>8. General</h2>
<p>This agreement is governed by the laws of Queensland, Australia. Liability is limited to the fees paid in the 12 months before the claim, to the extent the law allows. Electronic signature under the Electronic Transactions Act 1999 (Cth) is valid acceptance of this agreement.</p>
</article>`
}

export async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Wraps the agreement in a standalone document for storage, download and print-to-PDF. */
export function renderAgreementDocument(articleHtml: string): string {
  return `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><title>Project Profile agreement</title>
<style>
body{font-family:Montserrat,system-ui,sans-serif;color:#000;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55;font-size:14px}
h1{font-size:26px;text-transform:lowercase}h2{font-size:15px;margin-top:28px}
table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid #ddd;padding:8px 0;text-align:left}td{text-align:right}
@media print{body{margin:0}}
</style></head><body>${articleHtml}</body></html>`
}
