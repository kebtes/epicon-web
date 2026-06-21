import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ReleasesSidebar from './ReleasesSidebar'

const ReleasesContext = createContext()

export function useReleases() {
  return useContext(ReleasesContext)
}

export default function ReleasesLayout() {
  const [releases, setReleases] = useState([])
  const [activeRelease, setActiveRelease] = useState('')
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

    const headings = el.querySelectorAll('h2[id]')
    if (headings.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveRelease(entry.target.id)
          break
        }
      }
    }, { rootMargin: '-80px 0px -75% 0px' })

    headings.forEach(h => observer.observe(h))
    observerRef.current = observer
  }, [])

  useEffect(() => {
    setActiveRelease('')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(setupObserver)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [location.pathname, releases, setupObserver])

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  return (
    <ReleasesContext.Provider value={{ releases, setReleases, activeRelease }}>
      <div className="flex flex-1 flex-row">
        <ReleasesSidebar activeRelease={activeRelease} />
        <div ref={contentRef} className="docs-content flex-1 min-w-0 px-8 md:px-12 py-10 max-w-4xl">
          <Outlet />
        </div>
      </div>
    </ReleasesContext.Provider>
  )
}
