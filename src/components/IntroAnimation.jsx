import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './IntroAnimation.css'

export default function IntroAnimation({ onComplete }) {
  const introRef = useRef(null)

  useEffect(() => {
    const heroVideo = document.querySelector('.hero-media-video')
    const heroMedia = document.querySelector('.hero-media')
    
    if (!heroVideo || !heroMedia || !introRef.current) return
    
    // Hide original video
    gsap.set(heroVideo, { opacity: 0 })
    
    // Get final video container position (not just video)
    const mediaRect = heroMedia.getBoundingClientRect()
    
    // Clone video for intro
    const videoClone = heroVideo.cloneNode(true)
    videoClone.classList.add('intro-video')
    videoClone.classList.remove('hero-media-video')
    videoClone.muted = true
    videoClone.loop = true
    videoClone.play().catch(() => {}) // Ignore play errors
    
    // Append to intro container using ref
    introRef.current.appendChild(videoClone)
    
    // Position video at center, large
    gsap.set(videoClone, {
      position: 'fixed',
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '70vw',
      maxWidth: '900px',
      height: 'auto',
      zIndex: 2,
      borderRadius: '20px',
      opacity: 0
    })
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Move video to hero-media container permanently
          if (heroMedia && videoClone) {
            // Remove positioning styles
            videoClone.style.cssText = ''
            videoClone.className = 'hero-media-video'
            // Move to hero-media
            heroMedia.insertBefore(videoClone, heroMedia.firstChild)
          }
          // Remove intro background
          if (introRef.current && introRef.current.parentNode) {
            introRef.current.parentNode.removeChild(introRef.current)
          }
          if (onComplete) onComplete()
        }
      })

      // Video aparece
      tl.to(videoClone, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      // Pausa breve
      .to({}, { duration: 0.8 })
      
      // Video se mueve a su posición final en el hero-media container
      .to(videoClone, {
        left: mediaRect.left + mediaRect.width / 2,
        top: mediaRect.top + mediaRect.height / 2,
        width: mediaRect.width,
        height: mediaRect.height,
        borderRadius: '12px',
        duration: 1.2,
        ease: 'power3.inOut'
      })
      
      // Fade out background only
      .to('.intro-background', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      })

    }, introRef)

    return () => {
      ctx.revert()
      // Restore original video if needed
      if (heroVideo) {
        gsap.set(heroVideo, { opacity: 1 })
      }
    }
  }, [onComplete])

  return (
    <div className="intro-animation" ref={introRef}>
      <div className="intro-background" />
    </div>
  )
}
