import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import DemoPlayer from './DemoPlayer'
import Magnetic from './Magnetic'
import GitHubIcon from './GitHubIcon'
import { profile, projects } from '../data/profile'

export default function Projects() {
  return (
    <section aria-labelledby="projects" className="border-t border-rule py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="projects"
          title="Selected projects"
          intro="Two apps I built end to end. Press play to see them in action."
        />

        <ul className="grid gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} flipped={i % 2 === 1} />
          ))}
        </ul>

        <Reveal className="mt-16 flex justify-center md:mt-20">
          <MoreWork href={profile.github} />
        </Reveal>
      </div>
    </section>
  )
}

// Real links open in a new tab; '#' placeholders stay on the page
const external = (url) => (url?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})

function ProjectCard({ project, flipped }) {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const color = `var(--color-${project.domain})`
  // Cursor spotlight in the project's domain color
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in oklab, ${color} 16%, transparent), transparent 65%)`

  function onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => { mx.set(-400); my.set(-400) }}
      className="glass group relative overflow-hidden rounded-3xl"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: spotlight }} aria-hidden="true" />

      <article className="relative grid h-full md:grid-cols-2">
        {project.video ? (
          // 16:9 so the recording is never cropped; next to the text on desktop, sides alternate per project
          <div
            className={`relative z-20 hidden aspect-video self-center overflow-hidden rounded-2xl border border-rule bg-ink md:m-8 md:block ${
              flipped ? 'md:order-1 md:mr-0' : 'md:order-2 md:ml-0'
            }`}
          >
            <DemoPlayer title={project.title} video={project.video} poster={project.poster} length={project.videoLength} color={color} />
          </div>
        ) : (
          project.image && (
            <div className={`relative hidden overflow-hidden md:block ${flipped ? 'md:order-1' : 'md:order-2'}`}>
              <img src={project.image} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          )
        )}

        <div className={`relative z-20 flex flex-col p-6 sm:p-8 md:justify-between md:p-10 ${flipped ? 'md:order-2' : 'md:order-1'}`}>
          <div>
            <p className="inline-flex items-center gap-2 text-sm" style={{ color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden="true" />
              {project.category}
            </p>
            <h3 className="heading mt-3 text-4xl font-semibold sm:text-5xl">{project.title}</h3>
            <p className="mt-4 max-w-[52ch] text-paper/75">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((t) => (
                <li key={t} className="rounded-full border border-rule px-3 py-1 text-sm text-muted">{t}</li>
              ))}
            </ul>
          </div>

          {project.video && (
            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-rule bg-ink md:hidden">
              <DemoPlayer title={project.title} video={project.video} poster={project.poster} length={project.videoLength} color={color} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Projects without a hosted version (e.g. a local AI model) only show the video and the code */}
            {project.demo && (
              <Magnetic>
                <a
                  href={project.demo}
                  {...external(project.demo)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink"
                >
                  Live demo <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
            )}
            <Magnetic>
              <a
                href={project.code}
                {...external(project.code)}
                className="inline-flex items-center gap-1.5 rounded-full border border-rule px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-paper/40"
              >
                <Code2 size={16} aria-hidden="true" /> View code
              </a>
            </Magnetic>
          </div>
        </div>
      </article>
    </motion.li>
  )
}

// A large magnetic pill to the GitHub profile; on hover a light fill swells out from the pointer.
function MoreWork({ href }) {
  const ref = useRef(null)
  const fx = useMotionValue(0)
  const fy = useMotionValue(0)

  function onPointerEnter(e) {
    const r = ref.current.getBoundingClientRect()
    fx.set(e.clientX - r.left)
    fy.set(e.clientY - r.top)
  }

  return (
    <Magnetic strength={0.25}>
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        onPointerEnter={onPointerEnter}
        className="group/more relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full border border-paper/25 px-8 py-5 text-paper transition-colors duration-500 hover:text-ink sm:px-12 sm:py-7"
      >
        <motion.span
          className="absolute -z-10 h-[90rem] w-[90rem] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-paper transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/more:scale-100"
          style={{ left: fx, top: fy }}
          aria-hidden="true"
        />
        <GitHubIcon size={26} />
        <span className="heading text-2xl font-semibold sm:text-4xl">See more of my work</span>
        <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover/more:translate-x-1 group-hover/more:-translate-y-1 sm:h-8 sm:w-8" aria-hidden="true" />
      </a>
    </Magnetic>
  )
}
