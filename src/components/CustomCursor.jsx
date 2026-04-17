import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Check for touch device
    if ('ontouchstart' in window) {
      cursor.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const tick = () => {
      curX += (mouseX - curX) * 0.15
      curY += (mouseY - curY) * 0.15
      cursor.style.left = curX + 'px'
      cursor.style.top = curY + 'px'
      requestAnimationFrame(tick)
    }

    const addHover = () => cursor.classList.add('hovering')
    const removeHover = () => cursor.classList.remove('hovering')

    document.addEventListener('mousemove', move)
    requestAnimationFrame(tick)

    const hoverables = document.querySelectorAll('a, button, .sv-card, .portfolio-card')
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, .sv-card, .portfolio-card')
      els.forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
}
