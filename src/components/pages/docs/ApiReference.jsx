import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import PropsTable from '../../PropsTable'

const topLevelExports = [
  'Model', 'Sequential', 'Dense', 'Dropout', 'Conv1D', 'Layer',
  'ReLU', 'LeakyReLU', 'Sigmoid', 'Softmax', 'Tanh', 'Activation',
  'MSE', 'BinaryCrossEntropy', 'CategoricalCrossEntropy', 'Loss',
  'GradientDescent', 'Momentum', 'Adam', 'Optimizer',
  'LinearRegression', 'LogisticRegression', 'Ridge', 'Lasso',
  'KNeighborsClassifier', 'KNeighborsRegressor', 'GaussianNB',
  'DecisionTreeClassifier', 'DecisionTreeRegressor',
  'RandomForestClassifier', 'RandomForestRegressor',
  'StandardScaler', 'MinMaxScaler', 'LabelEncoder', 'OneHotEncoder',
  'train_test_split',
  'load_iris', 'load_mnist', 'make_classification', 'make_regression',
  'accuracy_score', 'precision_score', 'recall_score', 'f1_score',
  'confusion_matrix', 'mean_squared_error', 'mean_absolute_error', 'r2_score',
]

const submodules = [
  { name: 'epicon.layers', contents: 'Dense, Dropout, Conv1D, Layer' },
  { name: 'epicon.activations', contents: 'ReLU, LeakyReLU, Sigmoid, Softmax, Tanh, Activation' },
  { name: 'epicon.losses', contents: 'MSE, BinaryCrossEntropy, CategoricalCrossEntropy, Loss' },
  { name: 'epicon.optimizers', contents: 'GradientDescent, Momentum, Adam, Optimizer' },
  { name: 'epicon.models', contents: 'Model, Sequential' },
  { name: 'epicon.linear_model', contents: 'LinearRegression, LogisticRegression, Ridge, Lasso' },
  { name: 'epicon.tree', contents: 'DecisionTreeClassifier, DecisionTreeRegressor' },
  { name: 'epicon.ensemble', contents: 'RandomForestClassifier, RandomForestRegressor' },
  { name: 'epicon.neighbors', contents: 'KNeighborsClassifier, KNeighborsRegressor' },
  { name: 'epicon.naive_bayes', contents: 'GaussianNB' },
  { name: 'epicon.preprocessing', contents: 'StandardScaler, MinMaxScaler, LabelEncoder, OneHotEncoder, train_test_split' },
  { name: 'epicon.datasets', contents: 'load_iris, load_mnist, make_classification, make_regression' },
  { name: 'epicon.metrics', contents: 'accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, mean_squared_error, mean_absolute_error, r2_score' },
  { name: 'epicon.utils', contents: 'LAYER_REGISTERY, ModelBuilder' },
]

export default function ApiReference() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'top-level', label: 'Top-Level' },
      { id: 'submodules', label: 'Submodules' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">API Reference</h1>
      <p className="text-white/60 mb-10 max-w-3xl">
        Complete index of all public exports in the Epicon library.
      </p>

      <section id="top-level" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">Top-Level (<code className="text-base font-mono">epicon.*</code>)</h2>
        <div className="flex flex-wrap gap-1.5">
          {topLevelExports.map(name => (
            <span key={name} className="px-2.5 py-1 text-xs font-mono bg-white/[0.03] border border-white/10 rounded-xs text-white/70 hover:text-white hover:border-white/30 transition-colors">
              {name}
            </span>
          ))}
        </div>
      </section>

      <section id="submodules" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">Submodules</h2>
        <PropsTable columns={['Module', 'Contents']} rows={submodules.map(m => [m.name, m.contents])} />
      </section>
    </div>
  )
}
