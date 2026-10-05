import Reveal from './Reveal'

export default function SectionHeading({ id, title, intro }) {
  return (
    <Reveal className="mb-12 grid gap-4 md:mb-16 md:grid-cols-12 md:items-end">
      <h2 id={id} className="heading text-4xl font-semibold text-paper sm:text-5xl md:col-span-7 md:text-6xl">
        {title}
      </h2>
      {intro && <p className="max-w-md text-muted md:col-span-5 md:justify-self-end">{intro}</p>}
    </Reveal>
  )
}
