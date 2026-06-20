import { useState } from 'react'
import CodeSnippet from "../CodeSnippet";

const metrics = [
  { value: '< 1MB', label: 'Install Size' },
  { value: '10×', label: 'Faster Training' },
  { value: '0', label: 'Dependencies' },
  { value: '100%', label: 'Pure Python' },
];

function Home() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText('pip install epicon');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-white px-4 py-20">
      <div className="relative inline-block mb">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tight logo uppercase">
          EPICON
        </h1>
        <span className="absolute uppercase -top-1 -right-1 md:-top-2 md:-right-2 text-[10px] md:text-xs font-sans font-semibold tracking-normal text-white bg-green-700 px-1.5 py-0.5 rounded-xs">
          beta v0.2.0
        </span>
      </div>
      <p className="text-sm md:text-base text-white/60 mb-5 tracking-widest uppercase">
        LIGHTWEIGHT MACHINE LEARNING LIBRARY
      </p>

      <div className="mb-5">
        <div
          onClick={handleCopy}
          className="group flex border border-white/10 rounded-xs items-center gap-3 px-6 py-3 cursor-pointer hover:border-white/30 transition-colors"
        >
          <code className="text-white/60 text-sm uppercase">
            pip install epicon
          </code>
          <span className="w-0 overflow-hidden group-hover:w-5 flex items-center justify-end transition-all duration-200 text-white/40 group-hover:text-white/40">
            {copied ? (
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
            ) : (
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
            )}
          </span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-px border border-white/5 rounded-xs overflow-hidden">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="bg-white/[0.02] px-5 py-4 text-center"
          >
            <div className="text-lg md:text-xl font-semibold tracking-tight text-white/80">
              {m.value}
            </div>
            <div className="text-[11px] tracking-widest uppercase text-white/30 mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <CodeSnippet code={`import epicon

# Traditional ML
model = epicon.RandomForestClassifier()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Neural network — same API
model = epicon.Sequential([
    epicon.Dense(64, activation='relu'),
    epicon.Dense(10, activation='softmax'),
])
model.compile(optimizer='adam', loss='categorical_crossentropy')
model.fit(X_train, y_train)`} />
    </section>
  );
}

export default Home
