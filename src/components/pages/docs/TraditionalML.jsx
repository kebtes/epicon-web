import { useEffect } from 'react'
import { useDocs } from '../../layout/DocsLayout'
import CodeSnippet from '../../CodeSnippet'
import PropsTable from '../../PropsTable'

export default function TraditionalML() {
  const { setToc } = useDocs()

  useEffect(() => {
    setToc([
      { id: 'linear-models', label: 'Linear Models', children: [
        { id: 'linearregression', label: 'LinearRegression' },
        { id: 'ridge', label: 'Ridge' },
        { id: 'lasso', label: 'Lasso' },
        { id: 'logisticregression', label: 'LogisticRegression' },
      ]},
      { id: 'tree-based-models', label: 'Tree-Based Models', children: [
        { id: 'decisiontreeclassifier', label: 'DecisionTreeClassifier' },
        { id: 'decisiontreeregressor', label: 'DecisionTreeRegressor' },
      ]},
      { id: 'ensemble-models', label: 'Ensemble Models', children: [
        { id: 'randomforestclassifier', label: 'RandomForestClassifier' },
        { id: 'randomforestregressor', label: 'RandomForestRegressor' },
      ]},
      { id: 'nearest-neighbors', label: 'Nearest Neighbors', children: [
        { id: 'kneighborsclassifier', label: 'KNeighborsClassifier' },
        { id: 'kneighborsregressor', label: 'KNeighborsRegressor' },
      ]},
      { id: 'naive-bayes', label: 'Naive Bayes', children: [
        { id: 'gaussiannb', label: 'GaussianNB' },
      ]},
    ])
    return () => setToc([])
  }, [setToc])

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Traditional ML</h1>
      <p className="text-white/60 mb-10 max-w-3xl">
        All models follow the same <code className="text-white/80 bg-white/5 px-1 rounded-xs text-sm font-mono">fit(X, y)</code> / <code className="text-white/80 bg-white/5 px-1 rounded-xs text-sm font-mono">predict(X)</code> / <code className="text-white/80 bg-white/5 px-1 rounded-xs text-sm font-mono">score(X, y)</code> pattern.
      </p>

      <section id="linear-models" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Linear Models</h2>

        <h3 id="linearregression" className="text-lg font-semibold mb-3 text-white/80 mt-8">LinearRegression</h3>
        <p className="text-sm text-white/60 mb-3">Ordinary Least Squares linear regression. Supports both closed-form (Normal Equation) and gradient descent.</p>
        <CodeSnippet code={`from epicon import LinearRegression

model = LinearRegression(fit_intercept=True, method='normal_eq')
model.fit(X_train, y_train)
model.predict(X_test)
model.score(X_test, y_test)`} />
        <PropsTable rows={[
          ['fit_intercept', 'bool', 'True', 'Whether to fit an intercept term'],
          ['method', 'str', '"normal_eq"', 'Solver: "normal_eq" or "gd"'],
          ['learning_rate', 'float', '0.01', 'Step size for gradient descent'],
          ['epochs', 'int', '1000', 'Number of passes for gradient descent'],
          ['tol', 'float', '1e-8', 'Convergence tolerance'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">coef_</code>, <code className="font-mono">intercept_</code></p>

        <h3 id="ridge" className="text-lg font-semibold mb-3 mt-8 text-white/80">Ridge</h3>
        <p className="text-sm text-white/60 mb-3">Linear regression with L2 regularization (Tikhonov). Closed-form solution.</p>
        <CodeSnippet code={`from epicon import Ridge

model = Ridge(alpha=1.0, fit_intercept=True)
model.fit(X_train, y_train)`} />
        <PropsTable rows={[
          ['alpha', 'float', '1.0', 'Regularization strength (>= 0)'],
          ['fit_intercept', 'bool', 'True', 'Whether to fit an intercept'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">coef_</code>, <code className="font-mono">intercept_</code></p>

        <h3 id="lasso" className="text-lg font-semibold mb-3 mt-8 text-white/80">Lasso</h3>
        <p className="text-sm text-white/60 mb-3">Linear regression with L1 regularization. Uses coordinate descent with soft-thresholding. Can drive coefficients to zero (feature selection).</p>
        <CodeSnippet code={`from epicon import Lasso

model = Lasso(alpha=0.1, fit_intercept=True)
model.fit(X_train, y_train)`} />
        <PropsTable rows={[
          ['alpha', 'float', '1.0', 'Regularization strength (>= 0)'],
          ['fit_intercept', 'bool', 'True', 'Whether to fit an intercept'],
          ['max_iter', 'int', '1000', 'Maximum coordinate descent iterations'],
          ['tol', 'float', '1e-4', 'Convergence tolerance'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">coef_</code>, <code className="font-mono">intercept_</code></p>

        <h3 id="logisticregression" className="text-lg font-semibold mb-3 mt-8 text-white/80">LogisticRegression</h3>
        <p className="text-sm text-white/60 mb-3">Binary logistic regression with sigmoid activation and cross-entropy loss. Supports L1/L2 regularization.</p>
        <CodeSnippet code={`from epicon import LogisticRegression

model = LogisticRegression(penalty='l2', C=1.0)
model.fit(X_train, y_train)
model.predict_proba(X_test)`} />
        <PropsTable rows={[
          ['fit_intercept', 'bool', 'True', 'Whether to fit an intercept'],
          ['learning_rate', 'float', '0.01', 'Step size for gradient descent'],
          ['epochs', 'int', '1000', 'Number of passes over the data'],
          ['tol', 'float', '1e-8', 'Convergence tolerance'],
          ['C', 'float', '1.0', 'Inverse regularization strength'],
          ['penalty', 'str | None', 'None', "'l1', 'l2', or None"],
        ]} />
        <p className="text-xs text-white/50 mb-6">
          <span className="text-white/70">Attributes:</span> <code className="font-mono">coef_</code>, <code className="font-mono">intercept_</code>
          &nbsp;&middot;&nbsp;
          <span className="text-white/70">Methods:</span> <code className="font-mono">predict_proba(X)</code> returns <code className="font-mono">(n_samples, 2)</code> with <code className="font-mono">[P(y=0), P(y=1)]</code>
        </p>
      </section>

      <section id="tree-based-models" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Tree-Based Models</h2>

        <h3 id="decisiontreeclassifier" className="text-lg font-semibold mb-3 mt-8 text-white/80">DecisionTreeClassifier</h3>
        <p className="text-sm text-white/60 mb-3">Non-parametric classification tree supporting Gini impurity or entropy.</p>
        <CodeSnippet code={`from epicon import DecisionTreeClassifier

model = DecisionTreeClassifier(criterion='gini', max_depth=5)
model.fit(X_train, y_train)
model.predict_proba(X_test)`} />
        <PropsTable rows={[
          ['criterion', 'str', "'gini'", "'gini' or 'entropy'"],
          ['max_depth', 'int | None', 'None', 'Maximum tree depth'],
          ['min_samples_split', 'int', '2', 'Min samples to split a node'],
          ['min_samples_leaf', 'int', '1', 'Min samples at a leaf'],
          ['max_features', 'int | None', 'None', 'Features to consider per split'],
          ['random_state', 'int | None', 'None', 'Random seed'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">classes_</code>, <code className="font-mono">n_classes_</code>, <code className="font-mono">feature_importances_</code>, <code className="font-mono">tree_</code></p>

        <h3 id="decisiontreeregressor" className="text-lg font-semibold mb-3 mt-8 text-white/80">DecisionTreeRegressor</h3>
        <p className="text-sm text-white/60 mb-3">Regression tree using MSE or MAE as splitting criterion.</p>
        <CodeSnippet code={`from epicon import DecisionTreeRegressor

model = DecisionTreeRegressor(criterion='mse', max_depth=5)
model.fit(X_train, y_train)`} />
        <PropsTable rows={[
          ['criterion', 'str', "'mse'", "'mse' or 'mae'"],
          ['max_depth', 'int | None', 'None', 'Maximum tree depth'],
          ['min_samples_split', 'int', '2', 'Min samples to split a node'],
          ['min_samples_leaf', 'int', '1', 'Min samples at a leaf'],
          ['max_features', 'int | None', 'None', 'Features to consider per split'],
          ['random_state', 'int | None', 'None', 'Random seed'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">tree_</code>, <code className="font-mono">feature_importances_</code></p>
      </section>

      <section id="ensemble-models" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Ensemble Models</h2>

        <h3 id="randomforestclassifier" className="text-lg font-semibold mb-3 mt-8 text-white/80">RandomForestClassifier</h3>
        <p className="text-sm text-white/60 mb-3">Ensemble of decision tree classifiers trained on bootstrap samples.</p>
        <CodeSnippet code={`from epicon import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, max_depth=10)
model.fit(X_train, y_train)
model.predict_proba(X_test)
model.score(X_test, y_test)`} />
        <PropsTable rows={[
          ['n_estimators', 'int', '100', 'Number of trees'],
          ['max_depth', 'int | None', 'None', 'Maximum tree depth'],
          ['min_samples_split', 'int', '2', 'Min samples to split a node'],
          ['min_samples_leaf', 'int', '1', 'Min samples at a leaf'],
          ['max_features', 'str', "'sqrt'", "'sqrt', 'log2', or int"],
          ['bootstrap', 'bool', 'True', 'Whether to use bootstrap sampling'],
          ['random_state', 'int | None', 'None', 'Random seed'],
          ['n_jobs', 'int', '1', 'Number of parallel jobs'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">estimators_</code>, <code className="font-mono">classes_</code>, <code className="font-mono">feature_importances_</code></p>

        <h3 id="randomforestregressor" className="text-lg font-semibold mb-3 mt-8 text-white/80">RandomForestRegressor</h3>
        <p className="text-sm text-white/60 mb-3">Ensemble of decision tree regressors.</p>
        <CodeSnippet code={`from epicon import RandomForestRegressor

model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)
model.score(X_test, y_test)`} />
        <PropsTable rows={[
          ['n_estimators', 'int', '100', 'Number of trees'],
          ['max_depth', 'int | None', 'None', 'Maximum tree depth'],
          ['min_samples_split', 'int', '2', 'Min samples to split a node'],
          ['min_samples_leaf', 'int', '1', 'Min samples at a leaf'],
          ['max_features', 'str', "'sqrt'", "'sqrt', 'log2', or int"],
          ['bootstrap', 'bool', 'True', 'Whether to use bootstrap sampling'],
          ['random_state', 'int | None', 'None', 'Random seed'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">estimators_</code>, <code className="font-mono">feature_importances_</code></p>
      </section>

      <section id="nearest-neighbors" className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Nearest Neighbors</h2>

        <h3 id="kneighborsclassifier" className="text-lg font-semibold mb-3 mt-8 text-white/80">KNeighborsClassifier</h3>
        <p className="text-sm text-white/60 mb-3">Classifier implementing k-nearest neighbors vote.</p>
        <CodeSnippet code={`from epicon import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5, metric='euclidean', weights='uniform')
model.fit(X_train, y_train)
model.predict_proba(X_test)`} />
        <PropsTable rows={[
          ['n_neighbors', 'int', '5', 'Number of neighbors'],
          ['metric', 'str', "'euclidean'", "'euclidean' or 'manhattan'"],
          ['weights', 'str', "'uniform'", "'uniform' or 'distance'"],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">X_train</code>, <code className="font-mono">y_train</code>, <code className="font-mono">classes_</code></p>

        <h3 id="kneighborsregressor" className="text-lg font-semibold mb-3 mt-8 text-white/80">KNeighborsRegressor</h3>
        <p className="text-sm text-white/60 mb-3">Regression based on k-nearest neighbors.</p>
        <CodeSnippet code={`from epicon import KNeighborsRegressor

model = KNeighborsRegressor(n_neighbors=5)
model.fit(X_train, y_train)
model.score(X_test, y_test)`} />
        <p className="text-xs text-white/60 mb-6">Parameters are the same as <code className="font-mono text-white/80">KNeighborsClassifier</code>.</p>
      </section>

      <section id="naive-bayes" className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6 pb-2 border-b border-white/10">Naive Bayes</h2>

        <h3 id="gaussiannb" className="text-lg font-semibold mb-3 mt-8 text-white/80">GaussianNB</h3>
        <p className="text-sm text-white/60 mb-3">Gaussian Naive Bayes classifier. Assumes features follow a normal distribution.</p>
        <CodeSnippet code={`from epicon import GaussianNB

model = GaussianNB(var_smoothing=1e-9)
model.fit(X_train, y_train)
model.predict_proba(X_test)`} />
        <PropsTable rows={[
          ['var_smoothing', 'float', '1e-9', 'Added to variances for stability'],
        ]} />
        <p className="text-xs text-white/50 mb-6"><span className="text-white/70">Attributes:</span> <code className="font-mono">classes_</code>, <code className="font-mono">class_prior_</code>, <code className="font-mono">theta_</code> (means), <code className="font-mono">var_</code> (variances)</p>
      </section>
    </div>
  )
}
