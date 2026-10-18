// Onboarding price book. EVERY NUMBER HERE IS A PLACEHOLDER until Mark signs off.
//
// This file is the single source of truth: the browser (live price) and the
// Edge Functions (what Stripe actually charges) both import it, so changing a
// number here and deploying both sides is the only edit needed. All money is
// in cents, AUD, excluding GST.
import type { PricingConfig } from './pricing.ts'

export const pricingConfig: PricingConfig = {
  version: '2026-10-placeholder-1',
  currency: 'aud',
  gstRate: 0.1,
  maxSelfServeProjects: 20,

  tiers: {
    self_serve: {
      label: 'Self-serve',
      summary: 'You run the tools yourself. We set the project up and you drive.',
      baseMonthlyCents: 0,
      setupFeeCents: 49500,
      minTermMonths: 3,
      upfrontBlock: null,
      deliverables: [
        'Project workspace set up and configured',
        'Access to the tools you select, with unlimited seats',
        'Email support',
      ],
    },
    platform: {
      label: 'Platform',
      summary: 'You run the tools. We onboard your team and stay close.',
      baseMonthlyCents: 30000,
      setupFeeCents: 150000,
      minTermMonths: 6,
      upfrontBlock: { months: 6, discountPct: 5 },
      deliverables: [
        'Project workspace set up and configured',
        'Access to the tools you select, with unlimited seats',
        'Guided onboarding for your team and partner agencies',
        'Priority support and a monthly check-in',
      ],
    },
    done_for_you: {
      label: 'Done for you',
      summary: 'Project Profile runs delivery for you, on the same platform.',
      baseMonthlyCents: 180000,
      setupFeeCents: 350000,
      minTermMonths: 6,
      upfrontBlock: { months: 6, discountPct: 5 },
      deliverables: [
        'Project workspace set up and configured',
        'Access to the tools you select, with unlimited seats',
        'Project Profile manages campaign delivery for the selected services',
        'Monthly reporting and a strategy review',
      ],
    },
  },

  stages: {
    pre_launch: { label: 'Pre-launch', summary: 'Planning, before the project is public.', setupMultiplier: 1 },
    launch: { label: 'Launch', summary: 'Going to market now.', setupMultiplier: 1 },
    selling: { label: 'Selling', summary: 'Already on sale and selling.', setupMultiplier: 0.75 },
    final_stock: { label: 'Final stock', summary: 'Selling the last of the project.', setupMultiplier: 0.5 },
  },

  services: {
    launch_planner: { label: 'Launch Planner', monthlyCents: 4900 },
    content_proof: { label: 'Content Proof', monthlyCents: 22400 },
    ad_proof: { label: 'Ad Proof', monthlyCents: 22400 },
    conversion_pages: { label: 'Conversion Pages', monthlyCents: 24900 },
    campaign_report: { label: 'Campaign Report', monthlyCents: 44900 },
    lead_reactivation: { label: 'Lead Reactivation', monthlyCents: 19900 },
  },

  // Priced per project per month when every listed service is selected.
  suiteBundle: {
    label: 'Full suite',
    services: ['launch_planner', 'content_proof', 'ad_proof', 'conversion_pages', 'campaign_report'],
    monthlyCents: 89900,
  },

  // Discount on the recurring amount, by number of projects.
  volumeDiscounts: [
    { minProjects: 3, pct: 5 },
    { minProjects: 6, pct: 10 },
  ],
}
