import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css'
import { SiPython, SiJson, SiYaml } from 'react-icons/si'
import { FaTerminal, FaRegFileCode, FaRegCopy } from 'react-icons/fa'

const FILE_ICONS = {
  ".py": {
    icon: <SiPython size={10} />,
    color: "#3776AB",
  },
  ".json": {
    icon: <SiJson size={10} />,
    color: "#ffffff",
  },
  ".yml": {
    icon: <SiYaml size={10} />,
    color: "#CB171E",
  },
};

function getFileIcon(filename) {
  if (!filename) return null
  const ext = '.' + filename.split('.').pop()
  return FILE_ICONS[ext]?.icon || <FaRegFileCode size={10} />
}

function getFileColor(filename) {
  if (!filename) return null
  const ext = '.' + filename.split('.').pop()
  return FILE_ICONS[ext]?.color || null
}

export default function CodeSnippet({ code, language = 'python', filename, files }) {
  const codeRef = useRef(null)
  const preRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const copiedTimeoutRef = useRef(null)
  const modalCodeRef = useRef(null)

  const tabBarRef = useRef(null)
  const tabRefs = useRef({})
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0, color: '#52525e' })
  const [hasMounted, setHasMounted] = useState(false)

  const isMultiFile = files && files.length > 0
  const activeFile = isMultiFile ? files[activeIndex] : { code, language, filename }
  const displayCode = activeFile.code
  const displayLanguage = activeFile.language || language

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [displayCode])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const el = preRef.current
    if (!el) return
    const check = () => setHasOverflow(el.scrollWidth > el.clientWidth)
    check()
    el.addEventListener('scroll', check)
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [displayCode])

  useLayoutEffect(() => {
    if (!isMultiFile) return
    const container = tabBarRef.current
    const activeTab = tabRefs.current[activeIndex]
    if (!container || !activeTab) return

    const containerRect = container.getBoundingClientRect()
    const tabRect = activeTab.getBoundingClientRect()

    setTabIndicator({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
      color: getFileColor(files[activeIndex]?.filename) || '#52525e',
    })
  }, [activeIndex, isMultiFile, files])

  useEffect(() => {
    if (isMaximized && modalCodeRef.current) {
      Prism.highlightElement(modalCodeRef.current)
    }
  }, [isMaximized, displayCode])

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isMultiFile) return
    const handleResize = () => {
      const container = tabBarRef.current
      const activeTab = tabRefs.current[activeIndex]
      if (!container || !activeTab) return

      const containerRect = container.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()

      setTabIndicator(prev => ({
        ...prev,
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex, isMultiFile])

  return (
    <>
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 px-4 bg-zinc-900/80 border border-zinc-800 border-b-0 rounded-t-xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onMouseEnter={() => setHoveredBtn('close')}
            onMouseLeave={() => setHoveredBtn(null)}
            className="relative w-3 h-3 flex items-center justify-center rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            aria-label="Close"
          >
            {hoveredBtn === 'close' && (
              <span className="text-xs cursor-pointer font-bold text-red-900 leading-none select-none">×</span>
            )}
          </button>
          <button
            onClick={() => setIsMinimized(v => !v)}
            onMouseEnter={() => setHoveredBtn('minimize')}
            onMouseLeave={() => setHoveredBtn(null)}
            className="relative w-3 h-3 flex items-center justify-center rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
            aria-label={isMinimized ? 'Restore' : 'Minimize'}
          >
            {hoveredBtn === 'minimize' && (
              <span className="text-xs cursor-pointer font-bold text-yellow-900 leading-none select-none">−</span>
            )}
          </button>
          <button
            onClick={() => setIsMaximized(v => !v)}
            onMouseEnter={() => setHoveredBtn('maximize')}
            onMouseLeave={() => setHoveredBtn(null)}
            className="relative w-3 h-3 flex items-center justify-center rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
          >
            {hoveredBtn === 'maximize' && (
              <span className="text-xs cursor-pointer font-bold text-green-900 leading-none select-none">
                {isMaximized ? '⧉' : '□'}
              </span>
            )}
          </button>
        </div>

        {isMultiFile ? (
          <div className="flex-1 flex items-center gap-px overflow-x-auto scrollbar-hidden relative" ref={tabBarRef}>
            <div
              className="absolute bottom-0 h-0.5 z-10"
              style={{
                left: tabIndicator.left,
                width: tabIndicator.width,
                backgroundColor: tabIndicator.color,
                transition: hasMounted
                  ? 'left 0.12s ease-out, width 0.12s ease-out, background-color 0.12s ease-out'
                  : 'none',
              }}
            />
            {files.map((file, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={i}
                  ref={el => { tabRefs.current[i] = el }}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-mono transition-colors shrink-0 cursor-pointer"
                  style={{
                    color: isActive ? '#e4e4e7' : '#71717a',
                    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  <span className="inline-flex shrink-0">{getFileIcon(file.filename)}</span>
                  <span>{file.filename}</span>
                  {hoveredIndex === i && file.description && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-800 text-white text-[10px] leading-tight rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                      {file.description}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ) : filename ? (
          <div
            className="flex items-center gap-1.5 -ml-0.5 bg-white/5 px-3 py-2 rounded-t-xs border-b-2"
            style={{ borderColor: getFileColor(filename) || '#52525e' }}
          >
            <span className="inline-flex shrink-0">{getFileIcon(filename)}</span>
            <span className="text-xs text-zinc-300 font-mono">{filename}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 -ml-0.5 bg-white/5 px-3 py-2 rounded-t-xs border-b-2 border-zinc-600">
            <span className="inline-flex shrink-0 text-zinc-400"><FaTerminal size={14} /></span>
            <span className="text-xs text-zinc-400 font-mono">Terminal</span>
          </div>
        )}

        {!isMultiFile && <div className="flex-1" />}
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isMinimized ? 0 : '2000px', opacity: isMinimized ? 0 : 1 }}
      >
        <div className="relative">
          <pre
            ref={preRef}
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
              className={`language-${displayLanguage}`}
              style={{ background: 'transparent', fontSize: '0.7rem', fontFamily: "'Google Sans Code', monospace" }}
            >
              {displayCode}
            </code>
          </pre>
          {hasOverflow && (
            <div
              className="absolute top-0 right-0 bottom-0 w-16 pointer-events-none rounded-b-xs"
              style={{
                background: 'linear-gradient(to right, transparent, #0a0a0a)',
                borderTopRightRadius: 0,
              }}
            />
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(displayCode)
              setIsCopied(true)
              if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
              copiedTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000)
            }}
            className="absolute bottom-1.5 right-1.5 flex uppercase items-base gap-1 px-3 py-1.5 cursor-pointer text-xs font-mono text-zinc-400 bg-zinc-800/80 rounded hover:text-zinc-200 hover:bg-zinc-700/80 transition-colors"
          >
            <FaRegCopy size={15} />
            {isCopied ? 'copied!' : 'copy'}
          </button>
        </div>
      </div>
    </div>

    {isMaximized && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
        onClick={() => setIsMaximized(false)}
      >
        <div
          className="w-full max-w-5xl mx-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-4 bg-zinc-900/80 border border-zinc-800 border-b-0 rounded-t-xs">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            {activeFile.filename ? (
              <div
                className="flex items-center gap-1.5 -ml-0.5 bg-white/5 px-3 py-2 rounded-t-xs border-b-2"
                style={{ borderColor: getFileColor(activeFile.filename) || '#52525e' }}
              >
                <span className="inline-flex shrink-0">{getFileIcon(activeFile.filename)}</span>
                <span className="text-xs text-zinc-300 font-mono">{activeFile.filename}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 -ml-0.5 bg-white/5 px-3 py-2 rounded-t-xs border-b-2 border-zinc-600">
                <span className="inline-flex shrink-0 text-zinc-400"><FaTerminal size={14} /></span>
                <span className="text-xs text-zinc-400 font-mono">Terminal</span>
              </div>
            )}
            <div className="flex-1" />
          </div>
          <div className="relative">
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
                ref={modalCodeRef}
                className={`language-${displayLanguage}`}
                style={{ background: 'transparent', fontSize: '0.85rem', fontFamily: "'Google Sans Code', monospace" }}
              >
                {displayCode}
              </code>
            </pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(displayCode)
                setIsCopied(true)
                if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
                copiedTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000)
              }}
              className="absolute bottom-1.5 right-1.5 flex uppercase items-base gap-1 px-3 py-1.5 cursor-pointer text-xs font-mono text-zinc-400 bg-zinc-800/80 rounded hover:text-zinc-200 hover:bg-zinc-700/80 transition-colors"
            >
              <FaRegCopy size={14} />
              {isCopied ? 'copied!' : 'copy'}
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
