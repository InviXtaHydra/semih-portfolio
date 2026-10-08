import { useEffect, useId, useRef, useState } from 'react'
import { Play } from 'lucide-react'

// Poster with a play button; the video only loads once someone presses play.
// With a mouse, the poster ripples like liquid under the pointer (an SVG displacement filter).
export default function DemoPlayer({ title, video, poster, length, color }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  if (playing) {
    return (
      <video
        ref={videoRef}
        poster={poster}
        className="h-full w-full bg-ink object-contain"
        controls
        autoPlay
        muted
        playsInline
        aria-label={`Demo video of ${title}`}
        onEnded={() => videoRef.current?.load()}
      >
        {/* MP4 (H.264) plays everywhere incl. Safari; WebM is the fallback for browsers without H.264 */}
        <source src={video} type="video/mp4" />
        <source src={video.replace(/\.mp4$/, '.webm')} type="video/webm" />
      </video>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      data-cursor="Play"
      className="group/play relative block h-full w-full overflow-hidden"
      aria-label={`Play the ${length} demo video of ${title}`}
    >
      <LiquidPoster src={poster} />
      <span className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover/play:bg-ink/10" aria-hidden="true" />
      <span className="play-badge absolute inset-0 grid place-items-center transition-opacity duration-300" aria-hidden="true">
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-paper text-ink shadow-2xl transition-transform duration-300 group-hover/play:scale-110 sm:h-20 sm:w-20">
          <span className="absolute inset-0 animate-ping rounded-full opacity-30 motion-reduce:hidden" style={{ background: color }} />
          <Play className="relative h-6 w-6 translate-x-0.5 fill-current sm:h-8 sm:w-8" />
        </span>
      </span>
      <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-paper backdrop-blur sm:bottom-4 sm:left-4 sm:text-sm" aria-hidden="true">
        Watch demo · {length}
      </span>
    </button>
  )
}

function LiquidPoster({ src }) {
  const id = `liquid-${useId().replace(/:/g, '')}`
  const imgRef = useRef(null)
  const turbulenceRef = useRef(null)
  const displaceRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    let raf = 0
    let hovered = false
    let strength = 0 // current displacement in px
    let speed = 0 // how fast the pointer moves, drives the wobble
    let last = null

    function tick(time) {
      const target = hovered ? 14 + Math.min(46, speed) : 0
      strength += (target - strength) * 0.08
      speed *= 0.92
      const t = time / 1000
      turbulenceRef.current.setAttribute('baseFrequency', `${(0.008 + 0.003 * Math.sin(t * 1.3)).toFixed(4)} ${(0.018 + 0.006 * Math.cos(t)).toFixed(4)}`)
      displaceRef.current.setAttribute('scale', strength.toFixed(1))
      img.style.filter = strength > 0.3 ? `url(#${id})` : 'none'
      if (hovered || strength > 0.3) raf = requestAnimationFrame(tick)
      else raf = 0
    }
    function onEnter() {
      hovered = true
      if (!raf) raf = requestAnimationFrame(tick)
    }
    function onMove(e) {
      if (last) speed = Math.min(80, speed + Math.hypot(e.clientX - last.x, e.clientY - last.y) * 0.6)
      last = { x: e.clientX, y: e.clientY }
    }
    function onLeave() {
      hovered = false
      last = null
    }
    const host = img.parentElement
    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [id])

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.008 0.018" numOctaves="2" seed="7" />
          <feDisplacementMap ref={displaceRef} in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {/* Slightly larger than the frame, so the rippled edges stay hidden */}
      <img
        ref={imgRef}
        src={src}
        alt=""
        className="h-full w-full scale-[1.04] object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/play:scale-[1.08]"
        loading="lazy"
      />
    </>
  )
}
