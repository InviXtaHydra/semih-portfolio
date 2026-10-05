import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    // Respect the OS "reduce motion" setting across all animations
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[60] rounded-full bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
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
