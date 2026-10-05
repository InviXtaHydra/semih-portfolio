// Single source of truth for all portfolio content.
// Each domain has a hue that is reused by skills, projects and filters.

export const domains = {
  code: { label: 'Full-stack', color: 'var(--color-code)' },
  lowcode: { label: 'Low-code', color: 'var(--color-lowcode)' },
  sap: { label: 'SAP cloud', color: 'var(--color-sap)' },
}

export const profile = {
  name: 'Semih Altintas',
  role: 'Full-Stack & Low-Code Developer / SAP BTP Specialist',
  tagline:
    'Bridging full-stack development, low-code platforms, and SAP Cloud technologies to build high-impact digital solutions.',
  location: 'Maasmechelen, Belgium',
  email: 'semih-altintas@hotmail.com',
  phone: '+32 497 20 14 46',
  phoneHref: '+32497201446',
  linkedin: 'https://www.linkedin.com/in/semih-altintas',
  education: 'Bachelor in Applied Computer Science (Toegepaste Informatica)',
  languages: [
    { name: 'Dutch', level: 'Native' },
    { name: 'Turkish', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'French', level: 'Basic' },
  ],
  bio: [
    'I’m a recently graduated application developer with a Bachelor in Applied Computer Science. Rather than picking a single lane, I work where full-stack development, low-code platforms and SAP Cloud technologies meet.',
    'Some problems need hand-written Java or .NET. Others are solved faster with a Power Automate flow or a CAP service on SAP BTP. I move between code and configuration, so the team gets the right tool instead of the familiar one.',
    'I learn quickly, think analytically, and I’m used to working in Agile/Scrum teams: daily stand-ups, refinements, sprint reviews and code reviews.',
  ],
}

export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend & languages',
    domain: 'code',
    summary: 'Typed, tested services and APIs.',
    skills: ['Java', 'Spring Boot', '.NET', 'C#', 'Python'],
  },
  {
    id: 'frontend',
    title: 'Frontend & mobile',
    domain: 'code',
    summary: 'Interfaces for web, mobile and Microsoft 365.',
    skills: ['React', 'Angular', 'Vue.js', '.NET MAUI', 'SharePoint Framework (SPFx)'],
  },
  {
    id: 'sap',
    title: 'SAP cloud & integration',
    domain: 'sap',
    summary: 'Extending and connecting SAP landscapes.',
    skills: [
      'SAP BTP',
      'CAP',
      'Business Application Studio',
      'Cloud Integration (CI/CPI)',
      'API Management',
      'Event Mesh',
      'SAP Fiori',
      'OData services',
      'SAP HANA Cloud',
    ],
  },
  {
    id: 'lowcode',
    title: 'Low-code & no-code',
    domain: 'lowcode',
    summary: 'Shipping business apps and automations fast.',
    skills: ['Power Apps', 'Power Automate', 'OutSystems', 'Bubble.io', 'Xano'],
  },
  {
    id: 'cloud',
    title: 'Cloud, data & DevOps',
    domain: 'code',
    summary: 'Where it runs and where the data lives.',
    skills: ['Microsoft Azure', 'Docker', 'Git & GitHub', 'SQL Server', 'MySQL', 'MongoDB', 'Cosmos DB'],
  },
  {
    id: 'ways',
    title: 'Ways of working',
    domain: 'lowcode',
    summary: 'How I work with a team.',
    skills: ['Agile / Scrum', 'Jira', 'Confluence', 'Code reviews', 'Sprint reviews'],
  },
]

export const experience = [
  {
    company: 'Houben',
    role: 'Microsoft Power Platform Developer',
    period: 'Sep 2025 – Oct 2025',
    domain: 'lowcode',
    highlights: [
      'Built a modern SharePoint intranet, with custom SPFx components and Power Automate for workflow automation.',
      'Introduced AI-driven tools and Power Platform features that improved team collaboration and efficiency.',
      'Took part in daily stand-ups and the full Scrum cycle: refinements, sprint reviews and code reviews.',
      'Delivered a working proof of concept and the core features within a tight timeline.',
    ],
    stack: ['SPFx', 'Power Automate', 'SharePoint', 'React'],
  },
  {
    company: 'Collide',
    role: 'Full-Stack & Low-Code Developer (internship)',
    period: 'Sep 2024 – May 2025',
    domain: 'code',
    highlights: [
      'Contributed to an employee dashboard MVP, a progressive web app that brings workforce and project data together.',
      'Wrote the first backend in Java, then migrated it to Xano for a leaner cloud setup and simpler API integration.',
      'Covered the app with automated tests and made it work offline and on mobile.',
      'Worked in an Agile Scrum team with iterative sprint deliveries and a focus on code quality.',
    ],
    stack: ['Java', 'Xano', 'PWA', 'Automated testing'],
  },
]

export const projects = [
  {
    title: 'IMDBee',
    category: 'Full-stack',
    domain: 'code',
    description:
      'A movie catalog with accounts, search and filters, star reviews and trailers. Live movie data from TMDB, served through a secured Spring Boot API.',
    stack: ['Spring Boot', 'Spring Security (JWT)', 'Vue 3', 'Pinia', 'Tailwind CSS', 'PostgreSQL (Supabase)', 'TMDB API'],
    demo: 'https://imdbee.vercel.app',
    code: 'https://github.com/InviXtaHydra/imdbee',
    video: '/projects/imdbee-demo.mp4',
    poster: '/projects/imdbee-poster.jpg',
    videoLength: '0:30',
  },
  {
    title: 'Employee Dashboard PWA',
    category: 'Full-stack / Low-code',
    domain: 'code',
    secondary: 'lowcode',
    description:
      'A progressive web app that centralizes employee and project tracking, with offline support and automated workflows.',
    stack: ['Xano', 'Java', 'PWA', 'Vue.js'],
    demo: '#',
    code: '#',
  },
  {
    title: 'SAP BTP Integration Hub',
    category: 'SAP / Cloud',
    domain: 'sap',
    description:
      'An enterprise integration platform with real-time event streaming and custom OData API services.',
    stack: ['SAP BTP', 'CAP', 'Cloud Integration', 'Event Mesh', 'Node.js'],
    demo: '#',
    code: '#',
  },
  {
    title: 'AI-Powered SharePoint Intranet',
    category: 'Power Platform / Frontend',
    domain: 'lowcode',
    secondary: 'code',
    description:
      'A custom intranet portal that improves internal communication with automated workflows and AI summaries.',
    stack: ['SPFx', 'React', 'Power Automate', 'Azure AI'],
    demo: '#',
    code: '#',
  },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]
