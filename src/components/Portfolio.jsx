import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PROJECTS = [
  {
    id: 1,
    title: 'Ojo Rojo',
    category: 'Sitio Web',
    year: '2024',
    url: 'https://ojorojo-mx.vercel.app/',
    description: 'Sitio con identidad visual fuerte, diseño moderno y experiencia de usuario fluida.',
  },
  {
    id: 2,
    title: 'Yami House',
    category: 'Sitio Web',
    year: '2024',
    url: 'https://yamihouse-mxl.netlify.app/',
    description: 'Presencia digital con diseño limpio, navegación intuitiva y estética profesional.',
  },
  {
    id: 3,
    title: 'La Chopería',
    category: 'Landing Page',
    year: '2024',
    url: 'https://la-choperia.vercel.app/#inicio',
    description: 'Landing page de alto impacto con secciones bien definidas y llamadas a la acción claras.',
  },
]

function PreviewFrame({ url, title }) {
  const [blocked, setBlocked] = useState(false)

  return blocked ? (
    <div className="pf-iframe-blocked">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
      <span>{title}</span>
    </div>
  ) : (
    <iframe
      src={url}
      title={title}
      className="pf-iframe"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms"
      onError={() => setBlocked(true)}
    />
  )
}

export default function Portfolio() {
  const sectionRef  = useRef(null)
  const [active, setActive] = useState(null)

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  // close on Escape
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
      gsap.from('.portfolio-card', {
        y: 80, opacity: 0, duration: 0.9, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.pf-grid', start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  const openProject = PROJECTS.find(p => p.id === active)

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
            <span className="pf-section-label">Portafolio</span>
          </div>
          <h2 className="pf-title">
            Proyectos que <br />
            <em className="pf-title-em">hablan por sí solos</em>
          </h2>
        </div>

        <div className="pf-grid">
          {PROJECTS.map((project) => (
            <div className="portfolio-card" key={project.id}>

              {/* Live preview iframe */}
              <div className="pf-card-visual">
                <div className="pf-iframe-wrap">
                  <PreviewFrame url={project.url} title={project.title} />
                </div>
                <div className="pf-card-overlay" />
                <span className="pf-card-year">{project.year}</span>

                {/* Hover actions */}
                <div className="pf-card-actions">
                  <button className="pf-action-btn pf-action-expand" onClick={() => setActive(project.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                    </svg>
                    Ver sitio
                  </button>
                  <a className="pf-action-btn pf-action-external" href={project.url} target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    Nueva pestaña
                  </a>
                </div>
              </div>

              <div className="pf-card-info">
                <span className="pf-card-cat">{project.category}</span>
                <h3 className="pf-card-title">{project.title}</h3>
                <p className="pf-card-desc">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full-screen site viewer modal ── */}
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
              src={openProject?.url}
              title={openProject?.title}
              className="pf-modal-iframe"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </section>
  )
}
