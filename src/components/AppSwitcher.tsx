import { useEffect, useRef, useState } from 'react'

// Mirrors the AppSwitcher shipped in the sibling product repos (Ad Proof,
// Campaign Report, etc.) so the tile grid and domains stay identical across
// the suite. One exception: this entry reads "Launch Planner" — the name
// debuting on this site — where the sibling copies still say "Project Base".
// Flagged to Mark as a follow-up to rename it everywhere else too.
const TOOLS = [
  {
    id: 'launch-planner',
    name: 'Launch Planner',
    tagline: 'Plan & scope',
    url: 'https://www.projectbase.com.au',
  },
  {
    id: 'conversion-pages',
    name: 'Conversion Pages',
    tagline: 'Landing pages',
    url: 'https://www.conversionpages.com.au',
  },
  {
    id: 'campaign-report',
    name: 'Campaign Report',
    tagline: 'Performance',
    url: 'https://www.campaignreport.com.au',
  },
  {
    id: 'lead-reactivation',
    name: 'Lead Reactivation',
    tagline: 'Re-engage database',
    url: 'https://leadreactivation.com.au/',
  },
  {
    id: 'content-proof',
    name: 'Content Proof',
    tagline: 'Review content',
    url: 'https://contentproof.com.au/',
  },
  {
    id: 'ad-proof',
    name: 'Ad Proof',
    tagline: 'Review ads',
    url: 'https://adproof.com.au/',
  },
] as const

type ToolId = (typeof TOOLS)[number]['id']

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#FFD600',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const IconLaunchPlanner = () => (
  <svg {...ICON_PROPS}>
    <rect x="3" y="3" width="7" height="7" rx="1" fill="#FFD600" opacity="0.35" />
    <rect x="14" y="3" width="7" height="7" rx="1" fill="#FFD600" opacity="0.35" />
    <rect x="3" y="14" width="7" height="7" rx="1" fill="#FFD600" opacity="0.35" />
    <line x1="17.5" y1="15" x2="17.5" y2="21" />
    <line x1="14.5" y1="18" x2="20.5" y2="18" />
  </svg>
)

const IconConversionPages = () => (
  <svg {...ICON_PROPS}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="7" y1="13" x2="17" y2="13" />
    <line x1="7" y1="16.5" x2="14" y2="16.5" />
  </svg>
)

const IconCampaignReport = () => (
  <svg {...ICON_PROPS}>
    <polyline points="2,12 6,12 9,6 12,18 15,10 18,14 22,14" />
  </svg>
)

const IconLeadReactivation = () => (
  <svg {...ICON_PROPS}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <polyline points="21,3 21,8 16,8" />
    <line x1="12" y1="7" x2="12" y2="12" />
    <line x1="12" y1="12" x2="15.5" y2="14.5" />
  </svg>
)

const IconContentProof = () => (
  <svg {...ICON_PROPS}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M9 12l2 2 4-4" />
    <line x1="8" y1="7" x2="16" y2="7" />
  </svg>
)

const IconAdProof = () => (
  <svg {...ICON_PROPS}>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M10 14l2 2 4-4" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </svg>
)

const ICON_MAP: Record<ToolId, React.FC> = {
  'launch-planner': IconLaunchPlanner,
  'conversion-pages': IconConversionPages,
  'campaign-report': IconCampaignReport,
  'lead-reactivation': IconLeadReactivation,
  'content-proof': IconContentProof,
  'ad-proof': IconAdProof,
}

const WaffleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    {[0, 6.5, 13].flatMap((y) =>
      [0, 6.5, 13].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="1" />),
    )}
  </svg>
)

interface AppSwitcherProps {
  currentTool?: ToolId
}

export default function AppSwitcher({ currentTool }: AppSwitcherProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center rounded-pill border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
        style={{ width: 36, height: 36 }}
        aria-label="Project Profile software suite"
        aria-expanded={open}
      >
        <WaffleIcon />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-[calc(100%+8px)] z-50 border border-border bg-card rounded-card"
          style={{
            width: 300,
            boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
            animation: 'appSwitcherIn 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards',
            transformOrigin: 'top right',
          }}
        >
          <div className="px-5 pt-4 pb-2">
            <span
              className="text-muted-foreground"
              style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px' }}
            >
              The suite
            </span>
          </div>

          <div className="px-4 pb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {TOOLS.map((tool, i) => {
              const isCurrent = tool.id === currentTool
              const Icon = ICON_MAP[tool.id]

              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    if (!isCurrent) window.open(tool.url, '_blank', 'noopener')
                  }}
                  className={`flex flex-col items-center rounded-lg px-1 py-3 transition-colors ${
                    isCurrent ? 'bg-primary/10' : 'hover:bg-muted/60'
                  }`}
                  style={{
                    cursor: isCurrent ? 'default' : 'pointer',
                    animation: `appSwitcherItemIn 0.25s ${0.04 * i}s cubic-bezier(0.34,1.56,0.64,1) both`,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-pill transition-transform"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'rgba(255,214,0,0.12)',
                      border: isCurrent ? '2px solid #FFD600' : '2px solid transparent',
                      boxShadow: isCurrent ? '0 0 0 3px rgba(255,214,0,0.18)' : 'none',
                    }}
                  >
                    <Icon />
                  </div>

                  {isCurrent && (
                    <div style={{ width: 16, height: 3, borderRadius: 2, background: '#FFD600', marginTop: 4 }} />
                  )}

                  <span className="text-foreground text-center mt-1.5 leading-tight" style={{ fontSize: 11, fontWeight: 600 }}>
                    {tool.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes appSwitcherIn {
          from { opacity: 0; transform: scale(0.96) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes appSwitcherItemIn {
          from { opacity: 0; transform: translateY(6px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
