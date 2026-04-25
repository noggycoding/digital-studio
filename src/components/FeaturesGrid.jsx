import { useRef } from 'react'
import './FeaturesGrid.css'

const ICONS = {
  layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  ),
  diamond: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M2 9h20" />
      <path d="M12 21V9" />
      <path d="M6 3l6 6" />
      <path d="M18 3l-6 6" />
    </svg>
  ),
  text: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  pen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  atom: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  brush: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.37 2.63a3 3 0 0 1 4.24 4.24l-9.67 9.67A4 4 0 0 1 10.12 18H5.98a1 1 0 0 1-.98-1.2l1.45-6.8a4 4 0 0 1 1.48-2.2l9.67-9.67z" />
      <path d="M2.5 21.5L6 18" />
    </svg>
  )
}

export default function FeaturesGrid({ lang = 'es' }) {
  const data = {
    es: [
      { id: 'layers', title: 'Capas y Grupos\nOrganizados' },
      { id: 'diamond', title: 'Estilos de Diseño\nPremium' },
      { id: 'text', title: 'Familias Tipográficas\nModernas' },
      { id: 'pen', title: 'Iconos y Recursos\nIncluidos' },
      { id: 'atom', title: 'Librería de\nComponentes' },
      { id: 'brush', title: 'Completamente\nPersonalizable' }
    ],
    en: [
      { id: 'layers', title: 'Organized Layers\n& Groups' },
      { id: 'diamond', title: 'Premium Design\nStyles' },
      { id: 'text', title: 'Modern Font\nFamily' },
      { id: 'pen', title: 'Free Icons\nIncluded' },
      { id: 'atom', title: 'Component\nLibrary' },
      { id: 'brush', title: 'Fully\nCustomizable' }
    ]
  }

  const items = data[lang] || data.en

  return (
    <section className="neu-features-sec">
      <div className="neu-features-grid">
        {items.map((item, i) => (
          <div className="neu-card" key={item.id} data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="neu-icon-wrap">
              {ICONS[item.id]()}
            </div>
            <p className="neu-title">
              {item.title.split('\n').map((line, j) => (
                <span key={j}>{line}<br/></span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
