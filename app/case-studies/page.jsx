import { axyStories } from '../../lib/axy-stories.mjs';
import { getCaseStudy } from '../../lib/case-studies.mjs';
import { pageMetadata } from '../../lib/seo.mjs';

export const metadata = pageMetadata({
  title: 'Engineering Case Studies', path: '/case-studies',
  description: 'Explore engineering case studies on a scientific knowledge graph, hybrid RAG retrieval, and the Scope Seeker job search platform.',
});

export default function CaseStudies() {
  const scope = getCaseStudy('scope-seeker');
  return <main className="case-page">
    <header className="case-header"><a className="brand" href="/" aria-label="Lokesh Dhakar, home">ld<span>.</span></a><a className="case-back" href="/#work">← Back to selected work</a><a className="contact-button case-contact" href="mailto:lokeshdhakar1404@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></header>
    <section className="case-intro section-pad"><div className="section-top"><span>SELECTED WORK / A CLOSER LOOK</span><span>PRODUCT & ENGINEERING</span></div><h1>Behind<br/><span>the work.</span></h1><p>Three projects, from the decisions that shaped the work to the experiences they made possible.</p></section>
    <section className="eng-index section-pad" aria-label="Engineering case studies">{Object.entries(axyStories).map(([slug, story]) => <a id={slug === 'hybrid-retrieval' ? 'retrieval' : slug} className={`eng-index-card eng-index-card--${story.variant}`} href={`/case-studies/${slug}`} key={slug}><div className="eng-index-top"><span>{story.index} / {story.category}</span><span aria-hidden="true">↗</span></div><div><h2>{story.title}<br/><span>{story.titleAccent}</span></h2><p>{story.summary}</p><span className="eng-index-link">Explore the case study ↗</span></div></a>)}<a className="eng-index-card eng-index-card--scope" href={`/case-studies/${scope.slug}`}><div className="eng-index-top"><span>{scope.number} / {scope.category}</span><span aria-hidden="true">↗</span></div><div><h2>{scope.title}<br/><span>{scope.titleAccent}</span></h2><p>{scope.intro}</p><span className="eng-index-link">Explore the case study ↗</span></div></a></section>
    <footer className="case-footer section-pad"><p>HAVE SOMETHING IN MIND?</p><h2>Let’s build<br/><span>what’s next.</span></h2><div><a className="text-link" href="mailto:lokeshdhakar1404@gmail.com">Get in touch <span aria-hidden="true">↗</span></a><a className="text-link" href="/#work">Back to the portfolio <span aria-hidden="true">↗</span></a></div></footer>
  </main>;
}
