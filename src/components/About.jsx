import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import './About.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CARD_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"/>
    <path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
]

export default function About({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const s = (translations[lang] || translations.es).sections.about

  useGSAP(() => {
    const ctx = gsap.context(() => {

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
        scrollTrigger: { trigger: '.ab-values', start: 'top 90%', once: true },
        onComplete() {
          // Float handled by CSS animation — no GSAP repeat loops needed
          document.querySelectorAll('.ab-value-icon').forEach(el => {
            el.classList.add('ab-icon-float')
          })
        },
      })
      cardTl
        .from('.ab-value', {
          y: 60, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out',
          stagger: 0.15, clearProps: 'all',
        })
        .from('.ab-value-icon', {
          scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)',
          stagger: 0.15,
        }, '-=0.6')

      gsap.from('.ab-divider', {
        scaleX: 0, duration: 1.4, ease: 'power2.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.ab-divider', start: 'top 90%' },
      })

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

        <div className="ab-values">
          {s.values.map((v, i) => (
            <div className="ab-value" key={i}>

              <div className="ab-value-left">
                <span className="ab-value-num-big">0{i + 1}</span>
                {v.subtitle && (
                  <span className="ab-value-subtitle">{v.subtitle}</span>
                )}
              </div>

              <div className="ab-value-content">
                <div className="ab-value-title-row">
                  <h3 className="ab-value-title">{v.title}</h3>
                  <div className="ab-value-icon">{CARD_ICONS[i]}</div>
                </div>
                <p className="ab-value-desc">{v.desc}</p>
                {v.example && (
                  <p className="ab-value-example">{v.example}</p>
                )}
                {v.for && (
                  <p className="ab-value-for">{v.for}</p>
                )}
              </div>

            </div>
          ))}
        </div>

        <div className="ab-divider" />

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
