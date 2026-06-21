const features = [
  {
    title: 'Two worlds, one import',
    desc: 'Train a Random Forest or a deep neural network with the same fit/predict API — no second library needed.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17 L12 12 L20 17" />
        <path d="M4 7 L12 12 L20 7" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'NumPy only, nothing more',
    desc: 'The only required dependency is NumPy. No CUDA, no C++ extensions, no 2GB downloads.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z" />
        <path d="M12 11 L20 6" />
        <path d="M12 11 L4 6" />
      </svg>
    ),
  },
  {
    title: 'Keras-compatible model I/O',
    desc: 'Save and load models in .keras format for seamless interoperability with the Keras ecosystem.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    title: 'Train in 3 lines',
    desc: 'model = Sequential(...), model.compile(...), model.fit(X, y) — progress bars, mini-batching, and validation splits built in.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="w-full max-w-3xl mx-auto mb-20">
      <h3 className="text-xs tracking-widest uppercase text-white/40 mb-5">
        FEATURES
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="border border-white/10 rounded-xs p-5 flex gap-4 bg-white/2 hover:border-white/30 transition-colors"
          >
            <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-white/5 text-white/50">
              {f.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-white/80 mb-1 uppercase">
                {f.title}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
