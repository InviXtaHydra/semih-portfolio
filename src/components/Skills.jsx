import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { domains, skillGroups } from '../data/profile'

export default function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  const tabRefs = useRef([])
  const active = skillGroups.find((g) => g.id === activeId)
  const color = `var(--color-${active.domain})`

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  function onKeyDown(e, index) {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!dir) return
    e.preventDefault()
    const next = (index + dir + skillGroups.length) % skillGroups.length
    setActiveId(skillGroups[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section aria-labelledby="skills" className="border-t border-rule py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="skills"
          title="What I work with"
          intro="Colors show the domain each skill belongs to, the same as in the projects below."
        />

        <Reveal className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {Object.entries(domains).map(([key, d]) => (
            <span key={key} className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} aria-hidden="true" />
              {d.label}
            </span>
          ))}
        </Reveal>

        <Reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="grid grid-cols-2 gap-2 md:col-span-4 md:grid-cols-1">
            {skillGroups.map((g, i) => {
              const selected = g.id === activeId
              return (
                <button
                  key={g.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(g.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative isolate flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors md:text-base ${
                    selected ? 'text-paper' : 'text-muted hover:bg-panel hover:text-paper'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 -z-10 rounded-xl border bg-panel"
                      style={{ borderColor: `color-mix(in oklab, var(--color-${g.domain}) 35%, transparent)` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: `var(--color-${g.domain})` }} aria-hidden="true" />
                  {g.title}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="relative min-h-80 overflow-hidden rounded-2xl border border-rule bg-panel p-6 sm:p-10 md:col-span-8"
          >
            {/* Panel light follows the active domain */}
            <motion.div
              className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"
              animate={{ backgroundColor: color, opacity: 0.14 }}
              transition={{ duration: 0.6 }}
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <h3 className="heading text-3xl font-semibold sm:text-4xl">{active.title}</h3>
                <p className="mt-2 text-muted">{active.summary}</p>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {active.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <SkillBadge label={skill} domain={active.domain} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SkillBadge({ label, domain }) {
  const c = `var(--color-${domain})`
  return (
    <span
      className="inline-flex cursor-default items-center rounded-full border border-rule bg-ink/60 px-4 py-2 text-[0.95rem] text-paper transition-[border-color,box-shadow,color] duration-300 hover:[border-color:var(--c)] hover:[box-shadow:0_0_0_1px_var(--c),0_0_28px_-4px_var(--c)]"
      style={{ '--c': c }}
    >
      {label}
    </span>
  )
}
