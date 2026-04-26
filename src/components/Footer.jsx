import { translations } from '../i18n/translations'
import './Footer.css'

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/framestudio.devv?igsh=NGdjZWU5MTM1MG1z&utm_source=qr', icon: 'instagram' },
  { name: 'WhatsApp',  href: 'https://wa.me/16864281021', icon: 'whatsapp' },
  { name: 'Facebook',  href: 'https://www.facebook.com/share/14YwKonczfm/?mibextid=wwXIfr', icon: 'facebook' },
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

  const services = lang === 'es' 
    ? ['Desarrollo Web', 'Diseño UI/UX', 'Branding', 'Aplicaciones Web', 'Automatizaciones', 'Soluciones Personalizadas']
    : ['Web Development', 'UI/UX Design', 'Branding', 'Web Applications', 'Automation', 'Custom Solutions']

  const contactInfo = lang === 'es'
    ? {
        email: 'studioframe.dev@gmail.com',
        phone: '+1 (686) 428-1021',
        availability: 'Disponible 24/7',
        response: 'Respuesta en 24h'
      }
    : {
        email: 'studioframe.dev@gmail.com',
        phone: '+1 (686) 428-1021',
        availability: 'Available 24/7',
        response: 'Response in 24h'
      }

  return (
    <footer className="footer">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#hero" className="ft-logo">
              <img src="/logocomplete.png" alt="Frame Studio" className="ft-logo-img" loading="lazy" decoding="async" />
            </a>
            <p className="ft-tagline">{s.tagline}</p>
            <div className="ft-socials">
              {SOCIAL_LINKS.map(social => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  className="ft-social-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon === 'instagram' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
                    </svg>
                  )}
                  {social.icon === 'whatsapp' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
                      <path d="M9 9c-0.5 0-1 0.5-1 1.2 0 2.5 2.3 4.8 4.8 4.8 0.7 0 1.2-0.5 1.2-1l-1-1-1 0.5a3.5 3.5 0 0 1-2.5-2.5l0.5-1-1-1z" />
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M13.5 8H15V5.5h-1.5c-1.1 0-2 0.9-2 2V10h-1.5v2h1.5v6h2v-6H15l0.5-2h-2v-1a0.5 0.5 0 0 1 0.5-0.5z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="ft-columns">
            <div className="ft-col">
              <span className="ft-col-title">{s.nav}</span>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="ft-link">{link.label}</a>
              ))}
            </div>
            
            <div className="ft-col">
              <span className="ft-col-title">{lang === 'es' ? 'Servicios' : 'Services'}</span>
              {services.map(service => (
                <a key={service} href="#services" className="ft-link">{service}</a>
              ))}
            </div>

            <div className="ft-col">
              <span className="ft-col-title">{lang === 'es' ? 'Contacto' : 'Contact'}</span>
              <a href={`mailto:${contactInfo.email}`} className="ft-link ft-link--contact">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                {contactInfo.email}
              </a>
              <a href={`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}`} className="ft-link ft-link--contact" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
                  <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
                </svg>
                {contactInfo.phone}
              </a>
              <div className="ft-availability">
                <span className="ft-status-dot"></span>
                <span className="ft-status-text">{contactInfo.availability}</span>
              </div>
              <span className="ft-response">{contactInfo.response}</span>
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
