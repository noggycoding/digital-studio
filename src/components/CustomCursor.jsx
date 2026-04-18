import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(tick)
    }

    const addHover = () => {
      dot.classList.add('cur-hover')
      ring.classList.add('cur-hover')
    }
    const removeHover = () => {
      dot.classList.remove('cur-hover')
      ring.classList.remove('cur-hover')
    }

    const addClick = () => {
      dot.classList.add('cur-click')
      ring.classList.add('cur-click')
    }
    const removeClick = () => {
      dot.classList.remove('cur-click')
      ring.classList.remove('cur-click')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', addClick)
    document.addEventListener('mouseup', removeClick)
    raf = requestAnimationFrame(tick)

    const attach = () => {
      document.querySelectorAll('a, button, .sv-card, .portfolio-card, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }

    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', addClick)
      document.removeEventListener('mouseup', removeClick)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
    </>
  )
}
