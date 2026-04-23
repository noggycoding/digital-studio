export default function PageLoader({ loaded }) {
  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`}>
      <div className="loader-stage">
        <div className="loader-mark">
          <img src="/logo sin bg.png" alt="" className="loader-cube" />
          <span className="loader-word" aria-hidden="true">
            {'studioframe'.split('').map((c, i) => (
              <span
                key={i}
                className="loader-char"
                style={{ animationDelay: `${1.3 + i * 0.045}s` }}
              >
                {c}
              </span>
            ))}
          </span>
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
