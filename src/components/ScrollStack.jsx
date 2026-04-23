import { useLayoutEffect, useRef, useCallback } from 'react'
import './ScrollStack.css'

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef       = useRef(null)
  const stackCompletedRef = useRef(false)
  const rafRef            = useRef(null)
  const cardsRef          = useRef([])
  const cardTopsRef       = useRef([])    // cached natural positions
  const endTopRef         = useRef(0)     // cached end element position
  const lastTransformsRef = useRef(new Map())
  const tickingRef        = useRef(false)

  const parsePercentage = useCallback((value, h) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * h
    }
    return parseFloat(value)
  }, [])

  // Measure natural positions (transform-free) and cache them.
  // Called on mount and on resize.
  const measurePositions = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    // Temporarily strip dynamic transform so getBoundingClientRect reads
    // the layout position, not a translated one.
    const saved = cards.map(c => c.style.transform)
    cards.forEach(c => { c.style.transform = 'translateZ(0)' })

    cardTopsRef.current = cards.map(c =>
      c.getBoundingClientRect().top + window.scrollY
    )

    const endEl = document.querySelector('.scroll-stack-end')
    endTopRef.current = endEl
      ? endEl.getBoundingClientRect().top + window.scrollY
      : 0

    // Restore whatever transforms were applied
    cards.forEach((c, i) => { c.style.transform = saved[i] || 'translateZ(0)' })
  }, [])

  const update = useCallback(() => {
    tickingRef.current = false
    const cards = cardsRef.current
    if (!cards.length) return

    const scrollTop       = window.scrollY
    const containerHeight = window.innerHeight
    const stackPositionPx    = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)
    const endElTop           = endTopRef.current

    cards.forEach((card, i) => {
      if (!card) return

      const cardTop      = cardTopsRef.current[i] || 0
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd   = cardTop - scaleEndPositionPx
      const pinStart     = triggerStart
      const pinEnd       = endElTop - containerHeight / 2

      let scaleProgress = 0
      if (scrollTop >= triggerStart) {
        scaleProgress = Math.min(1, (scrollTop - triggerStart) / Math.max(1, triggerEnd - triggerStart))
      }

      const targetScale = baseScale + i * itemScale
      const scale       = 1 - scaleProgress * (1 - targetScale)
      const rotation    = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardTopsRef.current[j] || 0
          const jTrigger = jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTrigger) topCardIndex = j
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount)
      }

      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      // Round aggressively to eliminate sub-pixel jitter
      const ty = Math.round(translateY)
      const s  = Math.round(scale  * 1000) / 1000
      const r  = Math.round(rotation * 100) / 100
      const b  = Math.round(blur    * 100) / 100

      const last = lastTransformsRef.current.get(i)
      if (!last ||
          last.ty !== ty ||
          last.s  !== s  ||
          last.r  !== r  ||
          last.b  !== b) {
        card.style.transform = `translate3d(0,${ty}px,0) scale(${s}) rotate(${r}deg)`
        card.style.filter    = b > 0 ? `blur(${b}px)` : ''
        lastTransformsRef.current.set(i, { ty, s, r, b })
      }

      if (i === cards.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (inView && !stackCompletedRef.current) { stackCompletedRef.current = true; onStackComplete?.() }
        else if (!inView && stackCompletedRef.current) stackCompletedRef.current = false
      }
    })
  }, [baseScale, blurAmount, itemScale, itemStackDistance, onStackComplete, parsePercentage, rotationAmount, scaleEndPosition, stackPosition])

  const onScroll = useCallback(() => {
    if (tickingRef.current) return
    tickingRef.current = true
    rafRef.current = requestAnimationFrame(update)
  }, [update])

  const onResize = useCallback(() => {
    measurePositions()
    update()
  }, [measurePositions, update])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'))
    cardsRef.current = cards
    const cache = lastTransformsRef.current

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.willChange     = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform      = 'translateZ(0)'
    })

    // Cache natural positions once layout settles
    measurePositions()
    // Re-measure after images/fonts load in case cards shifted
    const tid1 = setTimeout(() => { measurePositions(); update() }, 400)
    const tid2 = setTimeout(() => { measurePositions(); update() }, 1500)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('load',   onResize, { passive: true })

    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load',   onResize)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(tid1)
      clearTimeout(tid2)
      stackCompletedRef.current = false
      cardsRef.current = []
      cardTopsRef.current = []
      cache.clear()
      tickingRef.current = false
    }
  }, [itemDistance, measurePositions, onResize, onScroll, update])

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack
