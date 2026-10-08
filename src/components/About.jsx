import { ArrowUpRight, Sparkles } from 'lucide-react'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import GitHubIcon from './GitHubIcon'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section aria-labelledby="about" className="border-t border-rule py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="about" title="Code when it’s needed, configuration when it’s faster." />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal className="space-y-5 text-lg text-paper/80">
              {profile.bio.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[62ch]">{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.05} className="relative mt-10 overflow-hidden rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'color-mix(in oklab, var(--color-ai) 35%, transparent)' }}>
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-ai opacity-15 blur-3xl" aria-hidden="true" />
              <h3 className="heading relative inline-flex items-center gap-2 text-2xl font-semibold text-ai">
                <Sparkles size={20} aria-hidden="true" /> Into AI
              </h3>
              <div className="relative mt-4 space-y-4 text-paper/80">
                {profile.ai.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[60ch]">{p}</p>
                ))}
              </div>
              <Magnetic className="relative mt-6 inline-flex">
                <a
                  href={`${profile.github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ai px-5 py-2.5 text-sm font-medium text-ink"
                >
                  <GitHubIcon size={16} /> See my AI projects on GitHub <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <dl className="divide-y divide-rule border-y border-rule">
              <Fact term="Education">{profile.education}</Fact>
              <Fact term="Based in">{profile.location}</Fact>
              <Fact term="Languages">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {profile.languages.map((l) => (
                    <li key={l.name}>
                      {l.name} <span className="text-muted">{l.level.toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
              </Fact>
              <Fact term="Way of working">Agile / Scrum teams</Fact>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Fact({ term, children }) {
  return (
    <div className="py-4">
      <dt className="mb-1 text-sm text-muted">{term}</dt>
      <dd className="text-paper">{children}</dd>
    </div>
  )
}
