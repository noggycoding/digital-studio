import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

// ── Responses ──────────────────────────────────────────────
const R = {
  es: {
    welcome: '¡Hola! Soy el asistente de Frame Studio. ¿En qué puedo ayudarte hoy?',
    greet:   '¡Hola de nuevo! ¿En qué puedo ayudarte?',
    services:'Ofrecemos tres servicios:\n\n→ Diseño Web — sitios modernos que convierten\n→ Automatización — flujos inteligentes 24/7\n→ Redes Sociales — estrategia y gestión\n\n¿Sobre cuál quieres más info?',
    web:     'Creamos sitios web rápidos, modernos y optimizados para conversión. Desde landing pages hasta e-commerce completos. Cada proyecto es único y 100% alineado a tu marca.',
    auto:    'Automatizamos tus procesos con CRM, email flows e integraciones. Tu negocio funciona 24/7 sin intervención manual.',
    social:  'Gestionamos Instagram, TikTok y LinkedIn con estrategia de contenido, diseño y gestión de comunidad para generar impacto real.',
    price:   'Los precios varían según el alcance del proyecto. Para un presupuesto exacto y personalizado, te recomiendo hablar directamente con nuestro equipo.',
    time:    'Tiempos estimados:\n→ Landing page: 1–2 semanas\n→ Sitio completo: 3–6 semanas\n→ Automatización: 1–3 semanas\n\n¿Tienes un plazo específico?',
    port:    'Puedes explorar nuestros proyectos en la sección Portafolio. Algunos trabajos: Ojo Rojo, Yami House, La Chopería y Perfect Salon.',
    contact: 'Para consultas específicas:\n→ blackframeoficial@gmail.com\n→ O usa el formulario de contacto aquí mismo.',
    default: 'Para esa consulta específica, lo mejor es hablar directamente con nuestro equipo. ¡Estarán encantados de ayudarte!',
    placeholder: 'Escribe tu pregunta...',
    ctaBtn:  'Contactar equipo →',
    title:   'Asistente Frame Studio',
    online:  'En línea',
  },
  en: {
    welcome: "Hi! I'm the Frame Studio assistant. How can I help you today?",
    greet:   'Hi again! How can I help you?',
    services:"We offer three services:\n\n→ Web Design — modern converting sites\n→ Automation — smart 24/7 workflows\n→ Social Media — strategy & management\n\nWhich would you like to know more about?",
    web:     'We build fast, modern websites optimized for conversion. From landing pages to full e-commerce. Every project is unique and 100% aligned to your brand.',
    auto:    'We automate your business with CRM, email flows and custom integrations. Your business runs 24/7 without manual effort.',
    social:  'We manage Instagram, TikTok and LinkedIn with content strategy, design and community management for real impact.',
    price:   'Pricing varies by scope and complexity. For an exact personalized quote, I recommend speaking directly with our team.',
    time:    'Estimated timelines:\n→ Landing page: 1–2 weeks\n→ Full website: 3–6 weeks\n→ Automation: 1–3 weeks\n\nDo you have a specific deadline?',
    port:    "Browse our projects in the Portfolio section. Some work: Ojo Rojo, Yami House, La Chopería and Perfect Salon.",
    contact: 'For specific inquiries:\n→ blackframeoficial@gmail.com\n→ Or use the contact form on this page.',
    default: "For that specific question, it's best to talk directly with our team. They'll be happy to help!",
    placeholder: 'Ask something...',
    ctaBtn:  'Contact team →',
    title:   'Frame Studio Assistant',
    online:  'Online',
  },
}

const KEYWORDS = {
  greet:   ['hola', 'hello', 'hi', 'hey', 'buenos', 'buenas', 'saludos', 'good morning', 'good afternoon'],
  services:['servicio', 'service', 'hacen', 'ofrecen', 'offer', 'qué hacen', 'what do you', 'cuántos servicios'],
  web:     ['web', 'página', 'sitio', 'landing', 'diseño web', 'website', 'e-commerce', 'tienda'],
  auto:    ['automatiz', 'automat', 'flujo', 'flow', 'crm', 'bot', 'integr', 'workflow'],
  social:  ['social', 'instagram', 'tiktok', 'linkedin', 'facebook', 'redes', 'contenido'],
  price:   ['precio', 'price', 'costo', 'cost', 'cuánto', 'how much', 'cobr', 'tarifa', 'presupuesto', 'budget', 'pago'],
  time:    ['tiempo', 'time', 'cuánto tarda', 'demora', 'plazo', 'semana', 'week', 'how long', 'duración', 'rápido'],
  port:    ['portafolio', 'portfolio', 'trabajo', 'proyect', 'project', 'ejemplo', 'trabajo anterior', 'hecho'],
  contact: ['contact', 'contacto', 'hablar', 'reunión', 'meeting', 'email', 'llamar', 'whatsapp', 'habla'],
}

function respond(text, lang) {
  const t = text.toLowerCase()
  const r = lang === 'en' ? R.en : R.es
  for (const [key, kws] of Object.entries(KEYWORDS)) {
    if (kws.some(k => t.includes(k))) return { text: r[key], cta: key === 'price' || key === 'default' }
  }
  return { text: r.default, cta: true }
}

// ── Cube SVG ───────────────────────────────────────────────
function Cube() {
  return (
    <svg className="chat-cube-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon className="cube-top"   points="20,4 36,12 20,20 4,12" />
      <polygon className="cube-right" points="36,12 36,28 20,36 20,20" />
      <polygon className="cube-left"  points="4,12 20,20 20,36 4,28" />
    </svg>
  )
}

// ── Component ──────────────────────────────────────────────
export default function ChatBot({ lang = 'es' }) {
  const [open, setOpen]       = useState(false)
  const [msgs, setMsgs]       = useState([])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  const r = lang === 'en' ? R.en : R.es

  // Welcome message when opened / lang changed
  useEffect(() => {
    if (!open) return
    setMsgs([])
    const id = setTimeout(() => {
      setMsgs([{ id: 1, role: 'bot', text: r.welcome, cta: false }])
    }, 240)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = () => {
    const text = input.trim()
    if (!text || typing) return
    setMsgs(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const { text: reply, cta } = respond(text, lang)
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply, cta }])
      setTyping(false)
    }, 650 + Math.random() * 450)
  }

  return (
    <>
      {/* ── Floating trigger ── */}
      <button
        className={`chat-trigger${open ? ' chat-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Chat"
      >
        <span className="chat-ring" />
        <span className="chat-ring chat-ring--2" />
        <span className={`chat-icon-wrap${open ? ' chat-icon-wrap--close' : ''}`}>
          <Cube />
          <svg className="chat-close-icon" viewBox="0 0 24 24" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* ── Chat panel ── */}
      <div className={`chat-panel${open ? ' chat-panel--open' : ''}`} aria-hidden={!open}>
        <div className="chat-panel-bloom" />

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">
              <svg viewBox="0 0 28 28" fill="none">
                <polygon points="14,3 26,9 14,15 2,9"  fill="rgba(255,255,255,0.92)" />
                <polygon points="26,9 26,19 14,25 14,15" fill="rgba(255,255,255,0.52)" />
                <polygon points="2,9 14,15 14,25 2,19"  fill="rgba(255,255,255,0.68)" />
              </svg>
            </div>
            <div className="chat-header-info">
              <span className="chat-header-name">{r.title}</span>
              <span className="chat-header-status">
                <span className="chat-online-dot" />{r.online}
              </span>
            </div>
          </div>
          <button className="chat-header-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-msgs">
          {msgs.map(msg => (
            <div key={msg.id} className={`chat-msg chat-msg--${msg.role}`}>
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
                {msg.cta && (
                  <a href="#contact" className="chat-cta-btn" onClick={() => setOpen(false)}>
                    {r.ctaBtn}
                  </a>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg chat-msg--bot">
              <div className="chat-bubble chat-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder={r.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send() } }}
          />
          <button className="chat-send" onClick={send} disabled={!input.trim() || typing}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
