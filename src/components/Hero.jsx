import { useState, useEffect, useRef, Fragment } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { translations, LANGUAGES } from '../i18n/translations'
import SocialRail from './SocialRail'
import './Hero.css'

gsap.registerPlugin(useGSAP)

export default function Hero({ lang = 'es' }) {
  const [motIdx, setMotIdx] = useState(0)
  const heroRef      = useRef(null)
  const gsapRunCount = useRef(0)

  const t           = translations[lang] || translations.es
  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[1]

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

  // GSAP entrance timeline — re-runs on every lang change via dependency
  useGSAP(() => {
    gsapRunCount.current += 1
    const ctx = gsap.context(() => {
      // first run = initial page load, use longer delay to clear the page loader
      const delay = gsapRunCount.current === 1 ? 2.2 : 0.2
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay })

      tl.from('.nav-divider',     { scaleX: 0, duration: 1, ease: 'power2.inOut' })
        .from('.social-rail',     { x: -14, opacity: 0, duration: 0.9 }, '-=0.6')
        .from('.hero-brand-title',{ y: 60, opacity: 0, duration: 1.2, letterSpacing: '0.02em' }, '-=0.4')
        .from('.hero-eyebrow',    { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')

      const charEls = gsap.utils.toArray('.hl-char')
      tl.from(charEls, {
        y: '115%', duration: 0.52,
        stagger: { amount: 0.72, ease: 'power2.out' },
        ease: 'power3.out',
      }, '-=0.2')
        .from('.btn-primary',      { x: -16, opacity: 0, duration: 0.65 }, '-=0.1')
        .from('.btn-ghost',        { x: -10, opacity: 0, duration: 0.65 }, '-=0.5')
        .from('.sub-word', {
          y: '100%', duration: 0.42,
          stagger: { amount: 0.38, ease: 'power2.out' },
          ease: 'power3.out',
        }, '-=0.9')
        .from('.hero-stats',       { x: 18, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-badge',       { y: 10, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.scroll-indicator', { y: 10, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-section-num', { opacity: 0, duration: 0.8 },        '-=0.5')

      gsap.to('.layer-light', {
        opacity: 0.7, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
      })
    }, heroRef)

    return () => ctx.revert()
  }, { scope: heroRef, dependencies: [lang] })

  return (
    <section className="hero" ref={heroRef} id="hero">

      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/clean_animation.mp4" type="video/mp4" />
      </video>

      <div className="layer-overlay" />
      <div className="layer-light" />
      <div className="layer-vignette" />
      <div className="layer-noise" />

      <div className="nav-divider" />
      <SocialRail />

      <div className="hero-brand">
        <h1 className="hero-brand-title">FRAME <span className="hero-brand-studio">STUDIO</span></h1>
      </div>

      {/* key={lang} remounts this subtree on language change so GSAP finds fresh elements */}
      <div className="hero-body" key={lang}>

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

          {t.slogan && <p className="hero-slogan-sub">{t.slogan}</p>}

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

          <div className="hero-badge float-medium float-d1">
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

      <div className="hero-section-num">.01</div>

      <div className="scroll-indicator">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-track"><div className="scroll-thumb" /></div>
      </div>

      <div className="hero-bottom-fade" />

    </section>
  )
}
