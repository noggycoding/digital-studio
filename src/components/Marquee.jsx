const WORDS = [
  'Diseño Web', '✦', 'Automatización', '✦', 'Redes Sociales', '✦',
  'Estrategia Digital', '✦', 'E-commerce', '✦', 'Branding', '✦',
  'UI/UX', '✦', 'Marketing', '✦',
]

export default function Marquee() {
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((word, i) => (
          <div className="marquee-item" key={i}>
            {word === '✦' ? (
              <span className="marquee-dot" />
            ) : (
              <span className="marquee-text">{word}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
