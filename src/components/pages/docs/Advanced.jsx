import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import PropsTable from '../../PropsTable'
import SEO from '../../SEO'

export default function Advanced() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'model-builder', label: 'ModelBuilder' },
      { id: 'numba-acceleration', label: 'Numba Acceleration' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <SEO
        title="Advanced"
        description="Epicon advanced features: ModelBuilder for config-driven models and Numba JIT acceleration for faster tree splitting, KNN, and distance computations."
        canonicalUrl="https://epiconml.github.io/docs/advanced"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Epicon Advanced Features",
          "description": "ModelBuilder, Numba acceleration, and advanced Epicon features.",
        }}
      />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Advanced</h1>

      <section id="model-builder" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">Custom Model with ModelBuilder</h2>
        <p className="text-sm text-white/60 mb-3">Build models from configuration dictionaries.</p>
        <CodeSnippet code={`from epicon.utils import ModelBuilder

config = [
    {"type": "Dense", "n_inputs": 784, "n_neurons": 128},
    {"type": "ReLU"},
    {"type": "Dense", "n_inputs": 128, "n_neurons": 10},
    {"type": "Softmax"},
]

builder = ModelBuilder()
model = builder.build(config)`} />
      </section>

      <section id="numba-acceleration" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">Numba Acceleration</h2>
        <p className="text-sm text-white/60 mb-4">
          Epicon automatically accelerates key operations when Numba is installed. No code changes needed &mdash; acceleration is automatic when Numba is available.
        </p>
        <h4 className="text-sm font-semibold text-white/70 mb-2">Accelerated Operations</h4>
        <ul className="space-y-1 text-sm text-white/60 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-white/30 mt-0.5">-</span>
            Tree split finding (<code className="font-mono text-xs text-white/80">_best_split_numeric</code>)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/30 mt-0.5">-</span>
            Impurity calculations (<code className="font-mono text-xs text-white/80">_gini_impurity</code>, <code className="font-mono text-xs text-white/80">_entropy_impurity</code>, <code className="font-mono text-xs text-white/80">_mse_split</code>)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/30 mt-0.5">-</span>
            Distance computations (<code className="font-mono text-xs text-white/80">_euclidean_distance</code>, <code className="font-mono text-xs text-white/80">_manhattan_distance</code>)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/30 mt-0.5">-</span>
            KNN prediction (<code className="font-mono text-xs text-white/80">_knn_predict_single</code>)
          </li>
        </ul>
      </section>
    </div>
  )
}
