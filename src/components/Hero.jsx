import { useState, useEffect, useRef, Fragment } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { translations, LANGUAGES } from '../i18n/translations'
import SocialRail from './SocialRail'
import './Hero.css'

gsap.registerPlugin(useGSAP)

const NAV_KEYS = ['services', 'portfolio', 'about', 'contact']

export default function Hero() {
  const [lang, setLang]         = useState('es')
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [animKey, setAnimKey]   = useState(0)
  const [motIdx, setMotIdx]     = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const heroRef = useRef(null)
  const dropRef = useRef(null)

  const t           = translations[lang]
  const currentLang = LANGUAGES.find(l => l.code === lang)

  // Scroll detection for nav style
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // click-outside to close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = currentLang.dir
  }, [currentLang])

  // cycle motivational phrases
  useEffect(() => {
    setMotIdx(0)
    const id = setInterval(() => setMotIdx(i => (i + 1) % t.motivations.length), 5000)
    return () => clearInterval(id)
  }, [lang, t.motivations.length])

  // ── GSAP entrance timeline ───────────────────────────────
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2.2 })

      tl.from('.hero-nav', { y: -22, opacity: 0, duration: 0.9 })
        .from('.nav-divider', { scaleX: 0, duration: 1, ease: 'power2.inOut' }, '-=0.5')
        .from('.social-rail', { x: -14, opacity: 0, duration: 0.9 }, '-=0.6')
        .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')

      // headline chars
      const charEls = gsap.utils.toArray('.hl-char')
      tl.from(charEls, {
        y: '115%',
        duration: 0.52,
        stagger: { amount: 0.72, ease: 'power2.out' },
        ease: 'power3.out',
      }, '-=0.2')

      // CTAs
        .from('.btn-primary', { x: -16, opacity: 0, duration: 0.65 }, '-=0.1')
        .from('.btn-ghost',   { x: -10, opacity: 0, duration: 0.65 }, '-=0.5')

      // right column
        .from('.sub-word', {
          y: '100%',
          duration: 0.42,
          stagger: { amount: 0.38, ease: 'power2.out' },
          ease: 'power3.out',
        }, '-=0.9')
        .from('.hero-stats',  { x: 18, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-badge',  { y: 10, opacity: 0, duration: 0.6 }, '-=0.5')

      // bottom anchors
        .from('.scroll-indicator', { y: 10, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-section-num', { opacity: 0, duration: 0.8 },        '-=0.5')

      // light blob pulse
      gsap.to('.layer-light', {
        opacity: 0.7, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
      })

      // Floating particles
      gsap.utils.toArray('.hero-particle').forEach((p) => {
        gsap.to(p, {
          y: `random(-80, 80)`,
          x: `random(-40, 40)`,
          opacity: `random(0.1, 0.5)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: `random(0, 3)`,
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, { scope: heroRef, dependencies: [animKey] })

  const handleLangChange = (code) => {
    setLang(code)
    setLangOpen(false)
    setAnimKey(k => k + 1)
    setMotIdx(0)
  }

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }))

  return (
    <section className="hero" ref={heroRef} id="hero">

      {/* ── Video ── */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/video-hero.mp4" type="video/mp4" />
      </video>

      {/* ── Layers ── */}
      <div className="layer-overlay" />
      <div className="layer-light" />
      <div className="layer-vignette" />
      <div className="layer-noise" />

      {/* ── Floating Particles ── */}
      {particles.map(p => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size + 'px',
            height: p.size + 'px',
            animationDelay: p.delay + 's',
          }}
        />
      ))}

      {/* ── Nav ── */}
      <nav className={`hero-nav${scrolled ? ' hero-nav--scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">
          STUDIO<span className="logo-accent">.</span>
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

      <div className="nav-divider" />
      <SocialRail />

      {/* ── Two-column body ── */}
      <div className="hero-body" key={animKey}>

        {/* Left — headline + CTAs */}
        <div className="hero-left">
          <span className="hero-eyebrow">{t.eyebrow}</span>
          <h1 className="hero-headline">
            {t.headline.map((line, i) => (
              <span key={i} className="hl-row">
                {line.split(' ').map((word, j) => (
                  <span key={j} className="hl-word-group">
                    {word.split('').map((char, k) => (
                      <span key={k} className="hl-clip">
                        <span className="hl-char">{char}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="hero-ctas">
            <a href="#portfolio" className="btn-primary">
              <span className="btn-shine" />
              {t.cta_primary}
            </a>
            <a href="#contact" className="btn-ghost">
              {t.cta_secondary}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right — sub + stats + badge + phrase */}
        <div className="hero-right">
          <p className="hero-sub">
            {t.subheading.split(' ').map((word, i, arr) => (
              <Fragment key={i}>
                <span className="sub-clip"><span className="sub-word">{word}</span></span>
                {i < arr.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">{t.stats.projects}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">3+</span>
              <span className="stat-label">{t.stats.services}</span>
            </div>
          </div>

          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-text">10+ Projects delivered</span>
          </div>

          <div className="hero-motive">
            <span key={motIdx} className="hero-motive-text">
              {t.motivations[motIdx]}
            </span>
          </div>
        </div>

      </div>

      {/* ── Section number ── */}
      <div className="hero-section-num">.01</div>

      {/* ── Scroll indicator ── */}
      <div className="scroll-indicator">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-track"><div className="scroll-thumb" /></div>
      </div>

      {/* ── Bottom fade into Services ── */}
      <div className="hero-bottom-fade" />

    </section>
  )
}
