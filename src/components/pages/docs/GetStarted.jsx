import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import SEO from '../../SEO'

const nextSteps = [
  { to: '/docs/traditional-ml', title: 'Traditional ML Models', desc: 'Linear regression, random forests, SVMs, and more — all with a consistent fit/predict API.' },
  { to: '/docs/neural-networks', title: 'Neural Networks', desc: 'Build and train deep learning models with the Sequential API, custom layers, and optimizers.' },
  { to: '/docs/preprocessing', title: 'Preprocessing', desc: 'Scalers, encoders, and train/test splitting utilities.' },
  { to: '/docs/datasets', title: 'Datasets', desc: 'Built-in dataset loaders and synthetic data generators.' },
  { to: '/docs/metrics', title: 'Metrics', desc: 'Evaluation functions for classification and regression.' },
  { to: '/docs/advanced', title: 'Advanced', desc: 'ModelBuilder, Numba JIT acceleration, and custom configurations.' },
  { to: '/docs/api', title: 'API Reference', desc: 'Complete index of all modules, classes, and functions.' },
]

export default function GetStarted() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'overview', label: 'Overview' },
      { id: 'installation', label: 'Installation', children: [
        { id: 'minimal-install', label: 'Minimal Install' },
        { id: 'numba-acceleration', label: 'With Numba' },
        { id: 'all-extras', label: 'All Extras' },
      ]},
      { id: 'quickstart', label: 'Quickstart', children: [
        { id: 'traditional-ml-quickstart', label: 'Traditional ML' },
        { id: 'neural-network-quickstart', label: 'Neural Network' },
      ]},
      { id: 'next-steps', label: 'Next Steps' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <SEO
        title="Getting Started"
        description="Learn how to install Epicon and get started with traditional ML models and neural networks. Minimal dependencies, unified fit/predict API, pure Python."
        canonicalUrl="https://epiconml.github.io/docs"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Getting Started with Epicon",
          "description": "Installation guide and quickstart for Epicon ML library.",
          "proficiencyLevel": "Beginner",
        }}
      />
      <section id="overview" className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Get Started
        </h1>
        <blockquote className="border-l-2 border-white/20 pl-4 italic text-white/60 text-lg mb-6">
          Machine learning, stripped down.
        </blockquote>
        <p className="text-white/70 leading-relaxed mb-6 max-w-3xl">
          Epicon is a lightweight, from-scratch ML library built on NumPy with optional Numba acceleration.
          It provides a unified API for neural networks <em>and</em> traditional ML models — all with minimal
          dependencies.
        </p>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xs p-5 max-w-3xl">
          <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Design Principles</h4>
          <ul className="space-y-2">
            {[
              'Simple, consistent fit/predict API across all models',
              'Minimal dependencies — NumPy required, everything else optional',
              'Educational transparency — readable, documented source',
              'Fast execution via vectorized NumPy and optional Numba JIT',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-white/30 mt-0.5">-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="installation" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">
          Installation
        </h2>

        <h3 id="minimal-install" className="text-lg font-semibold mb-3 text-white/80">
          Minimal Install
        </h3>
        <p className="text-sm text-white/60 mb-3">Core library with NumPy-only dependencies.</p>
        <CodeSnippet code={`pip install numpy
pip install -e .`} />

        <h3 id="numba-acceleration" className="text-lg font-semibold mb-3 mt-8 text-white/80">
          With Numba Acceleration
        </h3>
        <p className="text-sm text-white/60 mb-3">Optional JIT compilation for faster tree splitting, distance computations, and more.</p>
        <CodeSnippet code={`pip install numba
pip install -e .`} />

        <h3 id="all-extras" className="text-lg font-semibold mb-3 mt-8 text-white/80">
          All Extras
        </h3>
        <p className="text-sm text-white/60 mb-3">Install everything including optional dependencies.</p>
        <CodeSnippet code={`pip install -e .[all]`} />

        <div className="mt-6 p-4 border border-white/10 rounded-xs bg-white/[0.02] backdrop-blur-xl max-w-3xl">
          <h4 className="text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider">Dependencies</h4>
          <ul className="space-y-1 text-sm text-white/60">
            <li><span className="text-white/80">Required:</span> NumPy &ge; 1.21</li>
            <li><span className="text-white/80">Optional:</span> Numba &ge; 0.56 (JIT acceleration)</li>
            <li><span className="text-white/80">Optional:</span> pandas (CSV dataset loading)</li>
            <li><span className="text-white/80">Optional:</span> tqdm, tabulate (training progress, model summaries)</li>
          </ul>
        </div>
      </section>

      <section id="quickstart" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">
          Quickstart
        </h2>

        <h3 id="traditional-ml-quickstart" className="text-lg font-semibold mb-3 text-white/80">
          Traditional ML &mdash; Random Forest on Iris
        </h3>
        <p className="text-sm text-white/60 mb-3">Classify iris flowers with a random forest in a few lines.</p>
        <CodeSnippet code={`import epicon
from epicon.datasets import load_iris
from epicon.preprocessing import train_test_split
from epicon.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

model = epicon.RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")`} />

        <h3 id="neural-network-quickstart" className="text-lg font-semibold mb-3 mt-8 text-white/80">
          Neural Network &mdash; Sequential API on MNIST
        </h3>
        <p className="text-sm text-white/60 mb-3">Build and train a feed-forward network on MNIST digits.</p>
        <CodeSnippet code={`import numpy as np
from epicon import Sequential
from epicon.layers import Dense
from epicon.losses import CategoricalCrossEntropy
from epicon.optimizers import Adam
from epicon.datasets import load_mnist
from epicon.preprocessing import train_test_split

X, y = load_mnist(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = Sequential([
    Dense(784, 128, activation='relu'),
    Dense(128, 64, activation='relu'),
    Dense(64, 10, activation='softmax'),
])
model.compile(loss=CategoricalCrossEntropy(), optimizer=Adam(learning_rate=0.001))
model.fit(X_train, y_train, epochs=5, batch_size=32)`} />
      </section>

      <section id="next-steps" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">
          Next Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {nextSteps.map(step => (
            <Link
              key={step.to}
              to={step.to}
              className="block p-4 border border-white/10 rounded-xs hover:border-white/30 transition-colors bg-white/[0.02] backdrop-blur-xl group"
            >
              <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-1">
                {step.title} &rarr;
              </h3>
              <p className="text-xs text-white/50 leading-relaxed">
                {step.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
