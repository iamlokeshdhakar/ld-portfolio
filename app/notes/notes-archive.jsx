'use client';

import { useState } from 'react';
import data from '../../lib/field-notes.json';
import { newestFirst, getCategory } from '../../lib/field-notes.mjs';

const posts = newestFirst(data.posts);

export default function NotesArchive() {
  const [selected, setSelected] = useState('all');
  const category = getCategory(data.categories, selected);
  const visiblePosts = selected === 'all' ? posts : posts.filter((post) => post.category === selected);

  return <section className="notes-archive" id="writing"><div className="notes-archive-heading"><div><p>THE NOTEBOOK / 01</p><h2>From the<br/><em>desk.</em></h2></div><p>Observations, questions, and lessons from building in the real world.</p></div>
    <nav className="notes-series-nav" aria-label="Filter field notes by category"><button type="button" aria-pressed={selected === 'all'} onClick={() => setSelected('all')}>ALL NOTES</button>{data.categories.map((item) => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</button>)}</nav>
    <div className="notes-series-group"><div className="notes-series-intro"><div><span>{category?.label ?? 'THE NOTEBOOK'} / {visiblePosts.length} NOTES</span><h3>{category?.title ?? 'Ideas worth sharing.'}</h3></div><p>{category?.description ?? 'Notes on engineering, search, and the ideas I’m learning through the work.'}</p></div>
    <div className="notes-list">{visiblePosts.map((note) => <article className="note-entry curated-note" key={note.slug}><div className="note-entry-meta"><span>{note.number} / FIELD NOTE</span><span>{getCategory(data.categories, note.category)?.label} · {note.topic}</span></div><div className="note-entry-content"><h3><a href={`/notes/${note.slug}`}>{note.title}</a></h3><p className="note-excerpt">{note.description}</p><a className="note-read" href={`/notes/${note.slug}`}>Read the note <span aria-hidden="true">↗</span></a></div></article>)}</div></div>
  </section>;
}
