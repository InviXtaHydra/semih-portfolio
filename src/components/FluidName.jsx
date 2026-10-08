import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// The name in Bricolage Grotesque, a variable font: letters near the pointer grow bolder and
// wider and lean towards it. Only with a mouse, and not with "reduce motion".
export default function FluidName({ words, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const letters = [...ref.current.querySelectorAll('[data-letter]')]
    const level = letters.map(() => 0)
    let mx = -1e4
    let my = -1e4
    let raf = 0

    function tick() {
      raf = 0
      let settling = false
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const dx = mx - (r.left + r.width / 2)
        const dy = my - (r.top + r.height / 2)
        const target = Math.max(0, 1 - Math.hypot(dx, dy) / 340)
        level[i] += (target - level[i]) * 0.16
        if (Math.abs(target - level[i]) > 0.003) settling = true
        const p = level[i]
        el.style.fontVariationSettings = `'wght' ${Math.round(560 + 240 * p)}, 'wdth' ${(82 + 18 * p).toFixed(1)}, 'opsz' 96`
        el.style.transform = `translateY(${(-7 * p).toFixed(2)}%) rotate(${(Math.max(-1, Math.min(1, dx / 300)) * 7 * p).toFixed(2)}deg)`
      })
      if (settling) raf = requestAnimationFrame(tick)
    }
    function onMove(e) {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    function onLeave() {
      mx = -1e4
      my = -1e4
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <h1 ref={ref} className="display font-semibold text-paper" style={{ fontSize: 'clamp(4.25rem, 23vw, 15rem)', lineHeight: 0.84 }}>
      <span className="sr-only">{label}</span>
      {words.map((word, i) => (
        <span key={word} className={`block overflow-hidden pb-[0.1em] ${i ? '-mt-[0.1em]' : ''}`} aria-hidden="true">
          <motion.span
            className="block whitespace-nowrap"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
          >
            {[...word].map((ch, j) => (
              <span
                key={j}
                data-letter
                className="inline-block origin-bottom"
                style={{ fontVariationSettings: "'wght' 560, 'wdth' 82, 'opsz' 96" }}
              >
                {ch}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}
