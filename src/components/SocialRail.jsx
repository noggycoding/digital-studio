import './SocialRail.css'

// ── Phone ─────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg className="s-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <style>{`
        .ph-g{animation:ph-ring 4s ease-in-out infinite;transform-origin:12px 12px}
        @keyframes ph-ring{
          0%,55%,100%{transform:rotate(0deg)}
          58%{transform:rotate(-18deg)}
          62%{transform:rotate(16deg)}
          66%{transform:rotate(-12deg)}
          70%{transform:rotate(9deg)}
          74%{transform:rotate(-5deg)}
          78%{transform:rotate(0deg)}
        }
      `}</style>
      <g className="ph-g">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.7 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
          stroke="#e0e0e0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

// ── Instagram ─────────────────────────────────────────────────
// Lens circle draws on: circumference of r=4 ≈ 25.1
function InstagramIcon() {
  return (
    <svg className="s-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <style>{`
        .ig-lens{
          stroke-dasharray:25.1;stroke-dashoffset:25.1;
          animation:ig-draw 2.5s ease-in-out infinite;
          transform-origin:12px 12px
        }
        @keyframes ig-draw{
          0%,15%{stroke-dashoffset:25.1;opacity:0.35}
          50%,70%{stroke-dashoffset:0;opacity:1}
          90%,100%{stroke-dashoffset:25.1;opacity:0.35}
        }
      `}</style>
      <rect x="2" y="2" width="20" height="20" rx="5"
        stroke="#e0e0e0" strokeWidth="1.8"/>
      <circle className="ig-lens" cx="12" cy="12" r="4"
        stroke="#e0e0e0" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="#e0e0e0"/>
    </svg>
  )
}

// ── WhatsApp ─────────────────────────────────────────────────
// Checkmark reveals inside the bubble (delivered animation)
function WhatsAppIcon() {
  return (
    <svg className="s-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <style>{`
        .wa-check{
          stroke-dasharray:13;stroke-dashoffset:13;
          animation:wa-reveal 2.2s ease-in-out infinite
        }
        @keyframes wa-reveal{
          0%,25%{stroke-dashoffset:13;opacity:0}
          55%,75%{stroke-dashoffset:0;opacity:1}
          90%,100%{stroke-dashoffset:13;opacity:0}
        }
      `}</style>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="#e0e0e0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <path className="wa-check" d="M9 12l2 2 4-4"
        stroke="#e0e0e0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Facebook ─────────────────────────────────────────────────
// F path draws on from top to bottom
function FacebookIcon() {
  return (
    <svg className="s-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <style>{`
        .fb-f{
          stroke-dasharray:400;stroke-dashoffset:400;
          animation:fb-draw 2.8s ease-in-out infinite
        }
        @keyframes fb-draw{
          0%,10%{stroke-dashoffset:400;opacity:0.35}
          55%,72%{stroke-dashoffset:0;opacity:1}
          92%,100%{stroke-dashoffset:0;opacity:0.35}
        }
      `}</style>
      <path className="fb-f"
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        stroke="#e0e0e0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ── X (Twitter) ──────────────────────────────────────────────
// Both diagonal lines draw from center outward simultaneously
// Each diagonal length = sqrt(16²+16²) ≈ 22.6 → dasharray 23
function XIcon() {
  return (
    <svg className="s-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <style>{`
        .xl1,.xl2{
          stroke-dasharray:23;
          animation:x-slash 1.8s cubic-bezier(.4,0,.2,1) infinite
        }
        .xl2{animation-delay:.12s}
        @keyframes x-slash{
          0%,8%  {stroke-dashoffset:23;opacity:0.3}
          42%,62%{stroke-dashoffset:0;opacity:1}
          88%,100%{stroke-dashoffset:-23;opacity:0.3}
        }
      `}</style>
      <line className="xl1" x1="4" y1="4" x2="20" y2="20"
        stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
      <line className="xl2" x1="20" y1="4" x2="4" y2="20"
        stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// ── Rail component ────────────────────────────────────────────
const LINKS = [
  { Icon: PhoneIcon,     href: 'tel:+16864281021',                                                                                     label: '+1 (686) 428-1021' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/framestudio.devv?igsh=NGdjZWU5MTM1MG1z&utm_source=qr',                        label: '@framestudio.devv' },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/16864281021',                                                                             label: 'WhatsApp'          },
  { Icon: FacebookIcon,  href: 'https://facebook.com/framestudio.devv',                                                                 label: 'Facebook'          },
  { Icon: XIcon,         href: 'https://x.com/framestudio_dev',                                                                         label: '@framestudio_dev'  },
]

export default function SocialRail() {
  return (
    <div className="social-rail">
      {LINKS.map(({ Icon, href, label }) => (
        <a key={href} href={href} className="s-item" aria-label={label}
           target={href.startsWith('http') ? '_blank' : undefined}
           rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          <Icon />
          <span className="s-tooltip">{label}</span>
        </a>
      ))}
      <span className="s-bottom-line" />
    </div>
  )
}
