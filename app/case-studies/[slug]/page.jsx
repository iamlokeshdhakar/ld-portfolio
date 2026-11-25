import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '../../../lib/case-studies.mjs';
import { ProjectVisual } from '../../portfolio-sections';
import AxyCaseStudy from '../../axy-case-study';
import { axyStories } from '../../../lib/axy-stories.mjs';
import { articleSchema, pageMetadata, serializeJsonLd } from '../../../lib/seo.mjs';

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return study ? pageMetadata({ title: `${study.name} Case Study`, description: study.intro, path: `/case-studies/${study.slug}`, type: 'article' }) : {};
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];
  const structuredData = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema({ title: study.name, description: study.intro, path: `/case-studies/${study.slug}`, type: 'CreativeWork' })) }} />;

  if (axyStories[slug]) return <>{structuredData}<AxyCaseStudy story={axyStories[slug]} next={next} /></>;

  return <main className={`story-page story-page--${study.color}`}>{structuredData}
    <header className="story-header"><a className="brand" href="/" aria-label="Lokesh Dhakar, home">ld<span>.</span></a><a href="/#work" className="story-back">← <span>Back to selected work</span></a><a className="story-contact" href="mailto:lokeshdhakar1404@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></header>
    <section className="story-hero">
      <div className="story-topline"><span>SELECTED WORK / {study.number}</span><span>{study.category}</span><span>CASE STUDY</span></div>
      <div className="story-heading"><p>{study.name}</p><h1>{study.title}<br/><span>{study.titleAccent}</span></h1><div className="story-hero-bottom"><p>{study.intro}</p><a href="#overview" className="story-scroll" aria-label="Scroll to the project overview">↓</a></div></div>
      <div className={`story-cover project-visual--${study.color}`}><ProjectVisual type={study.visual}/><span className="story-cover-caption">ILLUSTRATIVE PROJECT VISUAL / {study.number}</span></div>
    </section>
    <section id="overview" className="story-overview story-section">
      <div className="story-section-label"><span>01 / THE OVERVIEW</span><span>A CLOSER LOOK</span></div>
      <div className="story-overview-grid"><h2>Good work<br/><span>starts here.</span></h2><p>{study.overview}</p></div>
      <div className="story-facts">{study.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><p>{fact.value}</p></div>)}</div>
    </section>
    <section className="story-details story-section">
      <div className="story-section-label"><span>02 / INSIDE THE PROJECT</span><span>THE THINKING BEHIND THE WORK</span></div>
      <div className="story-details-heading"><h2>Considered<br/><span>at every step.</span></h2><p>A closer look at the work, the decisions, and the experience.</p></div>
      <div className="story-detail-list">{study.sections.map((section, index) => <article className="story-detail" key={section.label}><div className="story-detail-index"><span>0{index + 1}</span><span>{section.label}</span></div><div><h3>{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div>
    </section>
    <section className="story-toolkit story-section"><div className="story-section-label"><span>03 / THE TOOLKIT</span><span>MADE WITH INTENTION</span></div><div className="story-toolkit-grid"><h2>The pieces<br/><span>behind it.</span></h2><div><p>Technologies and tools used in this project.</p><div className="story-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{(study.live || study.code) && <div className="story-external">{study.live && <a href={study.live} target="_blank" rel="noreferrer">Visit live project ↗</a>}{study.code && <a href={study.code} target="_blank" rel="noreferrer">View source code ↗</a>}</div>}</div></div></section>
    <footer className="story-next"><div className="story-section-label"><span>UP NEXT / {next.number}</span><span>KEEP EXPLORING</span></div><a href={`/case-studies/${next.slug}`} className="story-next-link"><div><p>{next.category}</p><h2>{next.name}<span>.</span></h2></div><span className="story-next-arrow" aria-hidden="true">↗</span></a><div className="story-footer"><a href="/#work">← All selected work</a><a href="mailto:lokeshdhakar1404@gmail.com">Let’s talk ↗</a></div></footer>
  </main>;
}
