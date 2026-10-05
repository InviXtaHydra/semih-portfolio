import { Mail, MapPin, Phone } from 'lucide-react'
import Reveal from './Reveal'
import CopyButton from './CopyButton'
import LinkedInIcon from './LinkedInIcon'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section aria-labelledby="contact" className="relative overflow-hidden border-t border-rule pt-24 md:pt-32">
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="container-page relative">
        <Reveal>
          <h2 id="contact" className="display max-w-4xl font-semibold" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}>
            Let’s build something together.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75">
            Looking for someone who can write the code, wire up the flow, or extend SAP? Send me an email or give me a call.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-rule bg-rule md:grid-cols-3">
          <ContactRow icon={<Mail size={18} />} label="Email" href={`mailto:${profile.email}`} value={profile.email} copy />
          <ContactRow icon={<Phone size={18} />} label="Phone" href={`tel:${profile.phoneHref}`} value={profile.phone} copy />
          <ContactRow icon={<LinkedInIcon size={18} />} label="LinkedIn" href={profile.linkedin} value="in/semih-altintas" external />
        </Reveal>

        <footer className="mt-24 flex flex-col gap-4 border-t border-rule py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <MapPin size={14} aria-hidden="true" /> {profile.location}
          </p>
          <a href="#top" className="transition-colors hover:text-paper">Back to top</a>
        </footer>
      </div>
    </section>
  )
}

function ContactRow({ icon, label, href, value, copy, external }) {
  return (
    <div className="flex flex-col gap-6 bg-panel p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm text-muted">
          <span aria-hidden="true">{icon}</span>
          {label}
        </span>
        {copy && <CopyButton value={value} label={label.toLowerCase()} />}
      </div>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="heading break-words text-xl font-medium text-paper decoration-paper/30 underline-offset-4 transition-colors hover:underline sm:text-2xl"
      >
        {value}
      </a>
    </div>
  )
}
