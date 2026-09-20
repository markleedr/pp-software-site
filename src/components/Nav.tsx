import AppSwitcher from './AppSwitcher'
import { ButtonLink } from './Button'

export function Nav() {
  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2.5">
          <span
            className="flex items-center justify-center rounded-pill font-extrabold shrink-0"
            style={{ width: 36, height: 36, background: '#FFD600', color: '#000000', fontSize: 13 }}
          >
            PP
          </span>
          <span className="font-bold text-[17px] text-foreground">Project Profile</span>
          <span className="hidden sm:inline-flex items-center rounded-pill border border-border px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
            Software
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#suite" className="hover:text-foreground transition-colors">
            The suite
          </a>
          <a href="#why" className="hover:text-foreground transition-colors">
            Why
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <AppSwitcher />
          <ButtonLink href="#pricing" className="!px-5 !py-2 text-sm">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
