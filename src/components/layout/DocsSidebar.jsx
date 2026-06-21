import { NavLink } from 'react-router-dom'
import { useDocs } from './DocsLayout'

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
    <aside className="w-64 shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-xl self-start sticky top-0 max-h-[calc(100vh-3.5rem-3rem)] overflow-y-auto hidden md:block">
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
                `text-sm py-1.5 transition-colors ${
                  isActive
                    ? 'text-white border-l-2 border-white pl-2 -ml-[2px]'
                    : 'text-white/50 hover:text-white/80 pl-3'
                }`
              }
            >
              <span className="uppercase">{item.label}</span>
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
                  <span className="uppercase">{item.label}</span>
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
                        <span className="uppercase">{child.label}</span>
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
