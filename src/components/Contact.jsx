import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Contact() {
  const sectionRef = useRef(null)

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
      <div className="ct-inner">
        <div className="ct-header">
          <div className="ct-tag-row">
            <span className="ct-section-num">.05</span>
            <span className="ct-section-label">Contacto</span>
          </div>
          <h2 className="ct-title">
            ¿Listo para<br />
            <em className="ct-title-em">elevar tu marca?</em>
          </h2>
        </div>

        <div className="ct-body">
          <form className="ct-form" onSubmit={e => e.preventDefault()}>
            <div className="ct-form-row">
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-name">Nombre</label>
                <input className="ct-input" id="ct-name" type="text" placeholder="Tu nombre" autoComplete="name" />
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-email">Email</label>
                <input className="ct-input" id="ct-email" type="email" placeholder="tu@email.com" autoComplete="email" />
              </div>
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-service">Servicio</label>
              <select className="ct-input ct-select" id="ct-service" defaultValue="">
                <option value="" disabled>Selecciona un servicio</option>
                <option>Diseño Web</option>
                <option>Automatización</option>
                <option>Redes Sociales</option>
                <option>Consultoría Digital</option>
              </select>
            </div>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-msg">Mensaje</label>
              <textarea className="ct-input ct-textarea" id="ct-msg" rows="5" placeholder="Cuéntanos sobre tu proyecto..." />
            </div>
            <button className="ct-submit" type="submit">
              <span>Enviar mensaje</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <aside className="ct-sidebar">
            <div className="ct-info-block">
              <span className="ct-info-label">Email</span>
              <a href="mailto:hello@studio.com" className="ct-info-value">hello@studio.com</a>
            </div>
            <div className="ct-info-block">
              <span className="ct-info-label">Teléfono</span>
              <a href="tel:+1234567890" className="ct-info-value">+1 (234) 567-890</a>
            </div>
            <div className="ct-info-block">
              <span className="ct-info-label">Ubicación</span>
              <span className="ct-info-value">Remoto — Global</span>
            </div>
            <div className="ct-info-block">
              <span className="ct-info-label">Horario</span>
              <span className="ct-info-value">Lun – Vie · 9:00 – 18:00</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
