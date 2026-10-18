import { ButtonLink } from '@/components/Button'
import { DEMO_URL } from '@/lib/onboarding/api'

export function OnboardingHeader() {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2.5">
          <span
            className="flex items-center justify-center rounded-pill font-extrabold shrink-0"
            style={{ width: 36, height: 36, background: '#FFD600', color: '#000000', fontSize: 13 }}
          >
            PP
          </span>
          <span className="font-bold text-[17px]">Project Profile</span>
        </a>
        <ButtonLink href={DEMO_URL} target="_blank" rel="noopener noreferrer" variant="outline" className="!px-5 !py-2 text-sm">
          Book a demo
        </ButtonLink>
      </div>
    </header>
  )
}
