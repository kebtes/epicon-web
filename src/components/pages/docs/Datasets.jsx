import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import PropsTable from '../../PropsTable'

export default function Datasets() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'load-iris', label: 'load_iris' },
      { id: 'load-mnist', label: 'load_mnist' },
      { id: 'make-classification', label: 'make_classification' },
      { id: 'make-regression', label: 'make_regression' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Datasets</h1>

      <section id="load-iris" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">load_iris</h2>
        <p className="text-sm text-white/60 mb-3">Load the Iris flower dataset (150 samples, 4 features, 3 classes).</p>
        <CodeSnippet code={`from epicon.datasets import load_iris

X, y = load_iris(return_X_y=True)

# Or as a Bunch object:
data = load_iris()
print(data.feature_names)
print(data.target_names)`} />
        <PropsTable rows={[
          ['return_X_y', 'bool', 'False', 'If True, returns (X, y) tuple'],
        ]} />
      </section>

      <section id="load-mnist" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">load_mnist</h2>
        <p className="text-sm text-white/60 mb-3">Load the MNIST handwritten digits dataset (784 features, 10 classes). X is normalized by 255.0.</p>
        <CodeSnippet code={`from epicon.datasets import load_mnist

X, y = load_mnist(return_X_y=True)`} />
      </section>

      <section id="make-classification" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">make_classification</h2>
        <p className="text-sm text-white/60 mb-3">Generate a random n-class classification dataset.</p>
        <CodeSnippet code={`from epicon.datasets import make_classification

X, y = make_classification(
    n_samples=100, n_features=10,
    n_classes=2, n_informative=5,
    random_state=42
)`} />
      </section>

      <section id="make-regression" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">make_regression</h2>
        <p className="text-sm text-white/60 mb-3">Generate a random regression dataset.</p>
        <CodeSnippet code={`from epicon.datasets import make_regression

X, y = make_regression(
    n_samples=100, n_features=10,
    noise=0.1, random_state=42
)`} />
      </section>
    </div>
  )
}
