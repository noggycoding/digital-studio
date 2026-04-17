import './Footer.css'

const NAV_LINKS = ['Servicios', 'Portafolio', 'Nosotros', 'Contacto']
const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#' },
  { name: 'WhatsApp', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="ft-inner">
        {/* ── Top ── */}
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#hero" className="ft-logo">
              STUDIO<span className="ft-logo-accent">.</span>
            </a>
            <p className="ft-tagline">
              Creamos experiencias digitales<br />que mueven negocios.
            </p>
          </div>

          <div className="ft-columns">
            <div className="ft-col">
              <span className="ft-col-title">Navegación</span>
              {NAV_LINKS.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="ft-link">{link}</a>
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

        {/* ── Divider ── */}
        <div className="ft-divider" />

        {/* ── Bottom ── */}
        <div className="ft-bottom">
          <span className="ft-copyright">© {new Date().getFullYear()} STUDIO. Todos los derechos reservados.</span>
          <div className="ft-bottom-links">
            <a href="#" className="ft-bottom-link">Política de privacidad</a>
            <a href="#" className="ft-bottom-link">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
