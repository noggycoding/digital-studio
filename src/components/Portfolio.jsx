import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const BASE_PROJECTS = [
  { id: 1, title: 'Ojo Rojo',      year: '2024', url: 'https://ojorojo-mx.vercel.app/',               type: 'web',     color: '#7a1515', image: '/ojorojo.png' },
  { id: 2, title: 'Yami House',    year: '2024', url: 'https://yamihouse-mxl.netlify.app/',            type: 'web',     color: '#1a3d66', image: '/yamihouse.png' },
  { id: 3, title: 'La Chopería',   year: '2024', url: 'https://la-choperia.vercel.app/#inicio',        type: 'landing', color: '#1e4d1e', image: '/lachope.png' },
  { id: 4, title: 'Perfect Salon', year: '2025', url: 'https://v0-perfect-salon-website.vercel.app/', type: 'landing', color: '#4a3510', image: '/perfectsalon.png' },
]

function ProjectImage({ title, image }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="pf-stack-img-wrap">
      {!loaded && <div className="pf-img-skeleton" />}
      <img
        src={image}
        alt={title}
        className={`pf-stack-img${loaded ? ' pf-stack-img--loaded' : ''}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default function Portfolio({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const [active, setActive]         = useState(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const s = (translations[lang] || translations.es).sections.portfolio

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => { setIframeLoaded(false) }, [active])

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
          <div className="pf-tag-row" data-aos="fade-right">
            <span className="pf-section-num">.03</span>
            <span className="pf-section-label">{s.label}</span>
          </div>
          <h2 className="pf-title" data-aos="fade-right" data-aos-delay="150" data-aos-duration="1000">
            {s.title[0]}<br />
            <em className="pf-title-em">{s.title[1]}</em>
          </h2>
        </div>

        <ScrollStack
          itemDistance={50}
          itemScale={0.035}
          itemStackDistance={22}
          stackPosition="22%"
          scaleEndPosition="10%"
          baseScale={0.9}
          blurAmount={2.5}
        >
          {BASE_PROJECTS.map((project, i) => (
            <ScrollStackItem key={project.id}>
              <div className="pf-stack-card" data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="800">
                {/* Left: info */}
                <div className="pf-stack-info">
                  <div className="pf-stack-meta">
                    <span className="pf-stack-num">0{i + 1}</span>
                    <span className="pf-stack-cat">{s.categories[project.type]}</span>
                    <span className="pf-stack-year">{project.year}</span>
                  </div>
                  <h3 className="pf-stack-title">{project.title}</h3>
                  <p className="pf-stack-desc">{(s.descriptions || [])[i]}</p>
                  <div className="pf-stack-actions">
                    <button className="pf-action-btn pf-action-expand" onClick={() => setActive(project.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                      </svg>
                      {s.viewSite}
                    </button>
                    <a className="pf-action-btn pf-action-external" href={project.url} target="_blank" rel="noopener noreferrer">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      {s.newTab}
                    </a>
                  </div>
                </div>

                {/* Right: preview */}
                <div className="pf-stack-preview">
                  <ProjectImage title={project.title} image={project.image} />
                  <div className="pf-stack-preview-overlay" />
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {active && (
        <div className="pf-modal" onClick={e => e.target === e.currentTarget && setActive(null)}>
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
            <div className="pf-modal-frame-wrap">
              {!iframeLoaded && <div className="pf-modal-skeleton" />}
              <iframe
                src={openProject?.url}
                title={openProject?.title}
                className={`pf-modal-iframe${iframeLoaded ? ' pf-modal-iframe--loaded' : ''}`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
