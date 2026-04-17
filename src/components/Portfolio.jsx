import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PROJECTS = [
  {
    id: 1,
    title: 'Luxe Boutique',
    category: 'E-commerce',
    year: '2024',
    description: 'Tienda online premium con experiencia de compra inmersiva y diseño editorial.',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    id: 2,
    title: 'Nexa Corp',
    category: 'Sitio Corporativo',
    year: '2024',
    description: 'Presencia digital corporativa con animaciones cinematográficas y arquitectura moderna.',
    gradient: 'linear-gradient(135deg, #0f0f23 0%, #1a0a2e 100%)',
  },
  {
    id: 3,
    title: 'Aura Studio',
    category: 'Portfolio Creativo',
    year: '2023',
    description: 'Portafolio interactivo con transiciones fluidas y galería de proyectos dinámica.',
    gradient: 'linear-gradient(135deg, #1a2332 0%, #0d1b2a 100%)',
  },
  {
    id: 4,
    title: 'Verde Market',
    category: 'Landing Page',
    year: '2023',
    description: 'Landing page de alto rendimiento con automatización de leads y A/B testing.',
    gradient: 'linear-gradient(135deg, #0a1a0f 0%, #1a2e1a 100%)',
  },
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

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

  return (
    <section className="portfolio" id="portfolio" ref={sectionRef}>
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
            <div
              className={`portfolio-card${hoveredId === project.id ? ' active' : ''}`}
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="pf-card-visual" style={{ background: project.gradient }}>
                <div className="pf-card-overlay" />
                <span className="pf-card-year">{project.year}</span>
                <div className="pf-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
    </section>
  )
}
