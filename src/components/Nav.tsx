import { useEffect, useState } from 'react'
import AppSwitcher from './AppSwitcher'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 transition-colors duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
      }}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-baseline gap-1.5">
          <span
            className="font-extrabold lowercase tracking-tight leading-none transition-colors"
            style={{ fontSize: 20, color: scrolled ? '#000000' : '#FFFFFF' }}
          >
            project profile
            <span style={{ color: '#FFD600' }}>.</span>
          </span>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
            style={{ color: scrolled ? 'hsl(var(--muted-foreground))' : 'rgba(255,255,255,0.7)' }}
          >
            software
          </span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden sm:inline-block text-sm font-semibold transition-colors"
            style={{ color: scrolled ? '#000000' : '#FFFFFF' }}
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground transition-transform active:scale-[0.97] hover:brightness-95"
          >
            Start a project
          </a>
          <AppSwitcher dark={!scrolled} />
        </div>
      </div>
    </header>
  )
}
