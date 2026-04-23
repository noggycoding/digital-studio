import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Maps AOS-style attribute values to GSAP from/to state pairs.
 * Scroll DOWN plays the animation forward; scroll UP reverses it via scrub.
 */
const PRESETS = {
  // Pure fades
  'fade':           { y: 0,   x: 0 },
  // Directional fades
  'fade-up':        { y: 50,  x: 0 },
  'fade-down':      { y: -50, x: 0 },
  'fade-left':      { x: 50,  y: 0 },
  'fade-right':     { x: -50, y: 0 },
  'fade-up-right':  { x: -40, y: 40 },
  'fade-up-left':   { x: 40,  y: 40 },
  'fade-down-right':{ x: -40, y: -40 },
  'fade-down-left': { x: 40,  y: -40 },
  // Zooms (in = grow from small, out = shrink from big)
  'zoom-in':        { scale: 0.8, y: 0 },
  'zoom-in-up':     { scale: 0.8, y: 40 },
  'zoom-in-down':   { scale: 0.8, y: -40 },
  'zoom-in-left':   { scale: 0.8, x: 40 },
  'zoom-in-right':  { scale: 0.8, x: -40 },
  'zoom-out':       { scale: 1.2, y: 0 },
  'zoom-out-up':    { scale: 1.2, y: 40 },
  'zoom-out-down':  { scale: 1.2, y: -40 },
  'zoom-out-left':  { scale: 1.2, x: 40 },
  'zoom-out-right': { scale: 1.2, x: -40 },
  // Slides without fade (keeps opacity: 1, only translation)
  'slide-up':       { y: 50,  x: 0,  _keepOpacity: true },
  'slide-down':     { y: -50, x: 0,  _keepOpacity: true },
  'slide-left':     { x: 50,  y: 0,  _keepOpacity: true },
  'slide-right':    { x: -50, y: 0,  _keepOpacity: true },
  // Flip
  'flip-up':        { rotationX: 80, y: 30, transformPerspective: 800 },
  'flip-down':      { rotationX: -80, y: -30, transformPerspective: 800 },
  'flip-left':      { rotationY: 80, x: 30, transformPerspective: 800 },
  'flip-right':     { rotationY: -80, x: -30, transformPerspective: 800 },
}

const registered = new WeakSet()

function buildFromState(preset) {
  const state = { opacity: preset._keepOpacity ? 1 : 0 }
  Object.entries(preset).forEach(([k, v]) => {
    if (k.startsWith('_')) return
    state[k] = v
  })
  return state
}

function buildToState(preset) {
  const state = { opacity: 1, ease: 'power2.out' }
  Object.keys(preset).forEach(k => {
    if (k.startsWith('_')) return
    if (k === 'transformPerspective') {
      state[k] = preset[k]
      return
    }
    // Neutralize to 0 / 1 depending on prop
    state[k] = (k === 'scale') ? 1 : 0
  })
  return state
}

/**
 * Initialize scroll-driven animations on every element with [data-aos] inside `root`.
 * Idempotent per element — already-registered nodes are skipped.
 */
export function initScrollAnimations(root = document) {
  const els = root.querySelectorAll('[data-aos]')

  els.forEach(el => {
    if (registered.has(el)) return
    registered.add(el)

    const type   = el.getAttribute('data-aos')
    const preset = PRESETS[type] || PRESETS['fade-up']
    const delay  = (parseFloat(el.getAttribute('data-aos-delay')) || 0) / 1000

    const from = buildFromState(preset)
    const to   = buildToState(preset)

    gsap.fromTo(el, from, {
      ...to,
      delay,
      scrollTrigger: {
        trigger: el,
        start:  'top 88%',
        end:    'top 40%',
        scrub:  0.6,
        invalidateOnRefresh: true,
      },
    })
  })
}

/**
 * Force ScrollTrigger to recalculate positions. Call after images/videos
 * load or after lazy sections are mounted.
 */
export function refreshScrollAnimations() {
  ScrollTrigger.refresh()
}

/**
 * Create a toggleActions-style animation for elements that shouldn't scrub
 * (e.g. one-shot intros that should still reverse on scroll up).
 */
export function createToggleAnimation(el, options = {}) {
  const {
    from = { y: 40, opacity: 0 },
    to   = { y: 0, opacity: 1 },
    start = 'top 80%',
    duration = 0.8,
  } = options

  return gsap.fromTo(el, from, {
    ...to,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: 'play reverse play reverse',
    },
  })
}
