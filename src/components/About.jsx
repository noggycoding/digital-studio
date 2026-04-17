import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const VALUES = [
  {
    num: '01',
    title: 'Diseño con propósito',
    desc: 'Cada pixel está pensado para generar resultados de negocio, no solo para verse bien.',
  },
  {
    num: '02',
    title: 'Código limpio',
    desc: 'Construimos con las mejores prácticas para que tu inversión escale sin límites técnicos.',
  },
  {
    num: '03',
    title: 'Resultados medibles',
    desc: 'No adivinamos — medimos, iteramos y optimizamos cada aspecto de tu presencia digital.',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ab-tag-row', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.ab-header', start: 'top 82%' },
      })
      gsap.from('.ab-title', {
        y: 50, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.ab-header', start: 'top 82%' },
        delay: 0.1,
      })
      gsap.from('.ab-text', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.ab-text', start: 'top 85%' },
      })
      gsap.from('.ab-divider', {
        scaleX: 0, duration: 1.2, ease: 'power2.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.ab-divider', start: 'top 90%' },
      })
      gsap.from('.ab-value', {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.ab-values', start: 'top 78%' },
      })
      // Counter animation
      gsap.utils.toArray('.ab-counter').forEach(el => {
        const target = parseInt(el.dataset.target)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.dataset.suffix || '')
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="ab-inner">
        <div className="ab-header">
          <div className="ab-header-left">
            <div className="ab-tag-row">
              <span className="ab-section-num">.04</span>
              <span className="ab-section-label">Nosotros</span>
            </div>
            <h2 className="ab-title">
              No somos una agencia<br />
              <em className="ab-title-em">más del montón</em>
            </h2>
          </div>
          <p className="ab-text">
            Somos un equipo obsesionado con la excelencia digital. 
            Combinamos estrategia, diseño de alto nivel y tecnología de vanguardia 
            para construir presencias digitales que realmente mueven el negocio.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="ab-stats-row">
          <div className="ab-stat">
            <span className="ab-counter" data-target="98" data-suffix="%">0%</span>
            <span className="ab-stat-label">Satisfacción</span>
          </div>
          <div className="ab-stat-sep" />
          <div className="ab-stat">
            <span className="ab-counter" data-target="10" data-suffix="+">0+</span>
            <span className="ab-stat-label">Proyectos entregados</span>
          </div>
          <div className="ab-stat-sep" />
          <div className="ab-stat">
            <span className="ab-counter" data-target="24" data-suffix="/7">0/7</span>
            <span className="ab-stat-label">Soporte</span>
          </div>
        </div>

        <div className="ab-divider" />

        {/* ── Values ── */}
        <div className="ab-values">
          {VALUES.map(v => (
            <div className="ab-value" key={v.num}>
              <span className="ab-value-num">{v.num}</span>
              <div className="ab-value-content">
                <h3 className="ab-value-title">{v.title}</h3>
                <p className="ab-value-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
