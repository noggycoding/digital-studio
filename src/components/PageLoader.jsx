export default function PageLoader({ loaded }) {
  const text = 'FRAME STUDIO.'

  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`}>
      <div className="loader-text">
        {text.split('').map((char, i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.08 + 0.3}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
