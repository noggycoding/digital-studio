import { useRef } from 'react'
import { translations } from '../i18n/translations'
import './Social.css'

const SOCIALS = [
  {
    id: 'instagram',
    label: '@framestudio.devv',
    handle: 'Instagram',
    href: 'https://www.instagram.com/framestudio.devv?igsh=NGdjZWU5MTM1MG1z&utm_source=qr',
    color: '#E1306C',
    Icon: () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect className="ig-frame" x="7" y="7" width="34" height="34" rx="10" />
        <circle className="ig-lens"  cx="24" cy="24" r="8" />
        <circle className="ig-dot"   cx="33" cy="15" r="1.6" fill="currentColor" />
        <circle className="ig-ring"  cx="24" cy="24" r="13" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: '+1 (686) 428-1021',
    handle: 'WhatsApp',
    href: 'https://wa.me/16864281021',
    color: '#25D366',
    Icon: () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path className="wa-body" d="M24 6a18 18 0 0 0-15.4 27.2L6 42l9-2.5A18 18 0 1 0 24 6z" />
        <path className="wa-handset" d="M18 18c-1 0 -2 1-2 2.5 0 5 4.5 9.5 9.5 9.5 1.5 0 2.5-1 2.5-2l-2-2-2 1a7 7 0 0 1-5-5l1-2-2-2z" />
        <circle className="wa-ping wa-ping--1" cx="38" cy="10" r="2" fill="currentColor" opacity="0" />
        <circle className="wa-ping wa-ping--2" cx="42" cy="14" r="1.4" fill="currentColor" opacity="0" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'framestudio.devv',
    handle: 'Facebook',
    href: 'https://facebook.com/framestudio.devv',
    color: '#1877F2',
    Icon: () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle className="fb-circle" cx="24" cy="24" r="18" />
        <path className="fb-f" d="M27 16h3v-4h-3c-2.2 0-4 1.8-4 4v4h-3v4h3v12h4V24h3l1-4h-4v-3a1 1 0 0 1 1-1z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'x',
    label: '@framestudio_dev',
    handle: 'X / Twitter',
    href: 'https://x.com/framestudio_dev',
    color: '#ffffff',
    Icon: () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect className="x-box" x="7" y="7" width="34" height="34" rx="8" />
        <g className="x-mark" transform-origin="24 24">
          <path d="M14 14l20 20M34 14L14 34" />
        </g>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'studioframe.dev@gmail.com',
    handle: 'Email',
    href: 'mailto:studioframe.dev@gmail.com',
    color: '#B4D2FF',
    Icon: () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect className="em-body" x="6" y="12" width="36" height="26" rx="3" />
        <path className="em-flap" d="M6 14l18 12 18-12" />
        <path className="em-spark" d="M38 6l0.8 1.8L40.6 8.6 38.8 9.4 38 11.2 37.2 9.4 35.4 8.6 37.2 7.8z" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Social({ lang = 'es' }) {
  const ref = useRef(null)
  const t   = translations[lang] || translations.es
  const copy = lang === 'en'
    ? { label: 'Connect', title: ['Follow us', 'everywhere'], desc: 'Find us on your favorite platform — we respond fast.' }
    : { label: 'Conecta', title: ['Síguenos',  'en todas partes'], desc: 'Encuéntranos en tu plataforma favorita — respondemos rápido.' }

  return (
    <section className="social-sec" ref={ref}>
      <div className="social-sec-inner">
        <div className="social-sec-header" data-aos="fade-up">
          <span className="social-sec-label">{copy.label}</span>
          <h2 className="social-sec-title">
            {copy.title[0]}<br />
            <em className="social-sec-title-em">{copy.title[1]}</em>
          </h2>
          <p className="social-sec-desc">{copy.desc}</p>
        </div>

        <div className="social-grid">
          {SOCIALS.map((s, i) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card social-card--${s.id}`}
              data-aos="fade-up"
              data-aos-delay={i * 90}
              style={{ '--brand': s.color }}
            >
              <div className="social-icon-wrap">
                <span className="social-halo" />
                <s.Icon />
              </div>
              <div className="social-meta">
                <span className="social-handle">{s.handle}</span>
                <span className="social-label">{s.label}</span>
              </div>
              <svg className="social-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
