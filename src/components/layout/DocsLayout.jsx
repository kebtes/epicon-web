import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DocsSidebar from './DocsSidebar'

const DocsContext = createContext()

export function useDocs() {
  return useContext(DocsContext)
}

export default function DocsLayout() {
  const [toc, setToc] = useState([])
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const contentRef = useRef(null)
  const observerRef = useRef(null)
  const rafRef = useRef(null)

  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const el = contentRef.current
    if (!el) return

    const headings = el.querySelectorAll('h2[id], h3[id]')
    if (headings.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          break
        }
      }
    }, { rootMargin: '-80px 0px -75% 0px' })

    headings.forEach(h => observer.observe(h))
    observerRef.current = observer
  }, [])

  useEffect(() => {
    setActiveSection('')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(setupObserver)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [location.pathname, toc, setupObserver])

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  return (
    <DocsContext.Provider value={{ toc, setToc }}>
      <div className="flex flex-1 flex-row">
        <DocsSidebar activeSection={activeSection} />
        <div ref={contentRef} className="flex-1 min-w-0 px-8 md:px-12 py-10 max-w-4xl">
          <Outlet />
        </div>
      </div>
    </DocsContext.Provider>
  )
}
