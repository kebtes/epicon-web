import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import PropsTable from '../../PropsTable'

export default function Metrics() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'classification', label: 'Classification Metrics' },
      { id: 'regression', label: 'Regression Metrics' },
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Metrics</h1>

      <section id="classification" className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">Classification</h2>
        <CodeSnippet code={`from epicon.metrics import (
    accuracy_score, precision_score,
    recall_score, f1_score, confusion_matrix
)`} />
        <PropsTable columns={['Function', 'Description']} rows={[
          ['accuracy_score(y_true, y_pred)', 'Fraction of correct predictions'],
          ['confusion_matrix(y_true, y_pred, labels=None)', 'Confusion matrix (n_classes, n_classes)'],
          ['precision_score(y_true, y_pred, average=\'binary\', pos_label=1)', 'Precision with binary/macro/micro/weighted averaging'],
          ['recall_score(y_true, y_pred, average=\'binary\', pos_label=1)', 'Recall with same averaging options'],
          ['f1_score(y_true, y_pred, average=\'binary\', pos_label=1)', 'Harmonic mean of precision and recall'],
        ]} />
      </section>

      <section id="regression" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-white/10">Regression</h2>
        <CodeSnippet code={`from epicon.metrics import mean_squared_error, mean_absolute_error, r2_score`} />
        <PropsTable columns={['Function', 'Description']} rows={[
          ['mean_squared_error(y_true, y_pred)', 'MSE'],
          ['mean_absolute_error(y_true, y_pred)', 'MAE'],
          ['r2_score(y_true, y_pred)', 'Coefficient of determination (R\u00b2)'],
        ]} />
      </section>
    </div>
  )
}
