import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from '../i18n/translations'
import './QuoteBanner.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function QuoteBanner({ lang = 'es' }) {
  const ref = useRef(null)
  const lines = (translations[lang] || translations.es).sections.quote

  useGSAP(() => {
    gsap.from('.qb-line', {
      y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
    gsap.from('.qb-rule', {
      scaleX: 0, duration: 1.4, ease: 'power2.inOut',
      transformOrigin: 'center',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, { scope: ref })

  return (
    <div className="quote-banner" ref={ref}>
      <div className="qb-rule" />
      <blockquote className="qb-text">
        <span className="qb-line">{lines[0]}</span>
        <span className="qb-line">{lines[1]}</span>
        <span className="qb-line qb-dim">{lines[2]}</span>
      </blockquote>
      <div className="qb-rule" />
    </div>
  )
}
