import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'

export default function App() {
  const [loaded, setLoaded] = useState(false)

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

    // Simulate load
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
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
