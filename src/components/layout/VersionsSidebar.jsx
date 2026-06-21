import { useVersions } from './VersionsLayout'

export default function VersionsSidebar({ activeVersion }) {
  const { versions } = useVersions()

  if (versions.length === 0) return null

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-xl self-start sticky top-0 max-h-[calc(100vh-3.5rem-3rem)] overflow-y-auto hidden md:block">
      <div className="px-4 py-6">
        <h4 className="text-[11px] tracking-widest uppercase text-white/30 mb-3 font-semibold">
          VERSIONS
        </h4>
        <nav className="flex flex-col gap-px">
          {versions.map(v => (
            <a
              key={v.id}
              href={`#${v.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(v.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`text-sm py-1.5 transition-colors ${
                activeVersion === v.id
                  ? 'text-white border-l-2 border-white pl-2 -ml-[2px]'
                  : 'text-white/40 hover:text-white/70 pl-3'
              }`}
            >
              <span className="uppercase">{v.label}</span>
              <span className="text-xs text-white/30 ml-2 font-mono normal-case">{v.date}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
