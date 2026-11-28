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
      {story.benchmark && <div className="eng-query-example eng-reveal"><div><span>THE QUERY / A CLOSER LOOK</span><strong>“sponge”</strong><p>One query exposed a gap between matching a word and understanding a scientific group.</p></div><div><span>RETURNED FIRST</span><strong>Porifera</strong><p>The correct group, with a lead of less than 0.01 over the second result.</p></div><div><span>THE REST OF THE TOP 10</span><strong>8 / 10</strong><p>Letter-matching names, including Spongocoelia, Pterospongus, and Heterospongus.</p></div></div>}
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

    {story.benchmark && <section className="eng-benchmark eng-section" id="evaluation">
      <div className="eng-section-label eng-reveal"><span>05 / THE EVALUATION</span><span>MEASURE BEFORE TRUSTING</span></div>
      <div className="eng-benchmark-heading eng-reveal"><h2>{story.benchmark.heading}</h2><p>{story.benchmark.intro}</p></div>
      <div className="eng-benchmark-grid">{story.benchmark.results.map((result) => <article className="eng-benchmark-result eng-reveal" key={result.dataset}><p>{result.dataset}</p><h3>{result.value}</h3><span>{result.metric}</span><p>{result.detail}</p></article>)}</div>
      <div className="eng-bugs-heading eng-reveal"><div><p className="eng-overline">WHAT THE BENCHMARK CAUGHT</p><h2>Two assumptions.<br/><span>Worth revisiting.</span></h2></div><p>Building the evaluation took longer than the initial pipeline, and it exposed two concrete issues.</p></div>
      <div className="eng-bugs-grid">{story.benchmark.bugs.map((bug) => <article className="eng-bug eng-reveal" key={bug.label}><p>{bug.label}</p><h3>{bug.title}</h3><p>{bug.body}</p></article>)}</div>
      <div className="eng-model-candidate eng-reveal"><div><span>MODEL COMPARISON / NOT YET SHIPPED</span><h2>{story.benchmark.modelTitle}</h2></div><div><p>{story.benchmark.modelBody}</p><p>{story.benchmark.modelFoot}</p></div></div>
    </section>}

    {story.reviewDetails && <section className="eng-review eng-section" id="reliability">
      <div className="eng-section-label eng-reveal"><span>05 / SAFETY IN PRACTICE</span><span>BEYOND THE HAPPY PATH</span></div>
      <div className="eng-review-heading eng-reveal"><h2>{story.reviewDetails.heading}</h2><p>{story.reviewDetails.intro}</p></div>
      {story.reviewDetails.technical && <div className="eng-technical">
        <div className="eng-technical-heading eng-reveal"><div><p className="eng-overline">ENGINEERING DEEP DIVE</p><h3>{story.reviewDetails.technical.heading}</h3></div><p>{story.reviewDetails.technical.intro}</p></div>
        <div className="eng-technical-card eng-reveal"><div className="eng-technical-card-heading"><div><span>01 / CONFLICT DETECTION</span><h4>{story.reviewDetails.technical.conflict.title}</h4></div><p>{story.reviewDetails.technical.conflict.description}</p></div>
          <div className="eng-conflict-example"><p>{story.reviewDetails.technical.conflict.field}</p><div className="eng-conflict-values">{story.reviewDetails.technical.conflict.values.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong><p>{item.detail}</p></div>)}</div><div className="eng-conflict-result"><span>↳</span><p>{story.reviewDetails.technical.conflict.result}</p></div></div><p className="eng-technical-note">{story.reviewDetails.technical.conflict.note}</p>
        </div>
        <div className="eng-technical-card eng-reveal"><div className="eng-technical-card-heading"><div><span>02 / IDEMPOTENT MERGE</span><h4>{story.reviewDetails.technical.retry.title}</h4></div><p>{story.reviewDetails.technical.retry.description}</p></div><ol className="eng-retry-steps">{story.reviewDetails.technical.retry.steps.map((step) => <li key={step.label}><span>{step.label}</span><p>{step.text}</p></li>)}</ol><p className="eng-technical-note">{story.reviewDetails.technical.retry.note}</p></div>
      </div>}
      <div className="eng-issue-panel eng-reveal"><div className="eng-issue-intro"><span>THE CONFLICT CHECK</span><strong>{story.reviewDetails.issueCount}</strong><p>issue types across five groups</p></div><div className="eng-issue-list">{story.reviewDetails.issues.map((issue, index) => <div key={issue.name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{issue.name}</strong><span>{issue.disposition}</span></div>)}</div></div>
      <div className="eng-review-notes"><article className="eng-review-note eng-reveal"><span>SECURITY / WHAT I FOUND</span><h3>{story.reviewDetails.auditTitle}</h3><p>{story.reviewDetails.auditBody}</p></article><article className="eng-review-note eng-reveal"><span>PRODUCT / WHAT I LEFT SIMPLE</span><h3>{story.reviewDetails.limitTitle}</h3><p>{story.reviewDetails.limitBody}</p></article></div>
      <p className="eng-review-footnote eng-reveal">{story.reviewDetails.lockNote}</p>
    </section>}

    <section className="eng-outcome eng-section">
      <div className="eng-section-label eng-reveal"><span>{story.benchmark || story.reviewDetails ? '06' : '05'} / THE OUTCOME</span><span>{story.outcomeLabel}</span></div>
      <div className="eng-outcome-heading eng-reveal"><h2>{story.outcomeTitle}<br/><span>{story.outcomeAccent}</span></h2><p>{story.outcomeText}</p></div>
      <div className="eng-evidence eng-reveal">{story.evidence.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      {story.evidenceNote && <p className="eng-evidence-note eng-reveal">{story.evidenceNote}</p>}
      <div className="eng-stack eng-reveal"><span>TOOLS & CONCEPTS</span><div>{story.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
    </section>

    <footer className="story-next eng-next"><div className="story-section-label"><span>UP NEXT / {next.number}</span><span>KEEP EXPLORING</span></div><a href={`/case-studies/${next.slug}`} className="story-next-link"><div><p>{next.category}</p><h2>{next.name}<span>.</span></h2></div><span className="story-next-arrow" aria-hidden="true">↗</span></a><div className="story-footer"><a href="/#work">← All selected work</a><a href="mailto:lokeshdhakar1404@gmail.com">Let’s talk ↗</a></div></footer>
  </EngineeringReveal>;
}
