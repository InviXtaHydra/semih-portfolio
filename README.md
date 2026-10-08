# Semih Altintas — Portfolio

React + Vite, Tailwind CSS v4, Framer Motion, Lucide icons.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

All text lives in `src/data/profile.js`: profile, skills, experience, projects.

- **Projects:** `code` links to the repository; `demo` (optional) to a hosted version. Without `demo` the card shows only the video and the code.
- **Demo videos:** `video: '/projects/name-demo.mp4'` plus a `.webm` next to it and a `poster` image, all in `public/projects/`.
- **Domain colors:** `--color-code`, `--color-lowcode`, `--color-sap` in `src/index.css`, used by skills and projects.

## Structure

```
src/
  data/profile.js          content
  index.css                design tokens (@theme) and global styles
  App.jsx                  page composition, reduced-motion config
  components/
    Navbar.jsx             fixed header, active-section pill, mobile menu
    Hero.jsx               full-screen hero: wave field, fluid name, rotating role
    WaveField.jsx          canvas lines that bend around the pointer; a click sends a shockwave
    FluidName.jsx          variable-font letters that swell and lean towards the pointer
    Cursor.jsx             custom cursor ring (mouse only), "Play" over videos
    Magnetic.jsx           buttons that pull towards the pointer
    DemoPlayer.jsx         poster with a liquid hover ripple; loads the video on play
    About.jsx              bio and quick facts
    Skills.jsx             accessible tabs, domain-colored badges
    Experience.jsx         scroll-linked timeline
    Projects.jsx           full-width project cards, "See more of my work" to GitHub
    Contact.jsx            copyable email/phone, LinkedIn, footer
    Reveal.jsx, SectionHeading.jsx, CopyButton.jsx, LinkedInIcon.jsx, GitHubIcon.jsx
```

## Motion and accessibility

The pointer effects (custom cursor, fluid name, magnetic buttons, liquid posters) only run with a mouse. With the operating system's "reduce motion" setting everything stands still, including the waves. The wave field pauses while the hero is off screen.
