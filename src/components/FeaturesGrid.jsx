import { useRef } from 'react'
import { motion } from 'motion/react'
import './FeaturesGrid.css'

const ICONS = {
  browser: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="16" rx="2" />
      <path d="M2 8h20" />
      <motion.circle 
        cx="6" cy="5.5" r="0.8" fill="currentColor" stroke="none" 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle 
        cx="9" cy="5.5" r="0.8" fill="currentColor" stroke="none" 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle 
        cx="12" cy="5.5" r="0.8" fill="currentColor" stroke="none" 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      <motion.path 
        className="fg-bar-load" 
        d="M6 13h12" 
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path 
        className="fg-bar-load2" 
        d="M6 16h8" 
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path 
        d="M16 11l2 2-2 2" 
        initial={{ opacity: 0, x: -5 }}
        whileHover={{ opacity: 1, x: 0 }}
      />
    </svg>
  ),
  nodes: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <motion.circle 
        className="fg-node" cx="12" cy="4" r="2.2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle 
        className="fg-node" cx="4.5" cy="18" r="2.2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.circle 
        className="fg-node" cx="19.5" cy="18" r="2.2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />
      <motion.path 
        d="M12 6.2 L5.9 16.1" 
        initial={{ pathLength: 0 }} 
        whileInView={{ pathLength: 1 }} 
        transition={{ duration: 1.5 }} 
      />
      <motion.path 
        d="M12 6.2 L18.1 16.1" 
        initial={{ pathLength: 0 }} 
        whileInView={{ pathLength: 1 }} 
        transition={{ duration: 1.5, delay: 0.2 }} 
      />
      <motion.path 
        d="M6.7 18 L17.3 18" 
        initial={{ pathLength: 0 }} 
        whileInView={{ pathLength: 1 }} 
        transition={{ duration: 1.5, delay: 0.4 }} 
      />
      <motion.circle
        className="fg-node-center" cx="12" cy="12" r="1.5"
        fill="currentColor" fillOpacity="0.5" stroke="none"
        animate={{ scale: [1, 2, 1], opacity: [0.3, 0.8, 0.3] }}
        style={{ transformOrigin: '12px 12px' }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  ),
  cycle: () => (
    <svg className="fg-cycle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <motion.path 
        d="M17 2l4 4-4 4" 
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <motion.path 
        d="M7 22l-4-4 4-4" 
        animate={{ x: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      <motion.circle 
        cx="12" cy="12" r="2" 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  ),
  bubble: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <motion.circle 
        cx="9" cy="11" r="1.1" fill="currentColor" stroke="none" 
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.circle 
        cx="12" cy="11" r="1.1" fill="currentColor" stroke="none" 
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1, delay: 0.1 }}
      />
      <motion.circle 
        cx="15" cy="11" r="1.1" fill="currentColor" stroke="none" 
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
      />
    </svg>
  ),
  funnel: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
      <motion.circle 
        cx="12" cy="6" r="1.5" fill="currentColor" stroke="none"
        animate={{ y: [0, 8], opacity: [1, 0], scale: [1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
      />
      <motion.circle 
        cx="10" cy="4" r="1" fill="currentColor" stroke="none"
        animate={{ y: [0, 6], opacity: [1, 0], scale: [1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn", delay: 0.4 }}
      />
      <motion.circle 
        cx="14" cy="4" r="1" fill="currentColor" stroke="none"
        animate={{ y: [0, 6], opacity: [1, 0], scale: [1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", delay: 0.8 }}
      />
    </svg>
  ),
  mic: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="21" x2="12" y2="17" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <motion.path 
        d="M3 10a9 9 0 0 0 4.5 7.8" 
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path 
        d="M21 10a9 9 0 0 1-4.5 7.8" 
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  )
}

const DATA = {
  es: [
    {
      id: 'browser',
      title: 'Sitios Web a Medida',
      sub: 'Tu presencia digital, diseñada para atraer y convertir clientes desde el primer clic.'
    },
    {
      id: 'nodes',
      title: 'Agentes de IA',
      sub: 'Un asistente virtual que responde preguntas, agenda citas y atiende clientes todo el día.'
    },
    {
      id: 'cycle',
      title: 'Automatización de Procesos',
      sub: 'Tus tareas repetitivas se ejecutan solas. Sin errores, sin demoras, sin intervención humana.'
    },
    {
      id: 'bubble',
      title: 'WhatsApp Inteligente',
      sub: 'Tu WhatsApp atiende, responde y cierra ventas automáticamente mientras tu te ocupas de otra cosa.'
    },
    {
      id: 'funnel',
      title: 'CRM + Captura de Leads',
      sub: 'Todos tus contactos organizados. Seguimiento automático para que ningún cliente potencial se pierda.'
    },
    {
      id: 'mic',
      title: 'Agentes de Voz',
      sub: 'Un empleado virtual que contesta llamadas, da información y agenda citas por teléfono.'
    }
  ],
  en: [
    {
      id: 'browser',
      title: 'Custom Websites',
      sub: 'Your digital presence, built to attract and convert customers from the first click.'
    },
    {
      id: 'nodes',
      title: 'AI Agents',
      sub: 'A virtual assistant that answers questions, books appointments, and handles clients around the clock.'
    },
    {
      id: 'cycle',
      title: 'Process Automation',
      sub: 'Your repetitive tasks run on their own. No errors, no delays, no human intervention.'
    },
    {
      id: 'bubble',
      title: 'Smart WhatsApp',
      sub: 'Your WhatsApp handles, responds, and closes sales automatically while you focus on other things.'
    },
    {
      id: 'funnel',
      title: 'CRM + Lead Capture',
      sub: 'All your contacts organized. Automatic follow-up so no potential client slips through.'
    },
    {
      id: 'mic',
      title: 'Voice Agents',
      sub: 'A virtual employee that answers calls, provides information, and books appointments by phone.'
    }
  ]
}

export default function FeaturesGrid({ lang = 'es' }) {
  const items = DATA[lang] || DATA.es

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section className="neu-features-sec">
      <div className="neu-features-header">
        <p className="neu-features-eyebrow">
          {lang === 'en' ? 'Our tools' : lang === 'fr' ? 'Nos outils' : lang === 'pt' ? 'Nossas ferramentas' : 'Nuestras herramientas'}
        </p>
        <h2 className="neu-features-title">
          {lang === 'en' ? <>Everything your<br/><em>digital business needs</em></> :
           lang === 'fr' ? <>Tout ce que votre<br/><em>entreprise digitale</em> requiert</> :
           lang === 'pt' ? <>Tudo que seu<br/><em>negócio digital</em> precisa</> :
           <>Todo lo que necesita<br/><em>tu negocio digital</em></>}
        </h2>
      </div>
      <div className="neu-features-grid">
        {items.map((item, i) => (
          <motion.div 
            className="neu-card" 
            key={item.id}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <div className="neu-card-glow" />
            <div className="neu-icon-wrap">
              {ICONS[item.id]()}
            </div>
            <div className="neu-card-body">
              <p className="neu-title">{item.title}</p>
              <p className="neu-subtitle">{item.sub}</p>
            </div>
            <div className="neu-card-bg-deco" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
