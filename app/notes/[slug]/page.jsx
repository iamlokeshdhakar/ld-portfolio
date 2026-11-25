import { notFound } from 'next/navigation';
import data from '../../../lib/field-notes.json';
import { newestFirst, getFieldNote, getCategory } from '../../../lib/field-notes.mjs';

const fieldNotes = newestFirst(data.posts);

export function generateStaticParams() { return fieldNotes.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = getFieldNote(fieldNotes, slug);
  return note ? { title: `${note.title} | Lokesh Dhakar`, description: note.description } : {};
}

function NoteVisual({ type }) {
  if (type === 'pipeline') return <figure className="note-visual note-pipeline"><figcaption>THE RETRIEVAL PIPELINE</figcaption><div>{['Query', 'Dense + sparse', 'RRF', 'Rerank', 'LLM'].map((step, index) => <span key={step}><b>{step}</b>{index < 4 && <i aria-hidden="true">→</i>}</span>)}</div></figure>;
  if (type === 'signals') return <figure className="note-visual note-signals"><figcaption>TWO COMPLEMENTARY SIGNALS</figcaption><div><section><span>01 / DENSE</span><strong>Meaning</strong><p>“make an API faster”<br/>↳ “reduce latency”</p></section><section><span>02 / SPARSE</span><strong>Exact terms</strong><p>Names, abbreviations,<br/>and technical language.</p></section></div></figure>;
  if (type === 'formula') return <figure className="note-visual note-formula"><figcaption>RECIPROCAL RANK FUSION</figcaption><div>RRF(d) = <span>Σ</span> 1 / (k + rank(d))</div><p>For each result list, add the reciprocal of the document’s rank plus k.</p></figure>;
  if (type === 'ranking') return <figure className="note-visual note-ranking"><figcaption>ONE QUERY / TWO RANKINGS</figcaption><div><section><span>DENSE</span><strong>A <i>→</i> B <i>→</i> C</strong></section><section><span>SPARSE</span><strong>C <i>→</i> A <i>→</i> D</strong></section><section><span>FUSED / k = 60</span><strong>A ≈ .0325<br/>C ≈ .0323</strong></section></div></figure>;
  if (type === 'metrics') return <figure className="note-visual note-metrics"><figcaption>THREE VIEWS OF RETRIEVAL QUALITY</figcaption><div><section><strong>Recall@k</strong><span>Relevant results retrieved</span></section><section><strong>NDCG@10</strong><span>Quality of the top ranking</span></section><section><strong>MRR</strong><span>Position of the first relevant result</span></section></div></figure>;
  const diagrams = {
    'vector-size': { title: '1 MILLION × 1,536 DIMENSIONS / RAW VALUES', items: [['FP32', '≈ 6.14 GB'], ['FP16', '≈ 3.07 GB'], ['PLUS', 'Indexes & overhead']] },
    dimensions: { title: 'RAW FP32 STORAGE PER VECTOR', items: [['512', '2 KiB'], ['1,024', '4 KiB'], ['1,536', '6 KiB']] },
    point: { title: 'ANATOMY OF A POINT', items: [['ID', 'Identifier'], ['VECTOR', 'Learned representation'], ['PAYLOAD', 'Metadata & filters']] },
    segments: { title: 'INSIDE A SHARD', items: [['SEGMENTS', 'Points & payloads'], ['INDEXES', 'Search structures'], ['OPTIMIZER', 'Merge & rebuild']] },
    memory: { title: 'A STORAGE TRADE-OFF', items: [['RAM', 'Fast access, limited capacity'], ['PAGE CACHE', 'Frequently accessed data'], ['DISK', 'More capacity, I/O on misses']] },
    hnsw: { title: 'A LAYERED SEARCH', items: [['UPPER LAYERS', 'Navigate broadly'], ['LOWER LAYERS', 'Explore nearby candidates'], ['RESULT', 'Approximate neighbors']] },
    shards: { title: 'THREE LEVELS', items: [['SHARD', 'A partition of data'], ['REPLICA', 'A copy of a shard'], ['SEGMENT', 'Storage within a shard']] },
    wal: { title: 'THE WRITE PATH', items: [['REQUEST', 'A write arrives'], ['WAL', 'Operation recorded'], ['SEGMENT', 'Update applied']] },
    quantization: { title: 'SMALLER REPRESENTATIONS', items: [['SCALAR', '8-bit values'], ['BINARY', 'Few bits per dimension'], ['TURBOQUANT', 'Rotation + compression']] },
    'search-flow': { title: 'A POSSIBLE QUERY PATH', items: [['EMBED', 'Represent the query'], ['PLAN & SEARCH', 'Filters, index or scan'], ['COMBINE', 'Return ranked results']] },
    'event-fanout': { title: 'FROM GRAPH CHANGE TO CONSUMERS', items: [['GRAPH', 'Publish an event'], ['SNS + SQS', 'Fan out to queues'], ['CONSUMERS', 'Search · vector · documents']] },
    'submission-states': { title: 'A REVIEWABLE LIFECYCLE', items: [['DRAFT', 'Prepare changes'], ['OPEN', 'Review or return to draft'], ['MERGED', 'Apply the approved submission']] },
    'backend-layers': { title: 'THREE RESPONSIBILITIES', items: [['CONTROLLER', 'Requests & responses'], ['SERVICE', 'Business rules'], ['REPOSITORY', 'Data access']] },
  };
  const diagram = diagrams[type];
  if (diagram) return <figure className="note-visual note-metrics note-concept"><figcaption>{diagram.title}</figcaption><div>{diagram.items.map(([label, detail]) => <section key={label}><strong>{label}</strong><span>{detail}</span></section>)}</div></figure>;
  return null;
}

export default async function FieldNotePage({ params }) {
  const { slug } = await params;
  const note = getFieldNote(fieldNotes, slug);
  if (!note) notFound();
  const index = fieldNotes.findIndex((item) => item.slug === slug);
  const next = fieldNotes[index + 1];
  const category = getCategory(data.categories, note.category);
  const isRetrieval = note.category === 'retrieval' || note.category === 'qdrant';
  const isGraph = note.slug === 'review-before-a-knowledge-graph-write' || note.slug === 'guarding-submission-state-transitions';
  return <main className="note-page">
    <header className="note-page-header"><a className="brand" href="/" aria-label="Lokesh Dhakar, home">ld<span>.</span></a><a href="/notes">← ALL FIELD NOTES</a><a href={isRetrieval ? '/case-studies/hybrid-retrieval' : isGraph ? '/case-studies/knowledge-graph' : '/#work'}>{isRetrieval || isGraph ? 'THE RELATED CASE STUDY' : 'SELECTED WORK'} ↗</a></header>
    <article><header className="note-page-hero"><div className="note-page-kicker"><span>FIELD NOTES / {note.number}</span><span>{note.topic} &nbsp; · &nbsp; {category.label}</span></div><h1>{note.title}</h1><p>{note.lead}</p><div className="note-page-byline"><span>WORDS BY LOKESH DHAKAR</span><span>NOTES FROM WORK &amp; LEARNING</span></div></header>
      <div className="note-page-body"><aside><span>{category.label}</span><strong>{category.title}</strong><p>Ideas from the work, shared as I learn.</p><a href="/notes#writing">Explore field notes ↗</a></aside><div className="note-page-content">{note.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.visual && <NoteVisual type={section.visual}/>}</section>)}<section className="note-sources"><h2>Continue the conversation</h2><ul><li><a href={note.sourceLinkedInUrl} target="_blank" rel="noreferrer">{note.sourceIsPlaceholder ? 'Find Lokesh on LinkedIn' : 'View the original LinkedIn post'} ↗</a></li></ul></section>{note.sources?.length > 0 && <section className="note-sources"><h2>Further reading</h2><ul>{note.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul></section>}</div></div>
    </article>
    <div className="note-next"><span>{next ? `KEEP READING / ${next.number}` : 'THE NOTEBOOK'}</span><a href={next ? `/notes/${next.slug}` : '/notes'}><span>{next ? next.title : 'Explore all field notes.'}</span><span aria-hidden="true">↗</span></a><p>{next ? 'Another note from the notebook.' : 'More ideas from the work.'}</p></div>
    <footer className="note-page-footer"><a href="/notes">← ALL FIELD NOTES</a><a href="https://www.linkedin.com/in/iamlokeshdhakar/" target="_blank" rel="noreferrer">FOLLOW ON LINKEDIN ↗</a></footer>
  </main>;
}
