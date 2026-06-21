import { useEffect, useState } from 'react'
import { useReleases } from '../layout/ReleasesLayout'

export default function Releases() {
  const { setReleases } = useReleases()
  const [version, setVersion] = useState(null)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/kebtes/epicon/main/epicon/__init__.py')
      .then(r => r.text())
      .then(text => {
        const match = text.match(/__version__\s*=\s*["']([^"']+)["']/);
        if (match) setVersion(match[1]);
      })
      .catch(() => {});
  }, [])

  const releases = [
    {
      version: version ? `v${version}` : 'v0.2.0',
      date: 'June 2026',
      tag: 'First Beta Release',
      tagClass: 'text-green-400 border-green-400/30 bg-green-400/5',
      changes: [
        { type: 'added', items: [
          'Full Sequential API (Keras-style model building)',
          'Conv1D layer with configurable stride and padding',
          'Adam optimizer with learning rate decay',
          'Gradient clipping during training',
          'Model persistence — save/load models as JSON',
          'ModelBuilder for config-driven model construction',
          'Numba JIT acceleration for tree splits, distances, and KNN',
          'Preprocessing module: StandardScaler, MinMaxScaler, LabelEncoder, OneHotEncoder',
          'Built-in datasets: Iris, MNIST, synthetic generators',
          'Metrics module: accuracy, precision, recall, F1, MSE, MAE, R²',
          'train_test_split utility with random state',
          'LeakyReLU activation',
        ]},
        { type: 'changed', items: [
          'Unified fit/predict API across all model types',
        ]},
        { type: 'fixed', items: [
          'Stable softmax numerical computation',
          'BinaryCrossEntropy adjustable threshold',
        ]},
      ],
    },
  ]

  useEffect(() => {
    setReleases(releases.map(r => ({
      id: r.version.replace(/\./g, '-'),
      label: r.version,
      date: r.date,
    })))
    return () => setReleases([])
  }, [setReleases, version])

  return (
    <div className="text-white">
      <section id="overview" className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Release History
        </h1>
        <p className="text-white/60 max-w-3xl mb-6">
          Release history for the Epicon library. This is the first public release.
        </p>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xs p-5 max-w-3xl">
          <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Versioning</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            Epicon follows <span className="text-white/90">Semantic Versioning</span>. Until the 1.0.0 stable release,
            breaking changes may occur between minor versions. Patch versions indicate bug fixes and minor improvements.
          </p>
        </div>
      </section>

      {releases.map((release) => (
        <section key={release.version} id={release.version.replace(/\./g, '-')} className="mb-14">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {release.version.startsWith('v0.') ? 'beta ' : ''}{release.version}
            </h2>
            <span className="text-sm text-white/40 font-mono">{release.date}</span>
          </div>
          <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-2 py-0.5 border rounded-xs mb-6 ${release.tagClass}`}>
            {release.tag}
          </span>

          <div className="space-y-6">
            {release.changes.map(category => (
              category.items.length > 0 && (
                <div key={category.type}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/50">
                    {category.type}
                  </h3>
                  <ul className="space-y-1.5">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-white/30 mt-0.5 shrink-0">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
