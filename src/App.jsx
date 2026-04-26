import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import SectionSkeleton from './components/SectionSkeleton'
import { initScrollAnimations, refreshScrollAnimations } from './utils/scrollAnimations'

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

    // Register scroll-driven animations for elements already in the DOM.
    // Lazy-loaded sections call the same helper again when they mount.
    initScrollAnimations()

    // Rescan periodically while lazy sections mount, then refresh positions.
    const scanTimers = [500, 1200, 2500, 4000].map(ms =>
      setTimeout(() => { initScrollAnimations(); refreshScrollAnimations() }, ms)
    )

    // Refresh after the window has fully settled (fonts, images, videos).
    const onLoad = () => refreshScrollAnimations()
    window.addEventListener('load', onLoad)

    // Intercept in-page anchor clicks so Lenis animates the scroll
    // instead of the browser jumping instantly.
    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#' || href.length < 2) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: -10,
      })
      // Keep the URL hash in sync for share/back navigation
      history.replaceState(null, '', href)
    }
    document.addEventListener('click', onAnchorClick)

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
      clearTimeout(vidTimer)
      scanTimers.forEach(clearTimeout)
      window.removeEventListener('load', onLoad)
      document.removeEventListener('click', onAnchorClick)
      videoObserver.disconnect()
    }
  }, [])

  return (
    <>
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
