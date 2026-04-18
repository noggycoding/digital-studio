import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import QuoteBanner from './components/QuoteBanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'
import LangFlash from './components/LangFlash'
import ChatBot from './components/ChatBot'

export default function App() {
  const [loaded, setLoaded]       = useState(false)
  const [lang, setLang]           = useState('es')
  const [flashKey, setFlashKey]   = useState(0)
  const flashLang                 = useRef('es')

  const handleLangChange = (code) => {
    setLang(code)
    flashLang.current = code
    setFlashKey(k => k + 1)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const timer = setTimeout(() => setLoaded(true), 2200)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <PageLoader loaded={loaded} />
      <CustomCursor />
      <LangFlash lang={flashLang.current} flashKey={flashKey} />
      <Navbar lang={lang} onLangChange={handleLangChange} />
      <ChatBot lang={lang} />
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Portfolio lang={lang} />
        <QuoteBanner lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
        <Footer lang={lang} />
      </main>
    </>
  )
}
