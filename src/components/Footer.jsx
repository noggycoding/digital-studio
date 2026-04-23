import { translations } from '../i18n/translations'
import './Footer.css'

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/framestudio.devv?igsh=NGdjZWU5MTM1MG1z&utm_source=qr' },
  { name: 'WhatsApp',  href: 'https://wa.me/16864281021' },
  { name: 'Facebook',  href: 'https://facebook.com/framestudio.devv' },
  { name: 'X',         href: 'https://x.com/framestudio_dev' },
]

export default function Footer({ lang = 'es' }) {
  const t = translations[lang] || translations.es
  const s = t.sections.footer
  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  return (
    <footer className="footer">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#hero" className="ft-logo">
              <img src="/logocomplete.png" alt="Frame Studio" className="ft-logo-img" loading="lazy" decoding="async" />
            </a>
            <p className="ft-tagline">{s.tagline}</p>
          </div>

          <div className="ft-columns">
            <div className="ft-col">
              <span className="ft-col-title">{s.nav}</span>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="ft-link">{link.label}</a>
              ))}
            </div>
            <div className="ft-col">
              <span className="ft-col-title">Social</span>
              {SOCIAL_LINKS.map(s => (
                <a key={s.name} href={s.href} className="ft-link" target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ft-divider" />

        <div className="ft-bottom">
          <span className="ft-copyright">© {new Date().getFullYear()} Frame Studio. {s.copyright}</span>
          <div className="ft-bottom-links">
            <a href="#" className="ft-bottom-link">{s.privacy}</a>
            <a href="#" className="ft-bottom-link">{s.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
