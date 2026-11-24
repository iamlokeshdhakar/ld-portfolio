import { projects, experience, skills } from './content';

function ProjectVisual({ type }) {
  if (type === 'graph') return <div className="visual-graph" aria-hidden="true"><span className="graph-line graph-line--one"/><span className="graph-line graph-line--two"/><span className="graph-line graph-line--three"/><span className="graph-node graph-node--one">RESEARCH</span><span className="graph-node graph-node--two">KNOWLEDGE</span><span className="graph-node graph-node--three">DISCOVERY</span><span className="graph-center">✳</span></div>;
  if (type === 'search') return <div className="visual-search" aria-hidden="true"><div className="search-orb"/><div className="search-window"><span>SEARCH / DISCOVER</span><strong>Ask better<br />questions<span>.</span></strong><div className="search-input">Search the knowledge graph <b>↗</b></div><div className="search-lines"><i/><i/><i/></div></div></div>;
  if (type === 'scope') return <div className="visual-scope" aria-hidden="true"><div className="mock-top"><span>scope<span className="accent-dot">.</span></span><span>FIND YOUR NEXT THING</span></div><p>Good work<br /><em>starts here.</em></p><div className="mock-bar">Find a role that fits <b>↗</b></div><div className="scope-label">A LITTLE MORE POSSIBILITY / EVERY DAY</div></div>;
  if (type === 'tasks') return <div className="visual-tasks" aria-hidden="true"><div className="task-head"><span>easy task<span className="accent-dot">.</span></span><span>YOUR WORKSPACE</span></div><div className="task-title">Make space<br />for progress.</div><div className="task-board"><div><small>TO DO</small><i/><i/></div><div><small>IN PROGRESS</small><i/><i/></div><div><small>DONE</small><i/></div></div></div>;
  if (type === 'studio') return <div className="visual-studio" aria-hidden="true"><span>MEDIANEETI / DIGITAL</span><strong>Make<br /><em>your</em> mark<span>.</span></strong><div>STRATEGY &nbsp; / &nbsp; CREATIVE &nbsp; / &nbsp; GROWTH</div></div>;
  return <div className="visual-camera" aria-hidden="true"><span>CAMERAS INSIDE</span><div className="camera-sun"/><strong>Stories,<br /><em>in frame.</em></strong><small>THE BEAUTY OF A MOMENT</small></div>;
}

export default function PortfolioSections() {
  return <>
    <section className="about-section section-pad" id="about">
      <div className="section-top reveal"><span>01 / A LITTLE ABOUT ME</span><span>INDIA · WORKING WITHOUT BORDERS</span></div>
      <div className="about-heading reveal"><h2>Curious mind.<br /><span>Builder at heart.</span></h2><div className="about-stamp" aria-hidden="true">IDEAS<br/>INTO<br/>ACTION <span>✳</span></div></div>
      <div className="about-content reveal"><p className="about-lead">I like the space between <em>“what if?”</em> and <em>“it works.”</em></p><div><p>I’m Lokesh, a product-focused founding and full-stack engineer. I work across the stack—from shaping an idea and designing systems to building interfaces and applied AI.</p><p>I care about the details that make software useful: clear thinking, thoughtful collaboration, and solutions that hold up in the real world.</p><a className="text-link" href="#experience">A little more about my work <span aria-hidden="true">↗</span></a></div></div>
      <div className="about-note reveal"><span>PRODUCT THINKING</span><span>×</span><span>ENGINEERING</span><span>×</span><span>APPLIED AI</span></div>
    </section>

    <section className="work-section section-pad" id="work">
      <div className="section-top reveal"><span>02 / SELECTED WORK</span><span>A FEW THINGS I’VE BUILT</span></div>
      <div className="work-heading reveal"><h2>Good ideas.<br /><span>Made real.</span></h2><p>From complex systems to the<br/>details people interact with.</p></div>
      <div className="projects-grid">{projects.map((project) => <article className="project-card reveal" key={project.title}>
        <a className={`project-visual project-visual--${project.color}`} href={project.href} target={project.href.startsWith('/') ? undefined : '_blank'} rel={project.href.startsWith('/') ? undefined : 'noreferrer'} aria-label={`${project.action}: ${project.title}`}><ProjectVisual type={project.visual}/><span className="project-visual-arrow" aria-hidden="true">↗</span></a>
        <div className="project-meta"><span>{project.number} / {project.kind}</span><span>{project.detail}</span></div>
        <h3>{project.title}</h3><p>{project.description}</p>
        <div className="project-links"><a href={project.href} target={project.href.startsWith('/') ? undefined : '_blank'} rel={project.href.startsWith('/') ? undefined : 'noreferrer'}>{project.action} <span aria-hidden="true">↗</span></a>{project.code && <a href={project.code} target="_blank" rel="noreferrer">View code <span aria-hidden="true">↗</span></a>}</div>
      </article>)}</div>
      <div className="work-more reveal"><p>There’s always more to build.</p><a className="pill-link" href="https://github.com/iamlokeshdhakar" target="_blank" rel="noreferrer">Explore GitHub <span aria-hidden="true">↗</span></a></div>
    </section>

    <section className="experience-section section-pad" id="experience" data-header-theme="light">
      <div className="section-top reveal"><span>03 / THE JOURNEY SO FAR</span><span>GOOD WORK IS A TEAM SPORT</span></div>
      <div className="experience-heading reveal"><h2>Learning by<br/><span>building.</span></h2><p>A little context behind the work.</p></div>
      <div className="experience-list">{experience.map((job) => <article className="experience-item reveal" key={job.company}>
        <div className="experience-index">{job.number} / EXPERIENCE</div><div className="experience-main"><div className="experience-title"><div><h3>{job.company}<span>.</span></h3><p>{job.role}</p></div><div className="experience-date">{job.date}<br/>{job.place}</div></div><p className="experience-intro">{job.intro}</p><ul>{job.highlights.map((item) => <li key={item}>{item}</li>)}</ul><div className="tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
    </section>

    <section className="skills-section section-pad" id="skills">
      <div className="section-top reveal"><span>04 / THE TOOLKIT</span><span>THE RIGHT TOOLS FOR THE IDEA</span></div>
      <div className="skills-heading reveal"><h2>Many tools.<br/><span>One purpose.</span></h2><p>Useful technology is the kind that helps turn a good idea into something people can actually use.</p></div>
      <div className="skills-grid">{skills.map((skill) => <article className="skill-item reveal" key={skill.title}><span>{skill.number}</span><h3>{skill.title}</h3><p>{skill.items}</p></article>)}</div>
    </section>

    <section className="education-section section-pad" id="education">
      <div className="section-top reveal"><span>05 / THE FOUNDATION</span><span>ALWAYS A WORK IN PROGRESS</span></div>
      <div className="education-card reveal"><div><p className="education-label">EDUCATION / 2020 — 2024</p><h2>Made to<br/><span>keep learning.</span></h2></div><div className="education-detail"><p>B.TECH IN COMPUTER SCIENCE</p><h3>RGPV University<span>.</span></h3><p>Sagar Institute of Research Technology and Science, Bhopal</p><div className="education-grade">CGPA <strong>8.4 / 10</strong></div></div><div className="education-spark" aria-hidden="true">✳</div></div>
    </section>

    <footer className="contact-section section-pad" id="contact" data-header-theme="light">
      <div className="section-top reveal"><span>06 / WHAT’S NEXT?</span><span>GOOD THINGS START WITH A HELLO</span></div>
      <div className="contact-content reveal"><p>HAVE AN IDEA IN MIND?</p><h2>Let’s make<br/><span>something</span><br/>matter<span className="contact-dot">.</span></h2><a className="contact-circle" href="mailto:lokeshdhakar1404@gmail.com" aria-label="Email Lokesh">↗</a></div>
      <div className="contact-bottom reveal"><div><span>DROP ME A LINE</span><a className="contact-email" href="mailto:lokeshdhakar1404@gmail.com">lokeshdhakar1404@gmail.com</a></div><div className="social-links"><a href="https://github.com/iamlokeshdhakar" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/iamlokeshdhakar" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume ↗</a></div></div>
      <div className="footer-line"><a href="#top" className="footer-brand">ld<span>.</span></a><span>LOKESH DHAKAR / FULL-STACK ENGINEER</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  </>;
}
