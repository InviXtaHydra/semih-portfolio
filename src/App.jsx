import { MotionConfig, useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Cursor from './components/Cursor'

export default function App() {
  const reduce = useReducedMotion()
  return (
    // Respect the OS "reduce motion" setting across all animations
    <MotionConfig reducedMotion="user">
      {/* Smooth, eased scrolling; off for "reduce motion". The offset clears the fixed navbar on anchor links */}
      {!reduce && <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }} />}
      <a href="#main" className="sr-only z-[60] rounded-full bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </MotionConfig>
  )
}
