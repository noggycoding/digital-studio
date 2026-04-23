import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import './About.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CARD_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M2 7h20M8 21h8M12 17v4"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
  </svg>,
]

export default function About({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const s = (translations[lang] || translations.es).sections.about

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Header
      gsap.from('.ab-tag-row', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.ab-header', start: 'top 82%' },
      })
      gsap.from('.ab-title', {
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-header', start: 'top 82%' },
        delay: 0.12,
      })
      gsap.from('.ab-text', {
        y: 30, opacity: 0, duration: 0.9,
        scrollTrigger: { trigger: '.ab-text', start: 'top 88%' },
        delay: 0.22,
      })

      // Cards: dramatic entrance → then icon float
      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: '.ab-values', start: 'top 76%', once: true },
        onComplete() {
          // Float handled by CSS animation — no GSAP repeat loops needed
          document.querySelectorAll('.ab-value-icon').forEach(el => {
            el.classList.add('ab-icon-float')
          })
        },
      })
      cardTl
        .from('.ab-value', {
          y: 90, opacity: 0, scale: 0.93, duration: 1.05, ease: 'power3.out',
          stagger: 0.18, clearProps: 'scale',
        })
        .from('.ab-value-icon', {
          scale: 0, opacity: 0, duration: 0.55, ease: 'back.out(2.5)',
          stagger: 0.18,
        }, '-=0.75')

      // Divider
      gsap.from('.ab-divider', {
        scaleX: 0, duration: 1.4, ease: 'power2.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.ab-divider', start: 'top 90%' },
      })

      // Stats
      gsap.from('.ab-stat', {
        y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: '.ab-stats-row', start: 'top 82%' },
      })
      gsap.utils.toArray('.ab-counter').forEach(el => {
        const target = parseInt(el.dataset.target)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.dataset.suffix || '')
          },
        })
      })

      // Phrase
      gsap.from('.ab-phrase', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-phrase', start: 'top 85%' },
      })

    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-fade-top" />
      <div className="section-fade-bottom" />

      <video className="ab-video" autoPlay muted loop playsInline>
        <source src="/cube.mp4" type="video/mp4" />
      </video>
      <div className="ab-video-overlay" />

      <div className="ab-inner">

        {/* Compact header */}
        <div className="ab-header">
          <div className="ab-tag-row">
            <span className="ab-section-num">.04</span>
            <span className="ab-section-label">{s.label}</span>
          </div>
          <h2 className="ab-title">
            {s.title[0]}<br />
            <em className="ab-title-em">{s.title[1]}</em>
          </h2>
          <p className="ab-text">{s.text}</p>
        </div>

        {/* === Main cards — hero of the section === */}
        <div className="ab-values">
          {s.values.map((v, i) => (
            <div className="ab-value" key={i}>
              <div className="ab-value-top">
                <div className="ab-value-icon">{CARD_ICONS[i]}</div>
                <div className="ab-value-meta">
                  <span className="ab-value-num">0{i + 1}</span>
                  {v.subtitle && <span className="ab-value-subtitle">{v.subtitle}</span>}
                </div>
              </div>
              <div className="ab-value-content">
                <h3 className="ab-value-title">{v.title}</h3>
                <p className="ab-value-desc">{v.desc}</p>
                {v.example && <p className="ab-value-example">{v.example}</p>}
                {v.for && <p className="ab-value-for">{v.for}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="ab-divider" />

        {/* Stats below */}
        <div className="ab-stats-row">
          <div className="ab-stat float-slow">
            <span className="ab-counter" data-target="98" data-suffix="%">0%</span>
            <span className="ab-stat-label">{s.stats.satisfaction}</span>
          </div>
          <div className="ab-stat-sep" />
          <div className="ab-stat float-slow float-d1">
            <span className="ab-counter" data-target="10" data-suffix="+">0+</span>
            <span className="ab-stat-label">{s.stats.projects}</span>
          </div>
          <div className="ab-stat-sep" />
          <div className="ab-stat float-slow float-d2">
            <span className="ab-counter" data-target="24" data-suffix="/7">0/7</span>
            <span className="ab-stat-label">{s.stats.support}</span>
          </div>
        </div>

        <blockquote className="ab-phrase float-rotate">
          <span className="ab-phrase-mark">"</span>
          {s.phrase}
          <span className="ab-phrase-mark">"</span>
        </blockquote>

      </div>
    </section>
  )
}
