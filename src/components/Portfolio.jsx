import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const BASE_PROJECTS = [
  { id: 1, title: 'Ojo Rojo',       year: '2024', url: 'https://ojorojo-mx.vercel.app/',               type: 'web' },
  { id: 2, title: 'Yami House',     year: '2024', url: 'https://yamihouse-mxl.netlify.app/',            type: 'web' },
  { id: 3, title: 'La Chopería',    year: '2024', url: 'https://la-choperia.vercel.app/#inicio',        type: 'landing' },
  { id: 4, title: 'Perfect Salon',  year: '2025', url: 'https://v0-perfect-salon-website.vercel.app/', type: 'landing' },
]

const DESCRIPTIONS = {
  es: [
    'Sitio con identidad visual fuerte, diseño moderno y experiencia de usuario fluida.',
    'Presencia digital con diseño limpio, navegación intuitiva y estética profesional.',
    'Landing page de alto impacto con secciones bien definidas y llamadas a la acción claras.',
    'Sitio para salón de belleza con booking online, paleta elegante y diseño orientado a conversión.',
  ],
  en: [
    'Strong visual identity, modern design and smooth user experience.',
    'Digital presence with clean design, intuitive navigation and professional aesthetics.',
    'High-impact landing page with well-defined sections and clear calls to action.',
    'Beauty salon site with online booking, elegant palette and conversion-focused design.',
  ],
}

function getDesc(lang, i) {
  return (DESCRIPTIONS[lang] || DESCRIPTIONS.es)[i]
}

// Only mount iframe once section is near viewport, and stagger them
// to prevent massive main-thread blocking that causes scroll jank
function PreviewFrame({ url, title, ready, index }) {
  const [blocked, setBlocked] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (ready) {
      // Stagger iframe loads by 600ms each so they don't freeze the page
      const timer = setTimeout(() => setShouldLoad(true), index * 600)
      return () => clearTimeout(timer)
    }
  }, [ready, index])

  if (!shouldLoad) return <div className="pf-iframe-placeholder" />

  return blocked ? (
    <div className="pf-iframe-blocked">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
      <span>{title}</span>
    </div>
  ) : (
    <iframe
      src={url} title={title} className="pf-iframe"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms"
      onError={() => setBlocked(true)}
    />
  )
}

export default function Portfolio({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const [active, setActive]         = useState(null)
  const [iframesReady, setIframesReady] = useState(false)
  const s = (translations[lang] || translations.es).sections.portfolio

  // Defer iframe mounting until section is near the viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIframesReady(true) },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pf-tag-row', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.pf-header', start: 'top 82%' },
      })
      gsap.from('.pf-title', {
        y: 50, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.pf-header', start: 'top 82%' },
        delay: 0.1,
      })

      const cards = gsap.utils.toArray('.portfolio-card')
      gsap.from(cards, {
        y: 80, opacity: 0, duration: 0.9, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.pf-grid', start: 'top 78%' },
      })

      // Pulse: runs only 2 cycles then stops — no perpetual repeat loop
      const pulseTl = gsap.timeline({ paused: true })
      const up   = { y: -10, scale: 1.022, duration: 0.6, ease: 'power3.out' }
      const down = { y: 0, scale: 1, duration: 0.55, ease: 'power3.inOut', clearProps: 'transform' }

      for (let cycle = 0; cycle < 2; cycle++) {
        const base = cycle * cards.length
        cards.forEach((card, i) => {
          pulseTl.to(card, up, base + i)
          if (i > 0) pulseTl.to(cards[i - 1], down, base + i)
        })
        pulseTl.to(cards[cards.length - 1], down, base + cards.length)
      }
      // After 2 cycles wait 12s then restart — use delayedCall instead of repeat:-1
      pulseTl.call(() => {
        gsap.delayedCall(12, () => pulseTl.restart())
      })

      ScrollTrigger.create({
        trigger: '.pf-grid', start: 'top 72%', once: true,
        onEnter: () => pulseTl.play(),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  const openProject = BASE_PROJECTS.find(p => p.id === active)

  return (
    <section className="portfolio" id="portfolio" ref={sectionRef}>
      <div className="section-fade-top" />
      <div className="section-fade-bottom" />

      <video className="pf-video" autoPlay muted loop playsInline>
        <source src="/aura_animation.mp4" type="video/mp4" />
      </video>
      <div className="pf-video-overlay" />

      <div className="pf-inner">
        <div className="pf-header">
          <div className="pf-tag-row">
            <span className="pf-section-num">.03</span>
            <span className="pf-section-label">{s.label}</span>
          </div>
          <h2 className="pf-title">
            {s.title[0]}<br />
            <em className="pf-title-em">{s.title[1]}</em>
          </h2>
        </div>

        <div className="pf-grid">
          {BASE_PROJECTS.map((project, i) => (
            <div className="portfolio-card" key={project.id}>
              <div className="pf-card-visual">
                <div className="pf-iframe-wrap">
                  <PreviewFrame url={project.url} title={project.title} ready={iframesReady} index={i} />
                </div>
                <div className="pf-card-overlay" />
                <span className="pf-card-year">{project.year}</span>
                <div className="pf-card-actions">
                  <button className="pf-action-btn pf-action-expand" onClick={() => setActive(project.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                    </svg>
                    {s.viewSite}
                  </button>
                  <a className="pf-action-btn pf-action-external" href={project.url} target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    {s.newTab}
                  </a>
                </div>
              </div>
              <div className="pf-card-info">
                <span className="pf-card-cat">{s.categories[project.type]}</span>
                <h3 className="pf-card-title">{project.title}</h3>
                <p className="pf-card-desc">{getDesc(lang, i)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="pf-modal" onClick={(e) => e.target === e.currentTarget && setActive(null)}>
          <div className="pf-modal-inner">
            <div className="pf-modal-bar">
              <div className="pf-modal-url">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
                </svg>
                <span>{openProject?.url}</span>
              </div>
              <div className="pf-modal-controls">
                <a href={openProject?.url} target="_blank" rel="noopener noreferrer" className="pf-modal-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
                <button className="pf-modal-btn pf-modal-close" onClick={() => setActive(null)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <iframe
              src={openProject?.url} title={openProject?.title}
              className="pf-modal-iframe"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </section>
  )
}
