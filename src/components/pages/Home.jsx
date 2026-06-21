import { useState, useEffect } from 'react'
import CodeSnippet from "../CodeSnippet";
import Features from "../Features";

const metrics = [
  { value: '< 1MB', label: 'Install Size' },
  { value: '10×', label: 'Faster Training' },
  { value: '0', label: 'Dependencies' },
  { value: '100%', label: 'Pure Python' },
];

function Home() {
  const [copied, setCopied] = useState(false);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/kebtes/epicon/main/epicon/__init__.py')
      .then(r => r.text())
      .then(text => {
        const match = text.match(/__version__\s*=\s*["']([^"']+)["']/);
        if (match) setVersion(match[1]);
      })
      .catch(() => {});
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText('pip install epicon');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-white px-4 pt-20">
      <div className="relative inline-block mb">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tight logo uppercase">
          EPICON
        </h1>
        {version && (
          <span className="absolute uppercase -top-1 -right-1 md:-top-2 md:-right-2 text-[10px] md:text-xs font-sans font-semibold tracking-normal text-white bg-green-600 px-1.5 py-0.5 rounded-xs">
            {version.startsWith('0.') ? 'beta' : ''} v{version}
          </span>
        )}
      </div>
      <p className="text-sm md:text-base text-center font-extralight text-white/70 mb-5 tracking-widest uppercase">
        LIGHTWEIGHT MACHINE LEARNING LIBRARY
      </p>

      <div className="mb-5">
        <div
          onClick={handleCopy}
          className="group flex bg-black/20 backdrop-blur-xs border border-white/10 rounded-xs items-center px-6 py-3 cursor-pointer hover:gap-3 hover:border-white/30 transition-colors"
        >
          <code className="text-white/60 text-sm">
            pip install epicon
          </code>
          <span className="w-0 overflow-hidden group-hover:w-5 flex items-center justify-end transition-all duration-200 text-white/40 group-hover:text-white/40">
            {copied ? (
              <span key="check" className="animate-pop-in inline-flex">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            ) : (
              <span key="copy" className="animate-pop-in inline-flex">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-px border border-white/5 rounded-xs overflow-hidden">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="bg-white/2 px-5 py-4 text-center"
          >
            <div className="text-lg md:text-xl font-semibold tracking-tight text-white/80">
              {m.value}
            </div>
            <div className="text-[11px] tracking-widest uppercase text-white/30 mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div> */}

      {/* <Features /> */}

      <div className="w-full max-w-2xl mx-auto overflow-hidden">
      <CodeSnippet files={[
        {
          filename: "main.py",
          description: "Simple text overview of Epicon's capabilities",
          code: `"""
EPICON v${version || '0.2.0'}
Lightweight Machine Learning Library
Pure Python · MIT License

  Two Worlds, One Import
  Traditional ML and neural networks share a single fit/predict API.
  No context switching between frameworks.

  Zero Bloat
  1 dependency (NumPy) · <1MB install
  No CUDA, no C++, no TensorFlow, no PyTorch.

  Built-in Tooling
  Preprocessing · Datasets · Metrics · Model Persistence

  pip install epicon
"""`,
        },
        {
          filename: "preprocessing.py",
          description: "Scalers, encoders, and data splitting utilities",
          code: `"""
Preprocessing utilities for scaling, encoding,
and splitting data — consistent with sklearn conventions.
"""

from epicon.preprocessing import StandardScaler, train_test_split

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = \
  train_test_split(X, y, test_size=0.2, random_state=42)`,
        },
        {
          filename: "datasets.py",
          description: "Built-in dataset loaders and synthetic data generators",
          code: `"""
Built-in dataset loaders and synthetic data generators
for quick experimentation and benchmarking.
"""

from epicon.datasets import load_iris, make_classification

X, y = load_iris(return_X_y=True)

X, y = make_classification(
    n_samples=100, n_features=10, n_classes=2,
    random_state=42,
)`,
        },
        {
          filename: "metrics.py",
          description: "Evaluation metrics for classification and regression",
          code: `"""
Evaluation metrics for classification and regression,
all accessible from a single import.
"""

from epicon.metrics import accuracy_score, f1_score, confusion_matrix

print(f"Accuracy: {accuracy_score(y_true, y_pred):.4f}")
print(f"F1: {f1_score(y_true, y_pred, average='macro'):.4f}")
print(confusion_matrix(y_true, y_pred))`,
        },
        {
          filename: "persistence.py",
          description: "Save and load trained models as JSON",
          code: `"""
Save and load trained models as JSON — preserving
weights, architecture, and optimizer state.
"""

model.save_model(file_path='my_model.json')

from epicon import Model
loaded = Model.load_model('my_model.json')`,
        },
      ]} />
      </div>

      <footer>
        <p className="text-center text-white/50 text-xs font-extralight mt-5 uppercase">
          © 2026 EPICON. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

export default Home
