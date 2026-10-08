import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import LinkedInIcon from './LinkedInIcon'
import GitHubIcon from './GitHubIcon'
import WaveField from './WaveField'
import FluidName from './FluidName'
import Magnetic from './Magnetic'
import { profile } from '../data/profile'

const ease = [0.22, 1, 0.36, 1]

// Rotating subtitle; each role carries its domain's hue
const roles = [
  { text: 'Full-stack developer', color: 'var(--color-code)' },
  { text: 'Low-code developer', color: 'var(--color-lowcode)' },
  { text: 'AI enthusiast', color: 'var(--color-ai)' },
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
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-10 sm:pt-32">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
      >
        <WaveField />
      </motion.div>
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Fades the waves out towards the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" aria-hidden="true" />

      <div className="container-page relative flex flex-1 flex-col">
        <motion.p
          className="mb-8 inline-flex items-center gap-2 self-start rounded-full bg-ink/60 px-3 py-1 text-sm text-muted backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MapPin size={15} aria-hidden="true" />
          {profile.location}
          <span className="mx-1 h-3 w-px bg-rule" aria-hidden="true" />
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
          </span>
          Open to new roles
        </motion.p>

        <div className="my-auto">
          <FluidName words={['Semih', 'Altintas']} label={`${profile.name}, ${profile.role}`} />

          <motion.div
            className="mt-8 grid gap-4 md:mt-10 md:grid-cols-12 md:items-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            <p className="heading h-[1.2em] text-2xl font-medium sm:text-3xl md:col-span-5">
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
            <p className="max-w-md text-lg text-paper/75 md:col-span-6 md:col-start-7">{profile.tagline}</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        >
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-medium text-ink"
              >
                View projects
                <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-rule bg-ink/60 px-6 py-3 font-medium text-paper backdrop-blur transition-colors hover:border-paper/40"
              >
                Contact me
              </a>
            </Magnetic>
          </div>
          <div className="flex items-center gap-5 text-sm text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-paper">
              <GitHubIcon size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-paper">
              <LinkedInIcon size={16} /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-paper">
              <Mail size={16} aria-hidden="true" /> Email
            </a>
          </div>
        </motion.div>

        {!reduce && (
          <motion.p
            className="mt-8 hidden text-sm text-muted sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            Move the mouse through the lines, or click to send a wave.
          </motion.p>
        )}
      </div>
    </section>
  )
}
