import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ProjectArt from './ProjectArt'
import DemoPlayer from './DemoPlayer'
import { domains, projects } from '../data/profile'

const filters = [{ key: 'all', label: 'All' }, ...Object.entries(domains).map(([key, d]) => ({ key, label: d.label }))]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const visible = projects.filter((p) => filter === 'all' || p.domain === filter || p.secondary === filter)

  return (
    <section aria-labelledby="projects" className="border-t border-rule py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="projects"
          title="Selected projects"
          intro="Filter by domain. Some projects cross over, which is the point."
        />

        <Reveal className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by domain">
          {filters.map((f) => {
            const selected = filter === f.key
            const color = f.key === 'all' ? 'var(--color-paper)' : `var(--color-${f.key})`
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f.key)}
                className={`relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected ? 'border-transparent text-ink' : 'border-rule text-muted hover:text-paper'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {f.key !== 'all' && (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: selected ? 'var(--color-ink)' : color }}
                    aria-hidden="true"
                  />
                )}
                {f.label}
              </button>
            )
          })}
        </Reveal>

        <LayoutGroup>
          <motion.ul layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <ProjectCard key={p.title} project={p} featured={i === 0 && visible.length > 1} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  )
}

// Real links open in a new tab; '#' placeholders stay on the page
const external = (url) => (url?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})

function ProjectCard({ project, featured }) {
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
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => { mx.set(-400); my.set(-400) }}
      className={`glass group relative overflow-hidden rounded-3xl ${featured ? 'md:col-span-2' : ''}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: spotlight }} aria-hidden="true" />

      <article className={`relative grid h-full ${featured ? 'md:grid-cols-2' : ''}`}>
        {project.video ? (
          // 16:9 so the recording is never cropped; centered next to the text on desktop
          <div className={`relative z-20 hidden aspect-video overflow-hidden border-rule bg-ink md:block ${featured ? 'md:order-2 md:m-8 md:self-center md:rounded-2xl md:border md:ml-0' : 'border-b'}`}>
            <DemoPlayer title={project.title} video={project.video} poster={project.poster} length={project.videoLength} color={color} />
          </div>
        ) : (
        <div className={`relative overflow-hidden border-b border-rule ${featured ? 'aspect-[5/3] md:order-2 md:aspect-auto md:min-h-80 md:border-b-0 md:border-l' : 'aspect-[5/3]'}`}>
          <div className="absolute inset-0 bg-panel-2 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
            {project.image ? (
              <img src={project.image} alt="" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <ProjectArt title={project.title} />
            )}
          </div>
        </div>
        )}

        <div className={`relative z-20 flex flex-col p-6 sm:p-8 ${featured ? 'md:justify-between md:p-10' : ''}`}>
          <div>
            <p className="inline-flex items-center gap-2 text-sm" style={{ color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden="true" />
              {project.category}
            </p>
            <h3 className={`heading mt-3 font-semibold ${featured ? 'text-3xl sm:text-5xl' : 'text-3xl'}`}>{project.title}</h3>
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
            <a
              href={project.demo}
              {...external(project.demo)}
              className="inline-flex items-center gap-1.5 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Live demo <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={project.code}
              {...external(project.code)}
              className="inline-flex items-center gap-1.5 rounded-full border border-rule px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-paper/40"
            >
              <Code2 size={16} aria-hidden="true" /> View code
            </a>
          </div>
        </div>
      </article>
    </motion.li>
  )
}
