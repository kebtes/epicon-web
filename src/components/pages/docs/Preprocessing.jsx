import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import PropsTable from '../../PropsTable'

export default function Preprocessing() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'standardscaler', label: 'StandardScaler' },
      { id: 'minmaxscaler', label: 'MinMaxScaler' },
      { id: 'labelencoder', label: 'LabelEncoder' },
      { id: 'onehotencoder', label: 'OneHotEncoder' },
      { id: 'train-test-split', label: 'train_test_split' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Preprocessing</h1>

      <section id="standardscaler" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">StandardScaler</h2>
        <p className="text-sm text-white/60 mb-3">Standardize features by removing mean and scaling to unit variance.</p>
        <CodeSnippet code={`from epicon.preprocessing import StandardScaler

scaler = StandardScaler(with_mean=True, with_std=True)
X_scaled = scaler.fit_transform(X)
X_original = scaler.inverse_transform(X_scaled)`} />
        <PropsTable rows={[
          ['with_mean', 'bool', 'True', 'Center the data'],
          ['with_std', 'bool', 'True', 'Scale to unit variance'],
        ]} />
        <p className="text-xs text-white/50"><span className="text-white/70">Attributes:</span> <code className="font-mono">mean_</code>, <code className="font-mono">std_</code>, <code className="font-mono">n_features_in_</code></p>
      </section>

      <section id="minmaxscaler" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">MinMaxScaler</h2>
        <p className="text-sm text-white/60 mb-3">Scale features to a given range, typically [0, 1].</p>
        <CodeSnippet code={`from epicon.preprocessing import MinMaxScaler

scaler = MinMaxScaler(feature_range=(0, 1))
X_scaled = scaler.fit_transform(X)`} />
        <PropsTable rows={[
          ['feature_range', 'tuple', '(0, 1)', 'Desired range'],
        ]} />
        <p className="text-xs text-white/50"><span className="text-white/70">Attributes:</span> <code className="font-mono">min_</code>, <code className="font-mono">scale_</code>, <code className="font-mono">data_min_</code>, <code className="font-mono">data_max_</code></p>
      </section>

      <section id="labelencoder" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">LabelEncoder</h2>
        <p className="text-sm text-white/60 mb-3">Encode target labels as integers 0 to n_classes-1.</p>
        <CodeSnippet code={`from epicon.preprocessing import LabelEncoder

encoder = LabelEncoder()
y_enc = encoder.fit_transform(['cat', 'dog', 'bird'])
y_original = encoder.inverse_transform([0, 1, 2])`} />
        <p className="text-xs text-white/50"><span className="text-white/70">Attributes:</span> <code className="font-mono">classes_</code></p>
      </section>

      <section id="onehotencoder" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">OneHotEncoder</h2>
        <p className="text-sm text-white/60 mb-3">Encode categorical features as one-hot arrays.</p>
        <CodeSnippet code={`from epicon.preprocessing import OneHotEncoder

encoder = OneHotEncoder()
X_ohe = encoder.fit_transform([['cat'], ['dog'], ['bird']])`} />
        <p className="text-xs text-white/50"><span className="text-white/70">Attributes:</span> <code className="font-mono">categories_</code></p>
      </section>

      <section id="train-test-split" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">train_test_split</h2>
        <p className="text-sm text-white/60 mb-3">Split arrays into random train and test subsets.</p>
        <CodeSnippet code={`from epicon.preprocessing import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`} />
        <PropsTable rows={[
          ['test_size', 'float | int', '0.2', 'Proportion (float) or absolute count (int)'],
          ['random_state', 'int | None', 'None', 'Random seed'],
        ]} />
        <p className="text-xs text-white/60">Returns <code className="font-mono text-white/80">(X_train, X_test, y_train, y_test)</code></p>
      </section>
    </div>
  )
}
