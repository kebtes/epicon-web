import { useReleases } from './ReleasesLayout'

export default function ReleasesSidebar({ activeRelease }) {
  const { releases } = useReleases()

  if (releases.length === 0) return null

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-xl self-start sticky top-0 max-h-[calc(100vh-3.5rem-3rem)] overflow-y-auto hidden md:block">
      <div className="px-4 py-6">
        <h4 className="text-[11px] tracking-widest uppercase text-white/30 mb-3 font-semibold">
          RELEASES
        </h4>
        <nav className="flex flex-col gap-px">
          {releases.map(r => (
            <a
              key={r.id}
              href={`#${r.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(r.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`text-sm py-1.5 transition-colors ${
                activeRelease === r.id
                  ? 'text-white border-l-2 border-white pl-2 -ml-[2px]'
                  : 'text-white/40 hover:text-white/70 pl-3'
              }`}
            >
              <span className="uppercase">{r.label}</span>
              <span className="text-xs text-white/30 ml-2 font-mono normal-case">{r.date}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
