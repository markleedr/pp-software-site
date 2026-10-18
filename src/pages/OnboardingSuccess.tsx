import { ButtonLink } from '@/components/Button'
import { OnboardingHeader } from '@/pages/OnboardingHeader'

export function OnboardingSuccess() {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader />
      <main className="container py-24 max-w-2xl">
        <h1 className="display text-4xl sm:text-5xl">payment received.</h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          We are setting up your account and first project now. The invite to your Owner login is
          emailed once setup finishes, which is usually within a few minutes. If it has not arrived
          in 15 minutes, check your spam folder, then book a call and we will sort it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="outline">
            Back to the site
          </ButtonLink>
        </div>
      </main>
    </div>
  )
}
