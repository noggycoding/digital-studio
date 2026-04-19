import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'
import SectionSkeleton from './components/SectionSkeleton'

// Lazy load below-the-fold components
const Services = lazy(() => import('./components/Services'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const About = lazy(() => import('./components/About'))
const QuoteBanner = lazy(() => import('./components/QuoteBanner'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const LangFlash = lazy(() => import('./components/LangFlash'))
const ChatBot = lazy(() => import('./components/ChatBot'))

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

    // Pause background videos when they leave viewport — 5 simultaneous
    // autoplay videos crush CPU/GPU. Each section's video now only plays
    // while that section is actually visible.
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) target.play().catch(() => {})
          else target.pause()
        })
      },
      { threshold: 0.05 }
    )
    const watchVideos = () => {
      document.querySelectorAll('video[autoplay]').forEach(v => videoObserver.observe(v))
    }
    // Wait for lazy sections to mount before observing
    const vidTimer = setTimeout(watchVideos, 3000)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
      clearTimeout(vidTimer)
      videoObserver.disconnect()
    }
  }, [])

  return (
    <>
      <PageLoader loaded={loaded} />
      <CustomCursor />
      <Suspense fallback={null}>
        <LangFlash lang={flashLang.current} flashKey={flashKey} />
      </Suspense>
      <Navbar lang={lang} onLangChange={handleLangChange} />
      
      <Suspense fallback={null}>
        <ChatBot lang={lang} />
      </Suspense>

      <main>
        <Hero lang={lang} />
        <Suspense fallback={<SectionSkeleton />}>
          <Services lang={lang} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Portfolio lang={lang} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <QuoteBanner lang={lang} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About lang={lang} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact lang={lang} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Footer lang={lang} />
        </Suspense>
      </main>
    </>
  )
}
