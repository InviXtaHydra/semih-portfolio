import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section aria-labelledby="about" className="border-t border-rule py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="about" title="Code when it’s needed, configuration when it’s faster." />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="space-y-5 text-lg text-paper/80 md:col-span-7">
            {profile.bio.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[62ch]">{p}</p>
            ))}
          </Reveal>

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
