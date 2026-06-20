import { NavLink } from 'react-router-dom'
import { useDocs } from './DocsLayout'

const icons = {
  'Get Started': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  'Traditional ML': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  'Neural Networks': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <line x1="11" y1="7" x2="6.5" y2="16.5" />
      <line x1="13" y1="7" x2="17.5" y2="16.5" />
      <line x1="7.5" y1="17.5" x2="16.5" y2="17.5" />
    </svg>
  ),
  'Preprocessing': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="10" r="2" />
      <circle cx="20" cy="14" r="2" />
    </svg>
  ),
  'Datasets': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'Metrics': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'Advanced': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  'API Reference': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
}

const navItems = [
  { to: '/docs', label: 'Get Started', end: true },
  { to: '/docs/traditional-ml', label: 'Traditional ML' },
  { to: '/docs/neural-networks', label: 'Neural Networks' },
  { to: '/docs/preprocessing', label: 'Preprocessing' },
  { to: '/docs/datasets', label: 'Datasets' },
  { to: '/docs/metrics', label: 'Metrics' },
  { to: '/docs/advanced', label: 'Advanced' },
  { to: '/docs/api', label: 'API Reference' },
]

export default function DocsSidebar({ activeSection }) {
  const { toc } = useDocs()

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-black/40 self-start sticky top-0 max-h-[calc(100vh-3.5rem-3rem)] overflow-y-auto hidden md:block">
      <div className="px-4 py-6">
        <h4 className="text-[11px] tracking-widest uppercase text-white/30 mb-3 font-semibold">
          DOCS
        </h4>
        <nav className="flex flex-col gap-px">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `text-sm py-1.5 transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'text-white border-l-2 border-white pl-2 -ml-[2px]'
                    : 'text-white/50 hover:text-white/80 pl-3'
                }`
              }
            >
              <span className="shrink-0 opacity-60">{icons[item.label]}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {toc.length > 0 && (
        <div className="px-4 py-5 border-t border-white/5">
          <h4 className="text-[11px] tracking-widest uppercase text-white/30 mb-3 font-semibold">
            ON THIS PAGE
          </h4>
          <nav className="flex flex-col gap-px">
            {toc.map(item => (
              <div key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`block text-sm py-1 transition-colors ${
                    activeSection === item.id
                      ? 'text-white border-l-2 border-white pl-2 -ml-[2px]'
                      : 'text-white/40 hover:text-white/70 pl-3'
                  }`}
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="ml-4">
                    {item.children.map(child => (
                      <a
                        key={child.id}
                        href={`#${child.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(child.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={`block text-xs py-0.5 transition-colors ${
                          activeSection === child.id
                            ? 'text-white/90 border-l-2 border-white/60 pl-2 -ml-[2px]'
                            : 'text-white/30 hover:text-white/60 pl-3'
                        }`}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </aside>
  )
}
