const allCaseStudies = [
  {
    slug: 'knowledge-graph', number: '01', name: 'Knowledge graph submission workflow', title: 'Change the graph.', titleAccent: 'Keep the trust.',
    category: 'PRODUCT ENGINEERING · AXY', role: 'Founding Engineer', color: 'lilac', visual: 'graph',
    intro: 'A scientific knowledge graph submission workflow for reviewing edits, detecting conflicts, and merging changes safely.',
    overview: 'Axy’s platform brings scientific knowledge together in a graph. The submission workflow gives researchers a structured way to propose changes before those edits become part of the live graph.',
    facts: [{label:'FOCUS', value:'Submission & review'}, {label:'PLATFORM', value:'Scientific knowledge graph'}, {label:'ROLE', value:'Founding Engineer'}],
    sections: [
      { label: 'THE CHALLENGE', title: 'Make change reviewable.', paragraphs: ['Researchers needed to collaborate on graph changes without affecting live data before review. The workflow also needed a clear history and a way to surface conflicts when changes overlapped.'] },
      { label: 'THE APPROACH', title: 'A deliberate path to the graph.', paragraphs: ['I designed a delta-based submission model that records proposed changes and their context separately from the live graph. A conflict detection step compares the intended changes with the current state before a submission is merged.', 'Approved changes are processed asynchronously, with mutation history and downstream notifications. Dead-letter handling and reconciliation checks help keep dependent services in sync.'] },
      { label: 'THE RESULT', title: 'Confidence at every step.', paragraphs: ['Researchers can draft changes in a structured interface, reviewers can inspect changes and conflicts, and approved submissions can be merged without exposing unreviewed edits to the live graph.'] },
    ],
    tags: ['TypeScript', 'PostgreSQL', 'ArcadeDB', 'AWS Lambda', 'SQS', 'SNS'],
  },
  {
    slug: 'hybrid-retrieval', number: '02', name: 'RAG hybrid retrieval system', title: 'RAG search.', titleAccent: 'Know when it’s wrong.',
    category: 'APPLIED AI · AXY', role: 'Founding Engineer', color: 'blue', visual: 'search',
    intro: 'A multi-stage RAG retrieval pipeline and evaluation harness for scientific search, tested across four BEIR datasets.',
    overview: 'A multi-stage RAG retrieval pipeline and evaluation harness designed to measure how scientific search changes across datasets.',
    facts: [{label:'FOCUS', value:'Scientific retrieval'}, {label:'METHOD', value:'Dense + sparse search'}, {label:'ROLE', value:'Applied AI engineering'}],
    sections: [
      { label:'THE CHALLENGE', title:'Find what matters.', paragraphs:['Scientific queries contain specialized terms, abbreviations, and entity names. Keyword and semantic search each catch relevant results the other can miss, so the system needed both.'] },
      { label:'THE APPROACH', title:'Bring signals together.', paragraphs:['I built a multi-stage retrieval pipeline in Qdrant using dense and sparse search, then combined their results with Reciprocal Rank Fusion. A reranking step assessed candidate relevance more closely, while query rewriting helped with ambiguous phrasing.', 'Scientific BEIR benchmarks, including Recall@K, NDCG@10, and MRR, provided a way to evaluate changes across iterations.'] },
      { label:'THE RESULT', title:'Measure, learn, improve.', paragraphs:['The benchmark revealed improvements on some datasets and regressions on others, making future retrieval decisions measurable.'] },
    ],
    tags: ['Qdrant', 'Python', 'Hybrid search', 'Reranking', 'RAG', 'BEIR'],
  },
  {
    slug: 'scope-seeker', number:'03', name:'Scope Seeker', title:'A better match.', titleAccent:'An unfinished journey.',
    category:'STARTUP PROJECT · COLLEGE', role:'Founder & developer', color:'peach', visual:'scope',
    intro:'A college startup attempt to make job discovery more relevant. Three of us built most of the frontend before pausing during campus placements.',
    overview:'We wanted to help candidates find relevant opportunities across platforms and company career pages, while helping employers reach better-matched applicants. This was an early-stage startup attempt, not a completed product.',
    facts:[{label:'STATUS',value:'Paused · frontend prototype'}, {label:'TEAM',value:'Three student builders'}, {label:'MY ROLE',value:'Initiated & co-built'}],
    sections:[],
    tags:['Next.js','React','Tailwind CSS','Product research','Startup planning'], live:'https://scopeseeker-frontend.vercel.app/', code:'https://github.com/iamlokeshdhakar/scope-seeker',
  },
  {
    slug:'easy-task', number:'04', name:'Easy Task', title:'Make space', titleAccent:'for progress.',
    category:'COLLABORATIVE WEB APP', role:'Full-stack development', color:'lime', visual:'tasks',
    intro:'A project management app that helps teams organize work, track progress, and collaborate.',
    overview:'Easy Task brings task organization and team collaboration together, with tools for keeping work visible as it moves forward.',
    facts:[{label:'TYPE',value:'Project management'}, {label:'FOCUS',value:'Tasks & collaboration'}, {label:'STACK',value:'Node.js · MongoDB · Socket.IO'}],
    sections:[
      {label:'THE IDEA', title:'Give work a place to live.', paragraphs:['The app is designed to help teams organize tasks and follow their progress in a shared workspace.']},
      {label:'THE EXPERIENCE', title:'See the work move.', paragraphs:['Kanban boards and time tracking support day-to-day project organization and collaboration.']},
      {label:'THE BUILD', title:'Built for shared work.', paragraphs:['The application uses Node.js, Express.js, MongoDB, Redux, and Socket.IO.']},
    ],
    tags:['Node.js','Express.js','MongoDB','Redux','Socket.IO'], live:'https://easy-task.onrender.com/', code:'https://github.com/iamlokeshdhakar/easy-task-project-management',
  },
  {
    slug:'medianeeti', number:'05', name:'Medianeeti', title:'A digital home', titleAccent:'for bold ideas.',
    category:'DIGITAL EXPERIENCE', role:'Website development', color:'sand', visual:'studio',
    intro:'A website for a creative and marketing agency, bringing its services and positioning together online.',
    overview:'Medianeeti helps startups and growing businesses build brands, create content, and grow customer acquisition. The website introduces that work and its services.',
    facts:[{label:'TYPE',value:'Agency website'}, {label:'FOCUS',value:'Brand & services'}, {label:'STACK',value:'Next.js · TypeScript'}],
    sections:[
      {label:'THE IDEA',title:'A home for the agency.',paragraphs:['The website gives Medianeeti a place to introduce its creative and marketing services to potential clients.']},
      {label:'THE EXPERIENCE',title:'A clear introduction.',paragraphs:['The content presents the agency’s approach across branding, content, and customer acquisition.']},
      {label:'THE BUILD',title:'A modern web foundation.',paragraphs:['The site is built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.']},
    ],
    tags:['Next.js','TypeScript','Tailwind CSS','shadcn/ui'], live:'https://medianeeti.in/',
  },
  {
    slug:'cameras-inside', number:'06', name:'Cameras Inside', title:'Stories,', titleAccent:'in frame.',
    category:'PORTFOLIO WEBSITE', role:'Website development', color:'rose', visual:'camera',
    intro:'A responsive portfolio for a professional photographer, built to put imagery and storytelling first.',
    overview:'Cameras Inside showcases a Delhi-based photographer’s work and gives prospective clients a way to explore different kinds of photography.',
    facts:[{label:'TYPE',value:'Photography portfolio'}, {label:'FOCUS',value:'Visual storytelling'}, {label:'STACK',value:'Next.js · TypeScript'}],
    sections:[
      {label:'THE IDEA',title:'Let the work lead.',paragraphs:['The portfolio gives the photographer a dedicated space to showcase their work and connect with potential clients.']},
      {label:'THE EXPERIENCE',title:'Room for every story.',paragraphs:['The site presents high-resolution photography across weddings, portraits, events, and fashion in a responsive layout.']},
      {label:'THE BUILD',title:'Designed for the screen.',paragraphs:['The site uses Next.js, TypeScript, Tailwind CSS, and Aceternity UI.']},
    ],
    tags:['Next.js','TypeScript','Tailwind CSS','Aceternity UI'], live:'https://camerasinside.vercel.app/',
  },
];
export const retiredCaseStudySlugs = ['easy-task', 'medianeeti', 'cameras-inside'];
export const caseStudies = allCaseStudies.filter(({ slug }) => !retiredCaseStudySlugs.includes(slug));
export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
