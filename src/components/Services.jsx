import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import './Services.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h4M7 11h6" strokeOpacity="0.5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
    </svg>
  ),
]

const CARD_AOS = ['zoom-out-right', 'fade-up', 'zoom-out-left']

export default function Services({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const s = (translations[lang] || translations.es).sections.services

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sv-divider', {
        scaleX: 0, duration: 1.6, ease: 'expo.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.sv-divider', start: 'top 90%' },
      })
      gsap.fromTo('.sv-video',
        { y: 140 },
        {
          y: -80, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', end: 'bottom top',
            scrub: 1.4,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section className="services" id="services" ref={sectionRef}>
      <video className="sv-video" autoPlay muted loop playsInline>
        <source src="/videobackground.mp4" type="video/mp4" />
      </video>
      <div className="sv-overlay" />
      <div className="sv-vignette" />
      <div className="sv-glow sv-glow--1" />
      <div className="sv-glow sv-glow--2" />
      <div className="sv-top-fade" />
      <div className="section-fade-bottom" />

      <div className="sv-inner">
        <div className="sv-header">
          <div className="sv-header-left">
            <div className="sv-tag-row" data-aos="fade-right">
              <span className="sv-section-num">.02</span>
              <span className="sv-section-label">{s.label}</span>
            </div>
            <h2 className="sv-title" data-aos="fade-right" data-aos-delay="150" data-aos-duration="1000">
              {s.title[0]}<br />
              <em className="sv-title-em">{s.title[1]}</em>
            </h2>
          </div>
          <p className="sv-desc" data-aos="fade-left" data-aos-delay="250">{s.desc}</p>
        </div>

        <div className="sv-divider" />

        <div className="sv-phrase-banner">
          <p className="sv-phrase-text" data-aos="zoom-out-left" data-aos-duration="1000">{s.phrase}</p>
        </div>

        <div className="sv-cards">
          {s.cards.map((card, i) => (
            <div
              className="sv-card" key={i}
              data-aos={CARD_AOS[i]}
              data-aos-delay={i * 130}
              data-aos-duration="900"
            >
              <div className="sv-card-bloom" />
              <div className="sv-card-body">
                <div className="sv-card-top">
                  <span className="sv-card-num" data-aos="fade-down" data-aos-delay={i * 130 + 200}>0{i + 1}</span>
                  <div className={`sv-card-icon float-slow float-d${(i % 3) + 1}`}>{ICONS[i]}</div>
                </div>
                <div className="sv-card-content">
                  <h3 className="sv-card-title">{card.title}</h3>
                  <p className="sv-card-accent">{card.accent}</p>
                  <p className="sv-card-desc">{card.desc}</p>
                </div>
                <div className="sv-card-foot">
                  <div className="sv-tags">
                    {(card.tags || []).map((tag, j) => (
                      <span className="sv-tag-pill" key={tag} data-aos="fade-up" data-aos-delay={i * 130 + j * 80 + 300}>{tag}</span>
                    ))}
                  </div>
                  <a href="#contact" className="sv-card-cta">
                    {s.cta}
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
