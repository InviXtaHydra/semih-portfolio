import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A ring that trails the pointer and grows over anything clickable. Elements can set
// data-cursor="Play" to show a word inside the ring. Mouse only; off with "reduce motion".
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 })

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!query.matches) return
    // Only known after mounting (media queries), so it's switched on here once
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    function onMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target instanceof Element ? e.target.closest('a, button, [data-cursor]') : null
      setHovering(Boolean(target))
      setLabel(target?.getAttribute('data-cursor') ?? '')
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 84 : hovering ? 56 : 30

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border border-paper mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: pressed ? 0.8 : 1,
          backgroundColor: label ? 'rgba(236,235,230,1)' : hovering ? 'rgba(236,235,230,0.9)' : 'rgba(236,235,230,0)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        {label && <span className="text-xs font-semibold tracking-wide text-ink">{label}</span>}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-paper mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  )
}
