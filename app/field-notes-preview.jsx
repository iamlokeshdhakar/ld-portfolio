import data from '../lib/field-notes.json';
import { newestFirst } from '../lib/field-notes.mjs';

const fieldNotes = newestFirst(data.posts);

export default function FieldNotesPreview() {
  return <section className="notes-preview section-pad" id="notes">
    <div className="section-top reveal"><span>06 / FIELD NOTES</span><span>IDEAS IN PROGRESS</span></div>
    <div className="notes-preview-heading reveal"><div><p className="notes-eyebrow">THE WORK, AND THE THINKING BEHIND IT</p><h2>Thinking<br/><em>in public.</em></h2></div><div className="notes-preview-intro"><p>Notes on building products, working through hard problems, and everything I’m learning along the way.</p><a className="notes-link" href="/notes">Explore field notes <span aria-hidden="true">↗</span></a></div></div>
    <div className="notes-preview-bottom reveal">{fieldNotes.slice(0, 2).map((note) => <a className="notes-preview-item" href={`/notes/${note.slug}`} key={note.slug}><span>{note.number} / {note.topic}</span><strong>{note.title}</strong><span aria-hidden="true">↗</span></a>)}</div>
  </section>;
}
