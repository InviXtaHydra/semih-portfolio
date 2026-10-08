import { useEffect, useRef } from 'react'

// The hero's signature: horizontal lines that drift like water, bend away from the pointer and
// carry a shockwave outward from every click or tap. Plain canvas, no library.
const LINES = 26
const STEP = 10 // px between the points of a line
const REACH = 150 // px: how far the pointer pushes the lines
const PUSH = 46 // px: how far a line moves right under the pointer

export default function WaveField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1e4, y: -1e4, vy: 0, inside: false }
    const ripples = []
    let w = 0
    let h = 0
    let lines = []
    let gradient = null
    let raf = 0
    let running = false

    function build() {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const points = Math.ceil(w / STEP) + 2
      lines = Array.from({ length: LINES }, (_, i) => ({
        y0: h * (0.08 + (0.86 * i) / (LINES - 1)),
        offset: new Float32Array(points),
        velocity: new Float32Array(points),
      }))
      const styles = getComputedStyle(document.documentElement)
      gradient = ctx.createLinearGradient(0, 0, w, 0)
      gradient.addColorStop(0, styles.getPropertyValue('--color-code').trim() || '#7fa7ff')
      gradient.addColorStop(0.55, styles.getPropertyValue('--color-paper').trim() || '#ecebe6')
      gradient.addColorStop(1, styles.getPropertyValue('--color-lowcode').trim() || '#e8b04b')
    }

    function draw(time) {
      const t = time / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.25
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        // Lines in the middle are a little brighter, so the field has depth
        ctx.globalAlpha = 0.2 + 0.3 * Math.sin((Math.PI * (i + 0.5)) / lines.length)
        ctx.beginPath()
        for (let j = 0; j < line.offset.length; j++) {
          const x = j * STEP
          const drift = Math.sin(x * 0.0042 + t * 0.55 + i * 0.32) * 9 + Math.sin(x * 0.012 - t * 0.8 + i * 0.9) * 3
          const base = line.y0 + drift
          let target = 0
          if (pointer.inside) {
            const dx = x - pointer.x
            const dy = base - pointer.y
            const falloff = Math.exp(-(dx * dx + dy * dy) / (2 * REACH * REACH))
            target += Math.tanh(dy / 28) * falloff * PUSH + pointer.vy * falloff * 0.5
          }
          // A damped spring per point: the lines overshoot and wobble back, like jelly
          line.velocity[j] = (line.velocity[j] + (target - line.offset[j]) * 0.075) * 0.86
          line.offset[j] += line.velocity[j]
          // Shockwaves travel faster than the spring can follow, so they are added on top
          let wave = 0
          for (const r of ripples) {
            const d = Math.hypot(x - r.x, base - r.y)
            const band = Math.exp(-((d - r.radius) ** 2) / (2 * 46 * 46))
            wave += band * r.amp * Math.sin((d - r.radius) * 0.07)
          }
          const y = base + line.offset[j] + wave
          if (j === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      for (let k = ripples.length - 1; k >= 0; k--) {
        ripples[k].radius += 9
        ripples[k].amp *= 0.975
        if (ripples[k].amp < 0.5) ripples.splice(k, 1)
      }
      pointer.vy *= 0.9
    }

    function loop(time) {
      draw(time)
      raf = requestAnimationFrame(loop)
    }
    function start() {
      if (running || reduce) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    function local(e) {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top, rect }
    }
    function onMove(e) {
      const { x, y, rect } = local(e)
      pointer.inside = y >= 0 && y <= rect.height && x >= 0 && x <= rect.width
      if (pointer.inside && pointer.x > -1e3) pointer.vy = Math.max(-80, Math.min(80, y - pointer.y))
      pointer.x = x
      pointer.y = y
    }
    function onDown(e) {
      const { x, y, rect } = local(e)
      if (y < 0 || y > rect.height) return
      ripples.push({ x, y, radius: 0, amp: 38 })
      if (ripples.length > 6) ripples.shift()
    }
    function onLeave() {
      pointer.inside = false
    }

    build()
    if (reduce) draw(0) // one still frame
    const resize = new ResizeObserver(() => {
      build()
      if (reduce) draw(0)
    })
    resize.observe(canvas)
    // Only animate while the hero is on screen
    const visible = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    visible.observe(canvas)
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    return () => {
      stop()
      resize.disconnect()
      visible.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
