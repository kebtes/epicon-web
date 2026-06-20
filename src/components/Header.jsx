import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    const isDocs = location.pathname.startsWith('/docs');
    
    return (
      <header className="bg-black/10 backdrop-blur-xs text-white text-sm uppercase font-sans flex items-center justify-between border-b border-white/5 px-6">
        <span className="font-light tracking-widest text-xl logo">EPICON</span>
        <div className="flex gap-6">
          <Link
            to="/"
            className={
              !isDocs
                ? "border-b-2 pb-1 transition-colors py-4 inline-flex items-center gap-1.5"
                : "py-4 text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5"
            }
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            README
          </Link>
          <Link
            to="/docs"
            className={
              isDocs
                ? "border-b-2 pb-1 transition-colors py-4 inline-flex items-center gap-1.5"
                : "py-4 text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5"
            }
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            GET STARTED
          </Link>
        </div>
      </header>
    );   
}

export default Header;
