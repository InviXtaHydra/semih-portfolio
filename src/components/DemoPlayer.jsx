import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

// Poster with a play button; the video only loads once someone presses play
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
      className="group/play relative block h-full w-full"
      aria-label={`Play the ${length} demo video of ${title}`}
    >
      <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" />
      <span className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover/play:bg-ink/15" aria-hidden="true" />
      <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-paper sm:h-20 sm:w-20 text-ink shadow-2xl transition-transform duration-300 group-hover/play:scale-110">
          <span className="absolute inset-0 animate-ping rounded-full opacity-30 motion-reduce:hidden" style={{ background: color }} />
          <Play className="relative h-6 w-6 translate-x-0.5 fill-current sm:h-8 sm:w-8" />
        </span>
      </span>
      <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-paper sm:bottom-4 sm:left-4 sm:text-sm backdrop-blur" aria-hidden="true">
        Watch demo · {length}
      </span>
    </button>
  )
}
