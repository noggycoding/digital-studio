import { useEffect, useState } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react'
import './TextLoop.css'

export default function TextLoop({
  staticText = '',
  rotatingTexts = [],
  interval = 3000,
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (rotatingTexts.length < 2) return
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % rotatingTexts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [rotatingTexts.length, interval])

  return (
    <LazyMotion features={domAnimation}>
      <div className="tl-wrap">
        {staticText && <span className="tl-static">{staticText}</span>}
        <div className="tl-rotating">
          <AnimatePresence mode="wait">
            <m.span
              key={rotatingTexts[index]}
              className="tl-word"
              initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
              exit={{   y: -10, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {rotatingTexts[index]}
            </m.span>
          </AnimatePresence>
        </div>
        <m.span
          className="tl-cursor"
          animate={{ opacity: [1, 0.2] }}
          transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </div>
    </LazyMotion>
  )
}
