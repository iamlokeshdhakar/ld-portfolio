export const projects = [
  {
    number: '01', kind: 'PRODUCT ENGINEERING · AXY', title: 'A living knowledge graph.',
    description: 'A researcher workflow for proposing, reviewing, and safely merging changes into a scientific knowledge graph.',
    detail: 'PRODUCT DESIGN / DISTRIBUTED SYSTEMS', color: 'lilac', visual: 'graph',
    href: '/case-studies#knowledge-graph', action: 'Read the case study',
  },
  {
    number: '02', kind: 'APPLIED AI · AXY', title: 'Search built for discovery.',
    description: 'A multi-stage retrieval pipeline bringing dense and sparse search, reranking, and scientific evaluation together.',
    detail: 'HYBRID SEARCH / APPLIED AI', color: 'blue', visual: 'search',
    href: '/case-studies#retrieval', action: 'Read the case study',
  },
  {
    number: '03', kind: 'FULL-STACK WEB APP', title: 'Scope Seeker.',
    description: 'A job search platform connecting candidates and employers through listings, application tracking, and a resume builder.',
    detail: 'NEXT.JS / NODE.JS / POSTGRESQL', color: 'peach', visual: 'scope',
    href: 'https://scopeseeker-frontend.vercel.app/', action: 'Visit project', code: 'https://github.com/iamlokeshdhakar/scope-seeker',
  },
  {
    number: '04', kind: 'COLLABORATIVE WEB APP', title: 'Easy Task.',
    description: 'A project management app for organizing work, tracking progress, and collaborating as a team.',
    detail: 'NODE.JS / MONGODB / SOCKET.IO', color: 'lime', visual: 'tasks',
    href: 'https://easy-task.onrender.com/', action: 'Visit project', code: 'https://github.com/iamlokeshdhakar/easy-task-project-management',
  },
  {
    number: '05', kind: 'DIGITAL EXPERIENCE', title: 'Medianeeti.',
    description: 'A digital home for a creative and marketing agency, designed to introduce its work and services.',
    detail: 'NEXT.JS / TYPESCRIPT / TAILWIND CSS', color: 'sand', visual: 'studio',
    href: 'https://medianeeti.in/', action: 'Visit project',
  },
  {
    number: '06', kind: 'PORTFOLIO WEBSITE', title: 'Cameras Inside.',
    description: 'A responsive portfolio for a professional photographer, built to put imagery and storytelling first.',
    detail: 'NEXT.JS / TYPESCRIPT / TAILWIND CSS', color: 'rose', visual: 'camera',
    href: 'https://camerasinside.vercel.app/', action: 'Visit project',
  },
];

export const experience = [
  {
    number: '01', company: 'Axy Inc', role: 'Founding Engineer', date: 'AUG 2025 — PRESENT', place: 'REMOTE',
    intro: 'The first engineer hired, helping take a scientific knowledge graph from an early prototype to production.',
    highlights: [
      'Co-designed the platform architecture and built distributed systems supporting millions of knowledge graph entities.',
      'Shipped researcher submission and review workflows, from conflict detection to safe graph merging.',
      'Owned key parts of the applied AI pipeline, including hybrid retrieval, reranking, and evaluation.',
    ],
    tags: ['TypeScript', 'Next.js', 'Python', 'AWS', 'Qdrant'],
  },
  {
    number: '02', company: 'AlphaBI', role: 'Full-Stack Developer', date: 'FEB 2024 — JUL 2025', place: 'SURAT, INDIA',
    intro: 'Turned customer needs into production software across industrial IoT, laboratory operations, and internal tools.',
    highlights: [
      'Re-engineered an IoT monitoring platform, delivering 10+ production pages for monitoring, alerts, and analytics.',
      'Contributed to a backend migration from Express.js to Fastify and worked with real-time data using WebSockets and Kafka.',
      'Built an internal HRMS and helped lead delivery of a pharmaceutical and laboratory management platform.',
    ],
    tags: ['React', 'Node.js', 'Fastify', 'PostgreSQL', 'WebSockets'],
  },
];

export const skills = [
  { number: '01', title: 'Languages', items: 'TypeScript · JavaScript · Python · SQL' },
  { number: '02', title: 'Frontend', items: 'React · Next.js · Tailwind CSS · TanStack Query' },
  { number: '03', title: 'Backend & systems', items: 'Node.js · Fastify · Express.js · Event-driven architecture' },
  { number: '04', title: 'Data & search', items: 'PostgreSQL · MongoDB · Redis · Qdrant · ArcadeDB' },
  { number: '05', title: 'Applied AI', items: 'RAG · LLM integration · Embeddings · Hybrid search · Reranking' },
  { number: '06', title: 'Cloud & tooling', items: 'AWS · Kafka · Docker · Turborepo · Vitest · Playwright' },
];
