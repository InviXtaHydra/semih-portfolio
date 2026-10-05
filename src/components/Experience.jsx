import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { experience } from '../data/profile'

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section aria-labelledby="experience" className="border-t border-rule py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience"
          title="Experience"
          intro="Two teams so far, one on full-stack and low-code, one on the Microsoft Power Platform. Most recent first."
        />

        <ol ref={listRef} className="relative">
          {/* Timeline rail, filled as you scroll */}
          <span className="absolute top-2 bottom-2 left-[7px] w-px bg-rule md:left-[calc(33.333%+7px)]" aria-hidden="true" />
          <motion.span
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-lowcode via-code to-sap md:left-[calc(33.333%+7px)]"
            style={{ scaleY: progress }}
            aria-hidden="true"
          />

          {experience.map((job) => (
            <li key={job.company} className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-3 md:gap-0 md:pl-0">
              <Reveal className="md:pr-12 md:text-right">
                <p className="text-sm text-muted">{job.period}</p>
                <p className="heading mt-1 text-3xl font-semibold sm:text-4xl">{job.company}</p>
              </Reveal>

              <span
                className="absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 bg-ink md:left-[33.333%]"
                style={{ borderColor: `var(--color-${job.domain})`, boxShadow: `0 0 16px -2px var(--color-${job.domain})` }}
                aria-hidden="true"
              />

              <Reveal delay={0.08} className="md:col-span-2 md:pl-12">
                <h3 className="text-xl font-medium text-paper">{job.role}</h3>
                <ul className="mt-5 space-y-3 text-paper/75">
                  {job.highlights.map((h) => (
                    <li key={h} className="relative max-w-[64ch] pl-5">
                      <span
                        className="absolute top-[0.7em] left-0 h-px w-2.5"
                        style={{ background: `var(--color-${job.domain})` }}
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tools used at ${job.company}`}>
                  {job.stack.map((s) => (
                    <li key={s} className="rounded-full bg-panel-2 px-3 py-1 text-sm text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
