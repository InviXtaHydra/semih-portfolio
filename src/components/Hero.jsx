import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import LinkedInIcon from './LinkedInIcon'
import { profile } from '../data/profile'

const ease = [0.22, 1, 0.36, 1]

// Rotating subtitle; each role carries its domain's hue
const roles = [
  { text: 'Full-stack developer', color: 'var(--color-code)' },
  { text: 'Low-code developer', color: 'var(--color-lowcode)' },
  { text: 'SAP BTP specialist', color: 'var(--color-sap)' },
]

// The bridge: three strands, one per domain, that merge into a single line.
// viewBox 1200×220; strands start at y = 40 / 110 / 180 and meet at x = 760.
const strands = [
  { id: 'code', label: 'Full-Stack', d: 'M0 40 C 320 40, 470 110, 760 110', y: '18.2%' },
  { id: 'lowcode', label: 'Low-Code', d: 'M0 110 C 240 110, 380 158, 540 132 S 700 110, 760 110', y: '50%' },
  { id: 'sap', label: 'SAP BTP', d: 'M0 180 C 320 180, 470 110, 760 110', y: '81.8%' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [reduce])

  const role = roles[roleIndex]

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 md:pb-28">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-page relative">
        <motion.p
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MapPin size={15} aria-hidden="true" />
          {profile.location}
          <span className="mx-1 h-3 w-px bg-rule" aria-hidden="true" />
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sap opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sap" />
          </span>
          Open to new roles
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1 className="display font-semibold text-paper lg:col-span-7" style={{ fontSize: 'clamp(4.5rem, 21vw, 12.5rem)', lineHeight: 0.84 }}>
            <span className="sr-only">{profile.name}, {profile.role}</span>
            {['Semih', 'Altintas'].map((word, i) => (
              <span key={word} className={`block overflow-hidden pb-[0.08em] ${i ? "-mt-[0.08em]" : ""}`} aria-hidden="true">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="lg:col-span-5 lg:pb-[2.2rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <p className="heading h-[1.2em] text-2xl font-medium sm:text-3xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={role.text}
                  className="inline-block"
                  style={{ color: role.color }}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease }}
                >
                  {role.text}
                </motion.span>
              </AnimatePresence>
            </p>
            <p className="mt-4 max-w-md text-lg text-paper/75">{profile.tagline}</p>
          </motion.div>
        </div>

        <Bridge />

        <motion.div
          className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease }}
        >
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              View projects
              <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-rule px-6 py-3 font-medium text-paper transition-colors hover:border-paper/40 hover:bg-panel"
            >
              Contact me
            </a>
          </div>
          <div className="flex items-center gap-5 text-sm text-muted">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-paper">
              <LinkedInIcon size={16} /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-paper">
              <Mail size={16} aria-hidden="true" /> Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Bridge() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mt-6 h-36 sm:mt-8 sm:h-48 md:h-56" aria-hidden="true">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="merged" gradientUnits="userSpaceOnUse" x1="760" y1="110" x2="1200" y2="110">
            <stop offset="0" stopColor="var(--color-lowcode)" />
            <stop offset="1" stopColor="var(--color-paper)" stopOpacity="0.9" />
          </linearGradient>
          <filter id="soft-glow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Blurred copies give each strand a faint glow */}
        <g filter="url(#soft-glow)" opacity="0.55">
          {strands.map((s, i) => (
            <motion.path
              key={`glow-${s.id}`}
              d={s.d}
              fill="none"
              stroke={`var(--color-${s.id})`}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: 0.55 + i * 0.12, ease }}
            />
          ))}
        </g>

        {strands.map((s, i) => (
          <motion.path
            key={s.id}
            d={s.d}
            fill="none"
            stroke={`var(--color-${s.id})`}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, delay: 0.55 + i * 0.12, ease }}
          />
        ))}

        <motion.path
          id="merged-line"
          d="M760 110 L1200 110"
          fill="none"
          stroke="url(#merged)"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.75, ease }}
        />
      </svg>

      {/* Junction and end node are HTML so they stay round when the SVG stretches */}
      <motion.span
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper shadow-[0_0_24px_4px_rgba(236,235,230,0.35)]"
        style={{ left: '63.33%', top: '50%' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.7 }}
      />
      <motion.span
        className="absolute right-0 hidden -translate-y-1/2 rounded-full border border-paper/30 bg-ink px-3 py-1 text-xs text-paper sm:block"
        style={{ top: '50%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 2.4 }}
      >
        One solution
      </motion.span>

      {/* A pulse travels along the merged line once everything has drawn */}
      {!reduce && (
        <motion.span
          className="absolute h-1.5 w-10 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-paper to-transparent"
          style={{ top: '50%' }}
          initial={{ left: '63.33%', opacity: 0 }}
          animate={{ left: ['63.33%', '96%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, delay: 2.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
        />
      )}

      {/* Domain tags sit at the start of each strand */}
      {strands.map((s, i) => (
        <motion.span
          key={`tag-${s.id}`}
          className="absolute left-0 -translate-y-1/2 rounded-full border bg-ink/80 px-3 py-1 text-xs font-medium backdrop-blur sm:text-sm"
          style={{
            top: s.y,
            color: `var(--color-${s.id})`,
            borderColor: `color-mix(in oklab, var(--color-${s.id}) 40%, transparent)`,
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease }}
        >
          {s.label}
        </motion.span>
      ))}
    </div>
  )
}
