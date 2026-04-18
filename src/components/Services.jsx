import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CARDS = [
  {
    num: '01',
    title: 'Diseño Web',
    accent: 'que convierte',
    desc: 'Sitios rápidos, modernos y alineados a tu marca. Desde landing pages hasta e-commerce completos.',
    tags: ['Landing Pages', 'E-commerce', 'Portafolios'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h4M7 11h6" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Automatización',
    accent: 'que trabaja sola',
    desc: 'Flujos de trabajo inteligentes que eliminan tareas repetitivas y hacen crecer tu negocio 24/7.',
    tags: ['CRM', 'Email Flows', 'Integraciones'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Redes Sociales',
    accent: 'que generan impacto',
    desc: 'Estrategia, contenido y gestión de comunidad. Tu marca presente donde está tu audiencia.',
    tags: ['Instagram', 'TikTok', 'LinkedIn'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
      </svg>
    ),
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.from('.sv-tag-row', {
        x: -80, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.sv-header', start: 'top 82%' },
      })
      gsap.from('.sv-title', {
        x: -100, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sv-header', start: 'top 82%' },
        delay: 0.12,
      })
      gsap.from('.sv-desc', {
        x: 80, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.sv-header', start: 'top 82%' },
        delay: 0.22,
      })
      gsap.from('.sv-divider', {
        scaleX: 0, duration: 1.4, ease: 'power2.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.sv-divider', start: 'top 90%' },
      })
      gsap.from('.sv-card', {
        y: 80, opacity: 0, duration: 0.9, ease: 'power3.out',
        stagger: { amount: 0.5 },
        scrollTrigger: { trigger: '.sv-cards', start: 'top 78%' },
      })
      gsap.from('.sv-card-num', {
        x: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: { amount: 0.4 },
        scrollTrigger: { trigger: '.sv-cards', start: 'top 78%' },
        delay: 0.35,
      })
      gsap.from('.sv-tag-pill', {
        x: -20, opacity: 0, duration: 0.6, ease: 'power2.out',
        stagger: { amount: 0.6 },
        scrollTrigger: { trigger: '.sv-cards', start: 'top 70%' },
        delay: 0.5,
      })

      gsap.fromTo('.sv-video',
        { y: 140 },
        {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        }
      )

    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section className="services" id="services" ref={sectionRef}>

      {/* ── Video background ── */}
      <video className="sv-video" autoPlay muted loop playsInline>
        <source src="/videobackground.mp4" type="video/mp4" />
      </video>
      <div className="sv-overlay" />
      <div className="sv-vignette" />

      {/* ── Ambient glow ── */}
      <div className="sv-glow sv-glow--1" />
      <div className="sv-glow sv-glow--2" />

      {/* ── Top fade from Hero ── */}
      <div className="sv-top-fade" />
      <div className="section-fade-bottom" />

      {/* ── Content ── */}
      <div className="sv-inner">

        <div className="sv-header">
          <div className="sv-header-left">
            <div className="sv-tag-row">
              <span className="sv-section-num">.02</span>
              <span className="sv-section-label">Qué hacemos</span>
            </div>
            <h2 className="sv-title">
              Soluciones que<br />
              <em className="sv-title-em">escalan contigo</em>
            </h2>
          </div>
          <p className="sv-desc">
            Cada servicio está diseñado para generar resultados medibles.
            No vendemos horas — construimos sistemas que trabajan por ti.
          </p>
        </div>

        <div className="sv-divider" />

        {/* ── Highlighted phrase ── */}
        <div className="sv-phrase-banner">
          <span className="sv-phrase-line" aria-hidden="true">—</span>
          <p className="sv-phrase-text">Tu negocio más inteligente que nunca</p>
          <span className="sv-phrase-line" aria-hidden="true">—</span>
        </div>

        <div className="sv-cards">
          {CARDS.map((card, i) => (
            <div className="sv-card" key={i}>
              <div className="sv-card-bloom" />
              <div className="sv-card-body">
                <div className="sv-card-top">
                  <span className="sv-card-num">{card.num}</span>
                  <div className={`sv-card-icon float-slow float-d${(i % 3) + 1}`}>{card.icon}</div>
                </div>
                <div className="sv-card-content">
                  <h3 className="sv-card-title">{card.title}</h3>
                  <p className="sv-card-accent">{card.accent}</p>
                  <p className="sv-card-desc">{card.desc}</p>
                </div>
                <div className="sv-card-foot">
                  <div className="sv-tags">
                    {card.tags.map(t => (
                      <span className="sv-tag-pill" key={t}>{t}</span>
                    ))}
                  </div>
                  <a href="#contact" className="sv-card-cta">
                    Empezar
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
