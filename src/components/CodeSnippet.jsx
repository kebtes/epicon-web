import { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css'

export default function CodeSnippet({ code, language = 'python' }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code])

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border border-zinc-800 border-b-0 rounded-t-xs">
        <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="cursor-pointer text-zinc-500 hover:text-white transition-colors"
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      <pre
        className="overflow-x-auto rounded-b-xs border border-zinc-800"
        style={{
          background: '#0a0a0a',
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <code
          ref={codeRef}
          className={`language-${language}`}
          style={{ background: 'transparent', fontSize: '0.7rem' }}
        >
          {code}
        </code>
      </pre>
    </div>
  )
}
