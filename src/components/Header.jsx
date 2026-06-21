import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";

function Header() {
    const location = useLocation();
    const isDocs = location.pathname.startsWith('/docs');
    const isVersions = location.pathname === '/versions';
    const [isHovered, setIsHovered] = useState(false);
    const [isGitHubHovered, setIsGitHubHovered] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [starCount, setStarCount] = useState(null);
    const intervalRef = useRef(null);
    const suffix = "PICON";

    const navRef = useRef(null);
    const readmeRef = useRef(null);
    const docsRef = useRef(null);
    const versionsRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const getActiveLink = useCallback(() => {
        if (isVersions) return versionsRef.current;
        if (isDocs) return docsRef.current;
        return readmeRef.current;
    }, [isDocs, isVersions]);

    useLayoutEffect(() => {
        const container = navRef.current;
        const activeLink = getActiveLink();
        if (!container || !activeLink) return;

        const containerRect = container.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
            left: linkRect.left - containerRect.left,
            width: linkRect.width,
        });
    }, [isDocs, isVersions, getActiveLink]);

    useEffect(() => {
        const handleResize = () => {
            const container = navRef.current;
            const activeLink = getActiveLink();
            if (!container || !activeLink) return;

            const containerRect = container.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            setIndicatorStyle({
                left: linkRect.left - containerRect.left,
                width: linkRect.width,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isDocs, isVersions, getActiveLink]);

    useEffect(() => {
        if (isHovered) {
            intervalRef.current = setInterval(() => {
                setCharCount(prev => {
                    if (prev >= suffix.length) {
                        clearInterval(intervalRef.current);
                        return suffix.length;
                    }
                    return prev + 1;
                });
            }, 50);
        } else {
            intervalRef.current = setInterval(() => {
                setCharCount(prev => {
                    if (prev <= 0) {
                        clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 40);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHovered]);

    useEffect(() => {
        const cached = localStorage.getItem('ghStars');
        if (cached) {
            const { count, time } = JSON.parse(cached);
            if (Date.now() - time < 3600000) {
                setStarCount(count);
                return;
            }
        }
        fetch('https://api.github.com/repos/kebtes/epicon')
            .then(r => r.json())
            .then(data => {
                if (typeof data.stargazers_count === 'number') {
                    const count = data.stargazers_count;
                    setStarCount(count);
                    localStorage.setItem('ghStars', JSON.stringify({ count, time: Date.now() }));
                }
            })
            .catch(() => {});
    }, []);

    return (
      <header className="bg-black/30 backdrop-blur-sm text-white text-sm uppercase font-sans flex items-center justify-between border-b border-white/5">
        <Link
          to="/"
          className="font-extralight tracking-widest text-2xl pl-6 logo inline-block cursor-pointer"
          style={{
            transform: isHovered ? "scale(0.95)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          E
          <span className="inline-flex">
            {suffix.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden transition-all duration-100 ease-out"
                style={{
                  maxWidth: i < charCount ? "1ch" : "0px",
                  opacity: i < charCount ? 1 : 0,
                  transform: i < charCount ? "scale(1)" : "scale(0.3)",
                  transitionDelay:
                    i < charCount
                      ? `${i * 5}ms`
                      : `${(suffix.length - 1 - i) * 5}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
          {charCount > 0 && charCount < suffix.length && (
            <span className="animate-cursor-blink ml-0.5 font-light">|</span>
          )}
        </Link>
        <div className="flex relative" ref={navRef}>
          <div
            className="absolute bottom-0 h-[0.5px] bg-white"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              transition: hasMounted
                ? "left 0.12s ease-out, width 0.12s ease-out"
                : "none",
            }}
          />
          <Link
            ref={readmeRef}
            to="/"
            className={`px-4 py-4 transition-colors font-light ${
              !isDocs && !isVersions ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            README
          </Link>
          <Link
            ref={docsRef}
            to="/docs"
            className={`px-4 py-4 transition-colors font-light ${
              isDocs ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            GET STARTED
          </Link>
          <Link
            ref={versionsRef}
            to="/versions"
            className={`px-4 py-4 transition-colors font-light ${
              isVersions ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            VERSIONS
          </Link>
          <span className="relative">
            <a
              href="https://github.com/kebtes/epicon"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsGitHubHovered(true)}
              onMouseLeave={() => setIsGitHubHovered(false)}
              className="inline-flex items-center gap-1 px-4 py-4 bg-white/90 text-black font-light hover:bg-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GITHUB
              {starCount != null && (
                <span className="flex items-center gap-1 ml-1.5 text-sm tabular-nums opacity-80">
                  ★ {starCount.toLocaleString()}
                </span>
              )}
            </a>
            {isGitHubHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-800 text-white text-[10px] leading-tight rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                Start and contribute to this library
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
              </div>
            )}
          </span>
        </div>
      </header>
    );
}

export default Header;
