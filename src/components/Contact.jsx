import { useRef, useState } from 'react'
import { translations } from '../i18n/translations'
import { sanitize, isValidEmail, checkSubmitThrottle } from '../utils/sanitize'
import './Contact.css'

function ContactIcon({ name }) {
  const p = {
    width: 20, height: 20, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.8,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  switch (name) {
    case 'mail':
      return (
        <svg {...p}>
          <rect className="ic-mail-body" x="2" y="4" width="20" height="16" rx="2"/>
          <path className="ic-mail-flap" d="M2 6l10 7 10-7"/>
          <path className="ic-mail-spark" d="M17 2l.8 1.6L19.5 4l-1.7.4L17 6l-.8-1.6L14.5 4l1.7-.4z" fill="currentColor" stroke="none"/>
        </svg>
      )
    case 'phone':
      return (
        <svg {...p}>
          <path className="ic-phone-body" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.97.36 1.92.7 2.83a2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.86.57 2.83.7A2 2 0 0 1 22 16.9z"/>
          <path className="ic-phone-wave ic-phone-wave--1" d="M15.5 6.5a4 4 0 0 1 2 2"/>
          <path className="ic-phone-wave ic-phone-wave--2" d="M14 3a8 8 0 0 1 7 7"/>
        </svg>
      )
    case 'pin':
      return (
        <svg {...p}>
          <path className="ic-pin-body" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
          <circle className="ic-pin-dot" cx="12" cy="10" r="3" fill="currentColor"/>
          <ellipse className="ic-pin-shadow" cx="12" cy="22.5" rx="3.5" ry="0.8" fill="currentColor" opacity="0.25" stroke="none"/>
        </svg>
      )
    case 'clock':
      return (
        <svg {...p}>
          <circle className="ic-clock-face" cx="12" cy="12" r="10"/>
          <polyline className="ic-clock-hour"   points="12,7 12,12"/>
          <polyline className="ic-clock-minute" points="12,12 16,12"/>
          <circle className="ic-clock-center" cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>
        </svg>
      )
    default:
      return null
  }
}

export default function Contact({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const s = (translations[lang] || translations.es).sections.contact

  const [fields, setFields] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || status === 'success') return

    if (!checkSubmitThrottle()) {
      setErrorMsg(lang === 'en' ? 'Please wait before sending again.' : 'Espera un momento antes de volver a enviar.')
      setStatus('error')
      return
    }

    const name    = sanitize(fields.name,    100)
    const email   = sanitize(fields.email,   200)
    const service = sanitize(fields.service, 100)
    const message = sanitize(fields.message, 2000)

    if (!name || !email || !message) {
      setErrorMsg(lang === 'en' ? 'Name, email and message are required.' : 'Nombre, email y mensaje son requeridos.')
      setStatus('error')
      return
    }
    if (!isValidEmail(email)) {
      setErrorMsg(lang === 'en' ? 'Enter a valid email address.' : 'Ingresa un email valido.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, message, _hp: '' }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setFields({ name: '', email: '', service: '', message: '' })
      } else {
        setErrorMsg(data.error || (lang === 'en' ? 'Something went wrong.' : 'Ocurrio un error.'))
        setStatus('error')
      }
    } catch {
      setErrorMsg(lang === 'en' ? 'Network error. Try again.' : 'Error de red. Intenta de nuevo.')
      setStatus('error')
    }
  }

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
          <div className="ct-tag-row" data-aos="fade-right">
            <span className="ct-section-num">.05</span>
            <span className="ct-section-label">{s.label}</span>
          </div>
          <h2 className="ct-title" data-aos="fade-right" data-aos-delay="150" data-aos-duration="1100">
            {s.title[0]}<br />
            <em className="ct-title-em">{s.title[1]}</em>
          </h2>
          <p className="ct-subtitle" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
            {s.phrase}
          </p>
        </div>

        <div className="ct-body">
          <div className="ct-form-card" data-aos="fade-left" data-aos-delay="100" data-aos-duration="950">
          <form className="ct-form" onSubmit={handleSubmit}>
            <input type="text" name="_hp" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className="ct-form-row">
              <div className="ct-field" data-aos="fade-up-right" data-aos-delay="200">
                <label className="ct-label" htmlFor="ct-name">{s.form.name}</label>
                <input className="ct-input" id="ct-name" type="text" placeholder={s.form.namePlaceholder} autoComplete="name" value={fields.name} onChange={set('name')} />
              </div>
              <div className="ct-field" data-aos="fade-up-left" data-aos-delay="300">
                <label className="ct-label" htmlFor="ct-email">{s.form.email}</label>
                <input className="ct-input" id="ct-email" type="email" placeholder={s.form.emailPlaceholder} autoComplete="email" value={fields.email} onChange={set('email')} />
              </div>
            </div>
            <div className="ct-field" data-aos="fade-up-right" data-aos-delay="380">
              <label className="ct-label" htmlFor="ct-service">{s.form.service}</label>
              <select className="ct-input ct-select" id="ct-service" value={fields.service} onChange={set('service')}>
                <option value="" disabled>{s.form.servicePlaceholder}</option>
                {s.form.services.map(sv => <option key={sv}>{sv}</option>)}
              </select>
            </div>
            <div className="ct-field" data-aos="fade-up-left" data-aos-delay="460">
              <label className="ct-label" htmlFor="ct-msg">{s.form.message}</label>
              <textarea className="ct-input ct-textarea" id="ct-msg" rows="5" placeholder={s.form.messagePlaceholder} value={fields.message} onChange={set('message')} />
            </div>

            {status === 'error' && (
              <p className="ct-form-error">{errorMsg}</p>
            )}
            {status === 'success' && (
              <p className="ct-form-success">
                {lang === 'en' ? 'Message sent! We will get back to you soon.' : 'Mensaje enviado. Te contactaremos pronto.'}
              </p>
            )}

            <button className="ct-submit" data-aos="zoom-out-right" data-aos-delay="560" type="submit" disabled={status === 'sending' || status === 'success'}>
              {status === 'sending' ? (
                <span className="ct-submit-spinner" />
              ) : (
                <>
                  <span>{status === 'success' ? (lang === 'en' ? 'Sent' : 'Enviado') : s.form.submit}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </form>
          </div>

          <aside className="ct-sidebar" data-aos="fade-right" data-aos-delay="200" data-aos-duration="950">
            {[
              {
                icon: 'mail',
                label: s.form.email,
                value: 'studioframe.dev@gmail.com',
                href: 'mailto:studioframe.dev@gmail.com',
              },
              {
                icon: 'phone',
                label: s.info.phone,
                value: '+1 (686) 428-1021',
                href: 'tel:+16864281021',
              },
              {
                icon: 'pin',
                label: s.info.location,
                value: s.info.locationValue,
              },
              {
                icon: 'clock',
                label: s.info.hours,
                value: s.info.hoursValue,
              },
            ].map((item, i) => (
              <div className="ct-info-block" key={i} data-aos="fade-up-right" data-aos-delay={350 + i * 110}>
                <div className={`ct-info-icon ct-info-icon--${item.icon}`}>
                  <ContactIcon name={item.icon} />
                </div>
                <div className="ct-info-text">
                  <span className="ct-info-label">{item.label}</span>
                  {item.href
                    ? <a href={item.href} className="ct-info-value">{item.value}</a>
                    : <span className="ct-info-value">{item.value}</span>
                  }
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
