# Semih Altintas — Portfolio

React + Vite, Tailwind CSS v4, Framer Motion, Lucide icons.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

All text lives in `src/data/profile.js`: profile, skills, experience, projects.

- **Project links:** `demo` and `code` are `'#'` placeholders. Replace them with real URLs.
- **Project images:** add `image: '/screens/dashboard.png'` (file in `public/`) to a project to replace its drawn placeholder.
- **Domain colors:** `--color-code`, `--color-lowcode`, `--color-sap` in `src/index.css`. Every skill, project and filter uses these three.

## Structure

```
src/
  data/profile.js          content
  index.css                design tokens (@theme) and global styles
  App.jsx                  page composition, reduced-motion config
  components/
    Navbar.jsx             fixed header, active-section pill, mobile menu
    Hero.jsx               name reveal, rotating role, the three-strand "bridge"
    About.jsx              bio and quick facts
    Skills.jsx             accessible tabs, domain-colored badges
    Experience.jsx         scroll-linked timeline
    Projects.jsx           domain filter, glass cards with cursor spotlight
    ProjectArt.jsx         SVG image placeholders
    Contact.jsx            copyable email/phone, LinkedIn, footer
    Reveal.jsx, SectionHeading.jsx, CopyButton.jsx, LinkedInIcon.jsx
```
