import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/profile'

function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const sectionIds = navLinks.map((l) => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled && !open ? 'border-b border-rule/70 bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <Monogram />
          <span className="heading text-lg font-semibold">Semih Altintas</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive ? 'text-paper' : 'text-muted hover:text-paper'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-panel-2"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-transform hover:-translate-y-px md:inline-flex"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 -mr-2 grid h-10 w-10 place-items-center rounded-full text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-4 pt-24 pb-10 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-rule"
                >
                  <a href={link.href} onClick={() => setOpen(false)} className="display block py-4 text-5xl font-semibold">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-auto rounded-full bg-paper py-4 text-center font-medium text-ink"
            >
              Get in touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// The three domain strands, in miniature
function Monogram() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-180">
      <path d="M5 10c8 0 14 12 22 12" stroke="var(--color-code)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M5 16h22" stroke="var(--color-lowcode)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 22c8 0 14-12 22-12" stroke="var(--color-sap)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
