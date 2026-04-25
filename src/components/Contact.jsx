import { useRef } from 'react'
import { translations } from '../i18n/translations'
import './Contact.css'

function ContactIcon({ name }) {
  const common = {
    width: 20, height: 20, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.4,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  switch (name) {
    case 'mail':
      return (
        <svg {...common}>
          <rect className="ic-mail-body" x="3" y="5" width="18" height="14" rx="2" />
          <path className="ic-mail-flap" d="M3 7l9 6 9-6" />
          <path className="ic-mail-spark" d="M17 3l0.7 1.5L19 5l-1.3 0.5L17 7l-0.7-1.5L15 5l1.3-0.5z" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path className="ic-phone-body" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.8.7A2 2 0 0 1 22 16.9z" />
          <path className="ic-phone-wave ic-phone-wave--1" d="M15.5 6.5a4 4 0 0 1 2 2" />
          <path className="ic-phone-wave ic-phone-wave--2" d="M14.5 3.5a7.5 7.5 0 0 1 6 6" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path className="ic-pin-body" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
          <circle className="ic-pin-dot" cx="12" cy="10" r="2.8" fill="currentColor" />
          <ellipse className="ic-pin-shadow" cx="12" cy="22" rx="4" ry="0.9" fill="currentColor" opacity="0.3" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle className="ic-clock-face" cx="12" cy="12" r="9" />
          <line className="ic-clock-hour"   x1="12" y1="12" x2="12" y2="7"  />
          <line className="ic-clock-minute" x1="12" y1="12" x2="16" y2="12" />
          <circle className="ic-clock-center" cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}

export default function Contact({ lang = 'es' }) {
  const sectionRef = useRef(null)
  const s = (translations[lang] || translations.es).sections.contact

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
          <form className="ct-form" onSubmit={e => e.preventDefault()}>
            <div className="ct-form-row">
              <div className="ct-field" data-aos="fade-up-right" data-aos-delay="200">
                <label className="ct-label" htmlFor="ct-name">{s.form.name}</label>
                <input className="ct-input" id="ct-name" type="text" placeholder={s.form.namePlaceholder} autoComplete="name" />
              </div>
              <div className="ct-field" data-aos="fade-up-left" data-aos-delay="300">
                <label className="ct-label" htmlFor="ct-email">{s.form.email}</label>
                <input className="ct-input" id="ct-email" type="email" placeholder={s.form.emailPlaceholder} autoComplete="email" />
              </div>
            </div>
            <div className="ct-field" data-aos="fade-up-right" data-aos-delay="380">
              <label className="ct-label" htmlFor="ct-service">{s.form.service}</label>
              <select className="ct-input ct-select" id="ct-service" defaultValue="">
                <option value="" disabled>{s.form.servicePlaceholder}</option>
                {s.form.services.map(sv => <option key={sv}>{sv}</option>)}
              </select>
            </div>
            <div className="ct-field" data-aos="fade-up-left" data-aos-delay="460">
              <label className="ct-label" htmlFor="ct-msg">{s.form.message}</label>
              <textarea className="ct-input ct-textarea" id="ct-msg" rows="5" placeholder={s.form.messagePlaceholder} />
            </div>
            <button className="ct-submit" data-aos="zoom-out-right" data-aos-delay="560" type="submit">
              <span>{s.form.submit}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
