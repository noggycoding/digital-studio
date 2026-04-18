import './LangFlash.css'

const LABELS = {
  en: 'English Mode',
  es: 'Modo Español',
  fr: 'Mode Français',
  pt: 'Modo Português',
  zh: '中文模式',
  ar: 'الوضع العربي',
  ru: 'Русский Режим',
  hi: 'हिंदी मोड',
}

export default function LangFlash({ lang, flashKey }) {
  if (!lang || flashKey === 0) return null

  return (
    <div className="lang-flash" key={flashKey}>
      <span className="lf-label">{LABELS[lang] || lang}</span>
    </div>
  )
}
