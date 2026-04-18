import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Contact({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const s = (translations[lang] || translations.es).sections.contact

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-tag-row', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.ct-header', start: 'top 82%' },
      })
      gsap.from('.ct-title', {
        y: 50, opacity: 0, duration: 1,
        scrollTrigger: { trigger: '.ct-header', start: 'top 82%' },
        delay: 0.1,
      })
      gsap.from('.ct-form', {
        y: 40, opacity: 0, duration: 0.9,
        scrollTrigger: { trigger: '.ct-form', start: 'top 82%' },
      })
      gsap.from('.ct-info-block', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: '.ct-sidebar', start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="section-fade-top" />
      <div className="section-fade-bottom" />

      <video className="ct-video" autoPlay muted loop playsInline>
        <source src="/video-hero.mp4" type="video/mp4" />
      </video>
      <div className="ct-video-overlay" />

      <div className="ct-inner">
        <div className="ct-header">
          <div className="ct-tag-row">
            <span className="ct-section-num">.05</span>
            <span className="ct-section-label">{s.label}</span>
          </div>
          <h2 className="ct-title">
            {s.title[0]}<br />
            <em className="ct-title-em">{s.title[1]}</em>
          </h2>
        </div>

        <div className="ct-body">
          <form className="ct-form" onSubmit={e => e.preventDefault()}>
            <div className="ct-form-row">
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-name">{s.form.name}</label>
                <input className="ct-input" id="ct-name" type="text" placeholder={s.form.namePlaceholder} autoComplete="name" />
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-email">{s.form.email}</label>
                <input className="ct-input" id="ct-email" type="email" placeholder="tu@email.com" autoComplete="email" />
              </div>
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-service">{s.form.service}</label>
              <select className="ct-input ct-select" id="ct-service" defaultValue="">
                <option value="" disabled>{s.form.servicePlaceholder}</option>
                {s.form.services.map(sv => <option key={sv}>{sv}</option>)}
              </select>
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-msg">{s.form.message}</label>
              <textarea className="ct-input ct-textarea" id="ct-msg" rows="5" placeholder={s.form.messagePlaceholder} />
            </div>
            <button className="ct-submit" type="submit">
              <span>{s.form.submit}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <aside className="ct-sidebar">
            <div className="ct-info-block">
              <span className="ct-info-label">{s.form.email}</span>
              <a href="mailto:blackframeoficial@gmail.com" className="ct-info-value">blackframeoficial@gmail.com</a>
            </div>
            <div className="ct-info-block">
              <span className="ct-info-label">{s.info.phone}</span>
              <a href="tel:+1234567890" className="ct-info-value">+1 (234) 567-890</a>
            </div>
            <div className="ct-info-block">
              <span className="ct-info-label">{s.info.location}</span>
              <span className="ct-info-value">{s.info.locationValue}</span>
            </div>
            <div className="ct-info-block">
              <span className="ct-info-label">{s.info.hours}</span>
              <span className="ct-info-value">{s.info.hoursValue}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
