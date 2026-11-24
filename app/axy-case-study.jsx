import ArchitectureExplorer from './architecture-explorer';
import EngineeringReveal from './engineering-reveal';

export default function AxyCaseStudy({ story, next }) {
  return <EngineeringReveal className={`eng-page eng-page--${story.variant}`}>
    <header className="story-header eng-header"><a className="brand" href="/" aria-label="Lokesh Dhakar, home">ld<span>.</span></a><a href="/#work" className="story-back">← <span>Back to selected work</span></a><a className="story-contact" href="mailto:lokeshdhakar1404@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></header>

    <section className="eng-hero">
      <div className="eng-topline"><span>SELECTED WORK / {story.index}</span><span>{story.label}</span><span>CASE STUDY</span></div>
      <div className="eng-hero-content"><p className="eng-kicker">{story.category}</p><h1>{story.title}<br/><span>{story.titleAccent}</span></h1><div className="eng-hero-intro"><p>{story.summary}</p><a className="eng-scroll" href="#challenge" aria-label="Scroll to the engineering problem">↓</a></div></div>
      <div className="eng-hero-ribbon" aria-hidden="true"><span>{story.variant === 'graph' ? 'PROPOSE' : 'EXACT TERMS'}</span><span className="eng-ribbon-line"></span><span>{story.variant === 'graph' ? 'REVIEW' : 'SEMANTIC MEANING'}</span><span className="eng-ribbon-line"></span><span>{story.variant === 'graph' ? 'MERGE' : 'BETTER CONTEXT'}</span><span className="eng-ribbon-symbol">✳</span></div>
    </section>

    <section className="eng-context eng-section" id="challenge">
      <div className="eng-section-label eng-reveal"><span>01 / THE CONTEXT</span><span>{story.tensionLabel}</span></div>
      <div className="eng-context-grid eng-reveal"><div><p className="eng-overline">THE TENSION</p><h2>{story.tensionTitle}</h2></div><div className="eng-context-copy"><p className="eng-lead">{story.tensionLead}</p><p>{story.tensionBody}</p></div></div>
      <div className="eng-facts eng-reveal"><div><span>PROJECT</span><p>{story.focus}</p></div><div><span>MY ROLE</span><p>{story.role}</p></div><div><span>DISCIPLINES</span><p>{story.discipline}</p></div></div>
    </section>

    <section className="eng-principle eng-section">
      <div className="eng-section-label eng-reveal"><span>02 / THE DECISION</span><span>{story.principleLabel}</span></div>
      <div className="eng-principle-layout eng-reveal"><div className="eng-principle-mark" aria-hidden="true">✳</div><div><p className="eng-overline">THE IDEA THAT SHAPED THE SYSTEM</p><h2>{story.principle}</h2><p>{story.principleBody}</p></div></div>
    </section>

    <section className="eng-flow eng-section" id="architecture">
      <div className="eng-section-label eng-reveal"><span>03 / HOW IT WORKS</span><span>A CLOSER LOOK AT THE SYSTEM</span></div>
      <div className="eng-flow-heading eng-reveal"><h2>{story.flowTitle}</h2><p>{story.flowIntro}</p></div>
      <div className="eng-reveal"><ArchitectureExplorer stages={story.stages} variant={story.variant} diagramLabel={story.diagramLabel}/></div>
    </section>

    <section className="eng-decisions eng-section">
      <div className="eng-section-label eng-reveal"><span>04 / THE TRADEOFFS</span><span>WHY IT WAS BUILT THIS WAY</span></div>
      <div className="eng-decisions-heading eng-reveal"><h2>Good decisions.<br/><span>Clear reasons.</span></h2><p>The choices that mattered most, and the problem each one addressed.</p></div>
      <div className="eng-decision-grid">{story.decisions.map((decision) => <article className="eng-decision eng-reveal" key={decision.label}><p>{decision.label}</p><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div>
    </section>

    <section className="eng-outcome eng-section">
      <div className="eng-section-label eng-reveal"><span>05 / THE OUTCOME</span><span>{story.outcomeLabel}</span></div>
      <div className="eng-outcome-heading eng-reveal"><h2>{story.outcomeTitle}<br/><span>{story.outcomeAccent}</span></h2><p>{story.outcomeText}</p></div>
      <div className="eng-evidence eng-reveal">{story.evidence.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      {story.evidenceNote && <p className="eng-evidence-note eng-reveal">{story.evidenceNote}</p>}
      <div className="eng-stack eng-reveal"><span>TOOLS & CONCEPTS</span><div>{story.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
    </section>

    <footer className="story-next eng-next"><div className="story-section-label"><span>UP NEXT / {next.number}</span><span>KEEP EXPLORING</span></div><a href={`/case-studies/${next.slug}`} className="story-next-link"><div><p>{next.category}</p><h2>{next.name}<span>.</span></h2></div><span className="story-next-arrow" aria-hidden="true">↗</span></a><div className="story-footer"><a href="/#work">← All selected work</a><a href="mailto:lokeshdhakar1404@gmail.com">Let’s talk ↗</a></div></footer>
  </EngineeringReveal>;
}
