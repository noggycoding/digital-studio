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
    const ctx = gsap.context(() => {
      // Rules scrub their draw with scroll position
      gsap.utils.toArray('.qb-rule').forEach((rule, i) => {
        gsap.fromTo(rule,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1,
            ease: 'power2.out',
            transformOrigin: 'center',
            scrollTrigger: {
              trigger: rule,
              start: 'top 92%',
              end:   'top 60%',
              scrub: 0.6,
            },
          })
      })

      // Quote marks scrub their scale with scroll
      gsap.utils.toArray('.qb-mark').forEach(mark => {
        gsap.fromTo(mark,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mark,
              start: 'top 88%',
              end:   'top 55%',
              scrub: 0.6,
            },
          })
      })

      // Each line scrubs its reveal with scroll — reverses on scroll up
      gsap.utils.toArray('.qb-line').forEach(line => {
        gsap.fromTo(line,
          { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.98 },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              end:   'top 50%',
              scrub: 0.6,
            },
          })
      })

      // Sun icon floats gently
      gsap.to('.qb-sun', {
        y: -8,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      // Sun glow pulse
      gsap.to('.qb-sun-glow', {
        opacity: 0.6,
        scale: 1.15,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, ref)

    return () => ctx.revert()
  }, { scope: ref, dependencies: [lang] })

  return (
    <div className="quote-banner" ref={ref}>
      <div className="qb-rule" />

      <div className="qb-sun-wrap" aria-hidden="true">
        <span className="qb-sun-glow" />
        <svg className="qb-sun" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="7" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" opacity="0.75"/>
          <circle cx="24" cy="24" r="3.5" fill="currentColor" fillOpacity="0.55"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
            <line
              key={deg}
              x1="24" y1="9" x2="24" y2="5"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              opacity="0.5"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
        </svg>
      </div>

      <blockquote className="qb-text">
        <span className="qb-mark qb-mark--open" aria-hidden="true">&ldquo;</span>
        <span className="qb-line">{lines[0]}</span>
        <span className="qb-line">{lines[1]}</span>
        <span className="qb-line qb-dim">{lines[2]}</span>
        <span className="qb-mark qb-mark--close" aria-hidden="true">&rdquo;</span>
      </blockquote>

      <div className="qb-rule" />
    </div>
  )
}
