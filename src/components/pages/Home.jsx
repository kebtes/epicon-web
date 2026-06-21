import { useState, useEffect } from 'react'
import CodeSnippet from "../CodeSnippet";
import Features from "../Features";
import SEO from "../SEO";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Epicon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Epicon is a lightweight, from-scratch machine learning library for Python built entirely on NumPy. It provides a unified fit/predict API for both neural networks and traditional ML models with minimal dependencies. Epicon has no dependency on TensorFlow, PyTorch, or CUDA. It supports linear models (LinearRegression, Ridge, Lasso, LogisticRegression), tree-based models (DecisionTree, RandomForest), nearest neighbors (KNN), Gaussian Naive Bayes, and neural networks via a Keras-style Sequential API with Dense, Dropout, and Conv1D layers. It also includes built-in preprocessing (scalers, encoders), datasets (Iris, MNIST), evaluation metrics, and model persistence. Created by developer kebtes and released under the MIT license."
        }
      },
      {
        "@type": "Question",
        "name": "What is Epicon used for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Epicon is used for machine learning tasks including classification, regression, clustering, and neural network training. It is designed for developers and data scientists who want a lightweight, understandable ML library without the complexity of TensorFlow or PyTorch."
        }
      },
      {
        "@type": "Question",
        "name": "How do I install Epicon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install Epicon with pip: pip install epicon. NumPy is the only required dependency. Optionally install Numba for JIT acceleration of tree splitting and distance computations."
        }
      },
      {
        "@type": "Question",
        "name": "Does Epicon require TensorFlow or PyTorch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Epicon is built from scratch on NumPy and has zero deep learning framework dependencies. No CUDA, no C++, no TensorFlow, no PyTorch."
        }
      },
      {
        "@type": "Question",
        "name": "What models does Epicon support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Epicon supports linear models (LinearRegression, Ridge, Lasso, LogisticRegression), tree-based models (DecisionTreeClassifier, DecisionTreeRegressor, RandomForestClassifier, RandomForestRegressor), nearest neighbors (KNeighborsClassifier, KNeighborsRegressor), Gaussian Naive Bayes (GaussianNB), and neural networks with a Sequential API (Dense, Dropout, Conv1D layers, ReLU/Sigmoid/Softmax/Tanh activations, Adam/Momentum/SGD optimizers)."
        }
      },
      {
        "@type": "Question",
        "name": "Who created Epicon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Epicon was created by the developer kebtes and is hosted on GitHub at github.com/kebtes/epicon."
        }
      },
      {
        "@type": "Question",
        "name": "Is Epicon free and open source?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Epicon is released under the MIT License and is completely free and open source."
        }
      }
    ]
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Epicon",
    "description": "Epicon is a lightweight, pure Python machine learning library built from scratch on NumPy. Provides a unified API for neural networks (Sequential API with Dense, Dropout, Conv1D) and traditional ML models (LinearRegression, RandomForest, KNN, and more). Zero dependencies on TensorFlow, PyTorch, or CUDA. MIT license.",
    "applicationCategory": "Machine Learning",
    "operatingSystem": "Cross-platform",
    "programmingLanguage": "Python",
    "license": "MIT",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-white px-4 pt-20">
      <SEO
        title="Epicon"
        description="Epicon is a lightweight, pure Python machine learning library built from scratch on NumPy with zero dependencies on TensorFlow or PyTorch. Provides a unified fit/predict API for neural networks and traditional ML models. Created by kebtes, MIT license."
        canonicalUrl="https://epiconml.github.io/"
        jsonLd={[softwareSchema, faqSchema]}
      />
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

      <section className="max-w-2xl mx-auto mb-10 text-center px-4">
        <p className="text-white/80 leading-relaxed text-sm md:text-base">
          Epicon is a lightweight, pure Python machine learning library built from scratch on NumPy.
          It provides a unified API for both neural networks and traditional ML models — with zero
          dependencies on TensorFlow, PyTorch, or CUDA. Created by{' '}
          <a href="https://github.com/kebtes" className="text-white/60 hover:text-white underline underline-offset-2">kebtes</a>.
        </p>
      </section>

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
