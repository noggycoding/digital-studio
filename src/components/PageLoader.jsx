export default function PageLoader({ loaded }) {
  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`}>
      <div className="loader-bg-glow" />

      <div className="loader-stage">
        <div className="loader-mark">
          <div className="loader-cube-wrap">
            <img src="/logo sin bg.png" alt="" className="loader-cube" />
          </div>
          <span className="loader-word" aria-hidden="true">
            {'studioframe'.split('').map((c, i) => (
              <span
                key={i}
                className="loader-char"
                style={{ animationDelay: `${0.8 + i * 0.05}s` }}
              >
                <span className="loader-char-inner">{c}</span>
              </span>
            ))}
          </span>
        </div>

        <div className="loader-tagline">
          <span className="loader-line-deco" />
          <span className="loader-tagline-text">DIGITAL STUDIO</span>
          <span className="loader-line-deco" />
        </div>

        <div className="loader-dots" aria-label="Loading">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>
      </div>
    </div>
  )
}
