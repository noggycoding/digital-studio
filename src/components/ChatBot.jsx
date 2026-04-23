import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

// ── Responses ──────────────────────────────────────────────
const R = {
  es: {
    welcome: '¡Hola! Soy el asistente de Frame Studio. ¿En qué puedo ayudarte hoy?',
    greet:   '¡Hola de nuevo! ¿Qué quieres saber?',
    services:'Ofrecemos tres servicios principales:\n\n→ Diseño Web — sitios modernos que convierten\n→ Automatización — flujos inteligentes 24/7\n→ Redes Sociales — estrategia y gestión\n\n¿Sobre cuál quieres más info?',
    web:     'Creamos sitios web rápidos, modernos y optimizados para conversión. Desde landing pages hasta e-commerce completos. Cada proyecto es único y 100% alineado a tu marca.',
    auto:    'Automatizamos tus procesos con CRM, email flows e integraciones. Tu negocio funciona 24/7 sin intervención manual.',
    social:  'Gestionamos Instagram, TikTok y LinkedIn con estrategia de contenido, diseño y gestión de comunidad para generar impacto real.',
    price:   'Los precios varían según el alcance del proyecto. Para un presupuesto exacto y personalizado, te recomiendo hablar directamente con nuestro equipo.',
    time:    'Tiempos estimados:\n→ Landing page: 1–2 semanas\n→ Sitio completo: 3–6 semanas\n→ Automatización: 1–3 semanas\n\n¿Tienes un plazo específico?',
    port:    'Puedes explorar nuestros proyectos en la sección Portafolio. Algunos trabajos: Ojo Rojo, Yami House, La Chopería y Perfect Salon.',
    contact: 'Escríbenos directamente:\n→ studioframe.dev@gmail.com\n→ +1 (686) 428-1021\n→ O usa el formulario aquí mismo.',
    process: 'Nuestro proceso tiene 4 fases:\n\n1. Discovery — entendemos tu negocio y metas\n2. Diseño — propuestas visuales alineadas a tu marca\n3. Desarrollo — construcción con revisiones iterativas\n4. Lanzamiento + soporte post-launch',
    stack:   'Usamos tecnologías modernas y rápidas:\n\n→ React, Next.js, Vite para front-end\n→ Node.js, serverless para back-end\n→ Framer Motion, GSAP para animaciones\n→ Vercel, Netlify para hosting',
    why:     'Lo que nos diferencia:\n\n→ Diseño premium, no templates genéricos\n→ Código limpio y rápido (Lighthouse 95+)\n→ Comunicación directa, sin intermediarios\n→ Soporte post-lanzamiento incluido',
    guarantee: 'Sí, ofrecemos garantía de satisfacción. Si en los primeros 14 días no estás contento con el resultado, hacemos cambios hasta que lo estés o devolvemos una parte del pago.',
    hosting: 'Nos encargamos de todo: compra de dominio, hosting, SSL, emails corporativos. También puedes contratar hosting externo — somos flexibles con lo que ya tengas.',
    maintenance: 'Ofrecemos planes mensuales de mantenimiento:\n\n→ Actualizaciones de seguridad\n→ Backups automáticos\n→ Cambios menores de contenido\n→ Reportes de performance',
    seo:     'Todos nuestros sitios incluyen SEO técnico básico (meta tags, schema, sitemap, velocidad). Para posicionamiento avanzado ofrecemos SEO on-page y estrategia de contenido.',
    revisions: 'Incluimos rondas de revisión en cada fase:\n→ 2 rondas en diseño\n→ 2 rondas en desarrollo\n→ Ajustes menores post-lanzamiento',
    location: 'Trabajamos 100% remoto desde México, atendiendo clientes en toda Latinoamérica, EEUU y Europa. Reuniones por Zoom/Meet.',
    languages: 'Hablamos español, inglés y portugués. Podemos entregar sitios multilenguaje (¡este sitio mismo tiene 8 idiomas!).',
    payment: 'Trabajamos con 50% anticipo y 50% al entregar. Aceptamos transferencia, PayPal, Stripe y crypto (USDC, USDT).',
    start:   '¡Perfecto! Para comenzar puedes:\n\n→ Completar el formulario de contacto\n→ Escribir a studioframe.dev@gmail.com\n→ Agendar una llamada de 30 min gratis',
    thanks:  '¡Gracias a ti! 🙌 Si tienes más preguntas, aquí estoy.',
    bye:     '¡Hasta pronto! Si necesitas algo más, vuelve a abrir el chat. ✨',
    default: 'Buena pregunta. Para eso lo mejor es hablar directamente con nuestro equipo — te darán una respuesta mucho más completa.',
    placeholder: 'Escribe tu pregunta...',
    ctaBtn:  'Contactar equipo →',
    title:   'Asistente Frame Studio',
    subtitle:'Respuesta instantánea',
    online:  'En línea',
    quickRepliesLabel: 'O prueba con:',
    quickReplies: [
      { label: '💼 Servicios',  query: 'servicios' },
      { label: '💰 Precios',    query: 'precio' },
      { label: '⏱ Tiempo',     query: 'tiempo' },
      { label: '🚀 Empezar',    query: 'comenzar' },
    ],
  },
  en: {
    welcome: "Hi! I'm the Frame Studio assistant. How can I help you today?",
    greet:   'Hi again! What do you want to know?',
    services:"We offer three main services:\n\n→ Web Design — modern converting sites\n→ Automation — smart 24/7 workflows\n→ Social Media — strategy & management\n\nWhich one interests you?",
    web:     'We build fast, modern websites optimized for conversion. From landing pages to full e-commerce. Every project is unique and 100% aligned to your brand.',
    auto:    'We automate your business with CRM, email flows and custom integrations. Your business runs 24/7 without manual effort.',
    social:  'We manage Instagram, TikTok and LinkedIn with content strategy, design and community management for real impact.',
    price:   'Pricing varies by scope and complexity. For an exact personalized quote, I recommend speaking directly with our team.',
    time:    'Estimated timelines:\n→ Landing page: 1–2 weeks\n→ Full website: 3–6 weeks\n→ Automation: 1–3 weeks\n\nDo you have a specific deadline?',
    port:    "Browse our projects in the Portfolio section. Some work: Ojo Rojo, Yami House, La Chopería and Perfect Salon.",
    contact: 'Reach us directly:\n→ studioframe.dev@gmail.com\n→ +1 (686) 428-1021\n→ Or use the contact form on this page.',
    process: 'Our 4-phase process:\n\n1. Discovery — we learn your business and goals\n2. Design — visual proposals aligned to your brand\n3. Development — iterative build with reviews\n4. Launch + post-launch support',
    stack:   'We use modern, fast technologies:\n\n→ React, Next.js, Vite for front-end\n→ Node.js, serverless for back-end\n→ Framer Motion, GSAP for animations\n→ Vercel, Netlify for hosting',
    why:     'What sets us apart:\n\n→ Premium design, not generic templates\n→ Clean, fast code (Lighthouse 95+)\n→ Direct communication, no middlemen\n→ Post-launch support included',
    guarantee: 'Yes, we offer a satisfaction guarantee. If within the first 14 days you are not happy with the result, we make changes until you are — or refund part of the payment.',
    hosting: 'We handle everything: domain purchase, hosting, SSL, corporate emails. You can also bring your own — we are flexible with what you already have.',
    maintenance: 'We offer monthly maintenance plans:\n\n→ Security updates\n→ Automatic backups\n→ Minor content changes\n→ Performance reports',
    seo:     'All our sites include basic technical SEO (meta tags, schema, sitemap, speed). For advanced ranking we offer on-page SEO and content strategy.',
    revisions: 'Revisions are included at every phase:\n→ 2 rounds in design\n→ 2 rounds in development\n→ Minor post-launch tweaks',
    location: 'We work 100% remote from Mexico, serving clients across LatAm, the US and Europe. Meetings via Zoom/Meet.',
    languages: 'We speak Spanish, English and Portuguese. We deliver multilingual sites (this very site has 8 languages!).',
    payment: 'We work with 50% upfront and 50% on delivery. We accept wire, PayPal, Stripe and crypto (USDC, USDT).',
    start:   'Great! To get started you can:\n\n→ Fill out the contact form\n→ Email studioframe.dev@gmail.com\n→ Book a free 30-min call',
    thanks:  'Thanks to you! 🙌 If you have more questions, I am here.',
    bye:     'See you soon! If you need anything else, reopen the chat. ✨',
    default: 'Great question. For that one it is best to speak directly with our team — they will give you a much fuller answer.',
    placeholder: 'Ask something...',
    ctaBtn:  'Contact team →',
    title:   'Frame Studio Assistant',
    subtitle:'Instant reply',
    online:  'Online',
    quickRepliesLabel: 'Or try:',
    quickReplies: [
      { label: '💼 Services', query: 'services' },
      { label: '💰 Pricing',  query: 'pricing'  },
      { label: '⏱ Timeline', query: 'timeline' },
      { label: '🚀 Start',    query: 'start'    },
    ],
  },
}

const KEYWORDS = {
  greet:     ['hola', 'hello', 'hi', 'hey', 'buenos', 'buenas', 'saludos', 'good morning', 'good afternoon'],
  services:  ['servicio', 'service', 'hacen', 'ofrecen', 'offer', 'qué hacen', 'what do you'],
  web:       ['web', 'página', 'sitio', 'landing', 'diseño web', 'website', 'e-commerce', 'tienda'],
  auto:      ['automatiz', 'automat', 'flujo', 'flow', 'crm', 'bot', 'integr', 'workflow'],
  social:    ['social', 'instagram', 'tiktok', 'linkedin', 'facebook', 'redes', 'contenido'],
  price:     ['precio', 'pricing', 'price', 'costo', 'cost', 'cuánto', 'how much', 'cobr', 'tarifa', 'presupuesto', 'budget'],
  time:      ['tiempo', 'timeline', 'time', 'cuánto tarda', 'demora', 'plazo', 'semana', 'week', 'how long', 'duración', 'rápido'],
  port:      ['portafolio', 'portfolio', 'trabajo', 'proyect', 'project', 'ejemplo', 'hecho'],
  contact:   ['contact', 'contacto', 'hablar', 'reunión', 'meeting', 'email', 'llamar', 'whatsapp', 'phone', 'teléfono'],
  process:   ['proceso', 'process', 'cómo trabajan', 'how do you work', 'pasos', 'fases', 'metodolog'],
  stack:     ['tecnolog', 'technology', 'stack', 'framework', 'react', 'next', 'vue', 'tools', 'herramienta'],
  why:       ['por qué', 'why', 'diferencia', 'different', 'mejor', 'ventaja', 'competencia'],
  guarantee: ['garant', 'guarant', 'money back', 'devolución', 'satisfacción', 'reembolso'],
  hosting:   ['hosting', 'dominio', 'domain', 'servidor', 'server', 'ssl'],
  maintenance:['mantenimiento', 'maintenance', 'mantener', 'upkeep', 'soporte mensual'],
  seo:       ['seo', 'posicionamiento', 'google', 'ranking', 'búsqueda', 'search'],
  revisions: ['revision', 'cambio', 'change', 'ajuste', 'iteración', 'edit'],
  location:  ['dónde', 'where', 'location', 'ubicación', 'país', 'city', 'city', 'remoto', 'remote'],
  languages: ['idioma', 'language', 'inglés', 'english', 'español', 'spanish', 'traducción'],
  payment:   ['pago', 'payment', 'pay', 'paypal', 'stripe', 'transferencia', 'crypto', 'bitcoin'],
  start:     ['empezar', 'start', 'comenzar', 'begin', 'arrancar', 'comienzo', 'get started'],
  thanks:    ['gracias', 'thanks', 'thank you', 'thx', 'grax'],
  bye:       ['adios', 'adiós', 'bye', 'chao', 'nos vemos', 'goodbye', 'hasta luego'],
}

function respond(text, lang) {
  const t = text.toLowerCase()
  const r = lang === 'en' ? R.en : R.es
  for (const [key, kws] of Object.entries(KEYWORDS)) {
    if (kws.some(k => t.includes(k))) {
      return { text: r[key], cta: ['price', 'contact', 'start'].includes(key) }
    }
  }
  return { text: r.default, cta: true }
}

// ── Cube SVG — grainy particle aesthetic ───────────────────
function Cube() {
  return (
    <svg className="chat-cube-svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cg" x="-55%" y="-55%" width="210%" height="210%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="spread"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.90 0.84" numOctaves="4" seed="17" result="noise"/>
          <feColorMatrix in="noise" type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 18 -7"
            result="grain"/>
          <feComposite in="grain" in2="spread" operator="in" result="grainClipped"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="glow"/>
          <feBlend in="grainClipped" in2="glow" mode="screen" result="blended"/>
          <feMerge>
            <feMergeNode in="blended"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#cg)">
        <polygon points="20,4 36,13 20,21 4,13" fill="rgba(255,255,255,0.92)"/>
        <polygon points="36,13 36,28 20,36 20,21" fill="rgba(255,255,255,0.50)"/>
        <polygon points="4,13 20,21 20,36 4,28"   fill="rgba(255,255,255,0.28)"/>
        <line x1="20" y1="21" x2="36" y2="28" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6"/>
        <line x1="20" y1="21" x2="4"  y2="28" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6"/>
        <line x1="20" y1="21" x2="20" y2="36" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6"/>
      </g>
    </svg>
  )
}

// ── Component ──────────────────────────────────────────────
export default function ChatBot({ lang = 'es' }) {
  const [open, setOpen]         = useState(false)
  const [msgs, setMsgs]         = useState([])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  const r = lang === 'en' ? R.en : R.es

  useEffect(() => {
    if (!open) return
    setMsgs([])
    setShowQuick(false)
    const id1 = setTimeout(() => {
      setMsgs([{ id: 1, role: 'bot', text: r.welcome, cta: false }])
    }, 240)
    const id2 = setTimeout(() => setShowQuick(true), 900)
    return () => { clearTimeout(id1); clearTimeout(id2) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendText = (text) => {
    if (!text.trim() || typing) return
    setShowQuick(false)
    setMsgs(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const { text: reply, cta } = respond(text, lang)
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply, cta }])
      setTyping(false)
    }, 650 + Math.random() * 450)
  }

  const send = () => sendText(input.trim())
  const handleQuickReply = (query) => sendText(query)

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
        <span className="chat-ring chat-ring--3" />
        <span className={`chat-icon-wrap${open ? ' chat-icon-wrap--close' : ''}`}>
          <img src="/logo sin bg.png" alt="Frame Studio" className="chat-trigger-logo" />
          <svg className="chat-close-icon" viewBox="0 0 24 24" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
        {!open && <span className="chat-notify-dot" />}
      </button>

      {/* ── Chat panel ── */}
      <div className={`chat-panel${open ? ' chat-panel--open' : ''}`} aria-hidden={!open}>
        <div className="chat-panel-bloom" />
        <div className="chat-panel-aurora" />

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">
              <span className="chat-avatar-pulse" />
              <img src="/logo sin bg.png" alt="Frame Studio" className="chat-avatar-logo" />
            </div>
            <div className="chat-header-info">
              <span className="chat-header-name">{r.title}</span>
              <span className="chat-header-status">
                <span className="chat-online-dot" />{r.online} · {r.subtitle}
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

          {/* Quick replies */}
          {showQuick && msgs.length === 1 && !typing && (
            <div className="chat-quick">
              <span className="chat-quick-label">{r.quickRepliesLabel}</span>
              <div className="chat-quick-chips">
                {r.quickReplies.map((q, i) => (
                  <button
                    key={i}
                    className="chat-quick-chip"
                    style={{ animationDelay: `${i * 80}ms` }}
                    onClick={() => handleQuickReply(q.query)}
                  >
                    {q.label}
                  </button>
                ))}
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
