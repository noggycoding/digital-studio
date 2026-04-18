import { useState, useEffect, useRef } from 'react'
import { translations, LANGUAGES } from '../i18n/translations'

const NAV_KEYS = ['services', 'portfolio', 'about', 'contact']

export default function Navbar({ onLangChange, lang: externalLang }) {
  const [lang, setLang]         = useState(externalLang || 'es')
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropRef = useRef(null)

  const t           = translations[lang]
  const currentLang = LANGUAGES.find(l => l.code === lang)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLangChange = (code) => {
    setLang(code)
    setLangOpen(false)
    onLangChange?.(code)
  }

  return (
    <nav className={`hero-nav${scrolled ? ' hero-nav--scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        FRAME<span className="logo-accent"> STUDIO.</span>
      </a>

      <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
        {NAV_KEYS.map(k => (
          <a key={k} href={`#${k}`} className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.nav[k]}
          </a>
        ))}
      </div>

      <div className="nav-right">
        <div className="lang-switcher" ref={dropRef}>
          <button
            className={`lang-btn${langOpen ? ' lang-btn--open' : ''}`}
            onClick={() => setLangOpen(!langOpen)}
          >
            {currentLang.label}
            <svg className="lang-chevron" width="7" height="5" viewBox="0 0 7 5" fill="none">
              <path d="M1 1l2.5 3L6 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={`lang-dropdown${langOpen ? ' lang-dropdown--open' : ''}`}>
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                className={`lang-option${lang === l.code ? ' lang-option--active' : ''}`}
                onClick={() => handleLangChange(l.code)}
              >
                <span className="lang-code">{l.label}</span>
                <span className="lang-name">{l.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </nav>
  )
}
