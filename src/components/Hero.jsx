import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { translations, LANGUAGES } from '../i18n/translations'
import './Hero.css'

gsap.registerPlugin(useGSAP)

// Split a string into chars (keeps spaces visible)
function splitChars(str, className = 'char') {
  return str.split('').map((c, i) => (
    <span key={i} className={className} style={{ display: 'inline-block', whiteSpace: c === ' ' ? 'pre' : 'normal' }}>
      {c === ' ' ? '\u00A0' : c}
    </span>
  ))
}

export default function Hero({ lang = 'es' }) {
  const heroRef      = useRef(null)
  const gsapRunCount = useRef(0)

  const t           = translations[lang] || translations.es
  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[1]

  useEffect(() => {
    document.documentElement.dir = currentLang.dir
  }, [currentLang])

  useGSAP(() => {
    gsapRunCount.current += 1
    const ctx = gsap.context(() => {
      const delay  = gsapRunCount.current === 1 ? 1.3 : 0.1
      const spring = 'back.out(1.4)'

      // ─────────────────────────────────────────────
      // Collect all animated elements with their hidden (initial) state.
      // Entry tweens TO default (x:0, y:0, scale:1, opacity:1).
      // Exit (scroll) tweens BACK to these hidden values.
      // ─────────────────────────────────────────────
      const groups = [
        // Card itself: zoom in + blur
        { sel: '.hero-card', from: { opacity: 0, scale: 0.88, filter: 'blur(12px)' } },

        // ── Top bar container drops in from top ──
        { sel: '.hero-card-top', from: { opacity: 0, y: -25 } },
        // Top-left brand characters cascade from LEFT
        { sel: '.brand-char', from: { opacity: 0, x: -28 }, stagger: 0.04 },
        // Top-right section tag characters cascade from RIGHT
        { sel: '.tag-char', from: { opacity: 0, x: 28 }, stagger: 0.035 },

        // ── H1 title container fades + scales ──
        { sel: '.hero-main-title', from: { opacity: 0, scale: 0.96 } },
        // Title CHARS: drop from above with squash — cartoon-cinema style
        { sel: '.hero-title-char', from: { yPercent: -180, scaleY: 0.35, scaleX: 1.15, opacity: 0, filter: 'blur(8px)', color: 'rgba(180,210,255,1)' }, stagger: 0.04 },

        // ── Subtitle paragraph rises in ──
        { sel: '.hero-main-sub', from: { opacity: 0, y: 18 } },
        { sel: '.sub-word', from: { yPercent: 110, opacity: 0 }, stagger: 0.05 },

        // ── CTA button: scale + y + shadow hint ──
        { sel: '.hero-main-cta', from: { opacity: 0, x: 60, scale: 0.75, y: 10 } },
        { sel: '.cta-char', from: { opacity: 0, x: 25 }, stagger: 0.035 },

        // Media zoom in
        { sel: '.hero-media', from: { opacity: 0, scale: 0.9, filter: 'blur(10px)' } },

        // Feature card chars from LEFT
        { sel: '.feature-tag-char', from: { opacity: 0, x: -20 }, stagger: 0.03 },
        { sel: '.feature-title-char', from: { opacity: 0, x: -20 }, stagger: 0.02 },

        // Arrow button from RIGHT with rotation
        { sel: '.hero-media-arrow', from: { opacity: 0, x: 40, scale: 0, rotate: -90 } },

        // Stat cards converge
        { sel: '.hero-stat:nth-child(1)', from: { opacity: 0, x: -60, scale: 0.85 } },
        { sel: '.hero-stat:nth-child(2)', from: { opacity: 0, scale: 0.7 } },
        { sel: '.hero-stat:nth-child(3)', from: { opacity: 0, x:  60, scale: 0.85 } },

        // Stat inner text from bottom
        { sel: '.hero-stat-num',   from: { opacity: 0, y: 18 }, stagger: 0.05 },
        { sel: '.hero-stat-label', from: { opacity: 0, y: 12 }, stagger: 0.05 },
      ]

      // Resolve `from` for each group (function gives per-element state)
      const resolved = groups.map(g => {
        const els = gsap.utils.toArray(g.sel)
        const states = els.map((_, i) =>
          typeof g.from === 'function' ? g.from(i) : g.from
        )
        return { ...g, els, states }
      })

      // Apply initial hidden state to every element
      resolved.forEach(({ els, states }) => {
        els.forEach((el, i) => gsap.set(el, states[i]))
      })

      // ── ENTRY TIMELINE ──
      const tl = gsap.timeline({ defaults: { ease: spring, duration: 0.8 }, delay })

      tl.to('.hero-card', { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out' })
        // Top bar drops in
        .to('.hero-card-top', { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.55')
        .to('.brand-char', { opacity: 1, x: 0, stagger: 0.04, duration: 0.6 }, '-=0.5')
        .to('.tag-char',   { opacity: 1, x: 0, stagger: 0.035, duration: 0.6 }, '<')
        // H1 title envelope
        .to('.hero-main-title', { opacity: 1, scale: 1, duration: 0.65, ease: 'expo.out' }, '-=0.4')
        // CHARS drop from above with elastic squash-and-stretch
        .to('.hero-title-char', {
          yPercent: 0, scaleY: 1, scaleX: 1, opacity: 1, filter: 'blur(0px)',
          color: '#ffffff',
          stagger: 0.055,
          duration: 1.2,
          ease: 'elastic.out(1, 0.55)',
        }, '<0.1')
        // Subtle whole-word pulse after all letters land — settles the feel
        .to('.hero-title-word', {
          scale: 1.03,
          duration: 0.22,
          ease: 'power2.out',
          stagger: 0.08,
        }, '-=0.4')
        .to('.hero-title-word', {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.08,
        }, '-=0.3')
        // Subtitle paragraph + words cascade
        .to('.hero-main-sub', { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, '-=0.45')
        .to('.sub-word', { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.65 }, '<0.05')
        // CTA button springs in from right
        .to('.hero-main-cta', { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8 }, '-=0.65')
        .to('.cta-char', { opacity: 1, x: 0, stagger: 0.035, duration: 0.5 }, '<0.15')
        .to('.hero-media', { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.95, ease: 'expo.out' }, '-=0.55')
        .to('.feature-tag-char',   { opacity: 1, x: 0, stagger: 0.03, duration: 0.5 }, '-=0.5')
        .to('.feature-title-char', { opacity: 1, x: 0, stagger: 0.02, duration: 0.55 }, '-=0.4')
        .to('.hero-media-arrow', { opacity: 1, x: 0, scale: 1, rotate: 0, duration: 0.75 }, '-=0.5')
        .to('.hero-stat:nth-child(1)', { opacity: 1, x: 0, scale: 1, duration: 0.75 }, '-=0.5')
        .to('.hero-stat:nth-child(2)', { opacity: 1, scale: 1, duration: 0.75 }, '<0.1')
        .to('.hero-stat:nth-child(3)', { opacity: 1, x: 0, scale: 1, duration: 0.75 }, '<0.1')
        .to('.hero-stat-num',   { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, '-=0.4')
        .to('.hero-stat-label', { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, '<0.05')

    }, heroRef)

    return () => ctx.revert()
  }, { scope: heroRef, dependencies: [lang] })

  const titleWords   = (t.heroTitle || '').split(' ')
  const subWords     = (t.slogan    || '').split(' ')

  return (
    <section className="hero" ref={heroRef} id="hero">

      <div className="hero-card">

        <div className="hero-card-top">
          <div className="hero-brand-mark">
            <span className="hero-brand-dot" />
            <span className="brand-text">
              {splitChars(t.eyebrow, 'brand-char')}
            </span>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <a href="https://www.instagram.com/framestudio.devv?igsh=NGdjZWU5MTM1MG1z&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hs-link hs-link--ig" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://wa.me/16864281021" target="_blank" rel="noopener noreferrer" className="hs-link hs-link--wa" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
                <path d="M9 9c-0.5 0-1 0.5-1 1.2 0 2.5 2.3 4.8 4.8 4.8 0.7 0 1.2-0.5 1.2-1l-1-1-1 0.5a3.5 3.5 0 0 1-2.5-2.5l0.5-1-1-1z" />
              </svg>
            </a>
            <a href="https://facebook.com/framestudio.devv" target="_blank" rel="noopener noreferrer" className="hs-link hs-link--fb" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M13.5 8H15V5.5h-1.5c-1.1 0-2 0.9-2 2V10h-1.5v2h1.5v6h2v-6H15l0.5-2h-2v-1a0.5 0.5 0 0 1 0.5-0.5z" />
              </svg>
            </a>
            <a href="https://x.com/framestudio_dev" target="_blank" rel="noopener noreferrer" className="hs-link hs-link--x" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M7 7l10 10M17 7L7 17" />
              </svg>
            </a>
            <a href="mailto:studioframe.dev@gmail.com" className="hs-link hs-link--em" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </a>
          </div>

        </div>

        <div className="hero-main-row">
          <div className="hero-main-text">
            <h1 className="hero-main-title">
              {titleWords.map((word, i) => (
                <span key={i} className="hero-title-word-clip">
                  <span className="hero-title-word">
                    {word.split('').map((c, j) => (
                      <span key={j} className="hero-title-char">{c}</span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-main-sub">
              {subWords.map((w, i) => (
                <span key={i} className="sub-word">
                  {w}{i < subWords.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>
          <a href="#contact" className="hero-main-cta">
            <span className="cta-text">{splitChars(t.cta_secondary, 'cta-char')}</span>
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="hero-media">
          <video className="hero-media-video" autoPlay muted loop playsInline>
            <source src="/absolute.mp4" type="video/mp4" />
          </video>
          <div className="hero-media-overlay" />

          <div className="hero-feature">
            <span className="hero-feature-tag">
              {splitChars('Studio', 'feature-tag-char')}
            </span>
            <h3 className="hero-feature-title">
              {splitChars(t.heroTitle, 'feature-title-char')}
            </h3>
          </div>

          <a href="#portfolio" className="hero-media-arrow" aria-label="View portfolio">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat">
            <span className="hero-stat-num">10<em>+</em></span>
            <span className="hero-stat-label">{t.stats.projects}</span>
          </div>

          <div className="hero-stat">
            <span className="hero-stat-num">3<em>+</em></span>
            <span className="hero-stat-label">{t.stats.services}</span>
          </div>

          <div className="hero-stat hero-stat--highlight">
            <span className="hero-stat-num">24<em>/7</em></span>
            <span className="hero-stat-label">Support</span>
          </div>
        </div>

      </div>

    </section>
  )
}
