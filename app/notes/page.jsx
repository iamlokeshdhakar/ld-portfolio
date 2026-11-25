import NotesArchive from './notes-archive';
import { pageMetadata } from '../../lib/seo.mjs';

export const metadata = pageMetadata({
  title: 'Field Notes', path: '/notes',
  description: 'Thoughts on founding engineering, systems, and applied AI by Lokesh Dhakar.',
});

export default function NotesPage() {
  return <main className="notes-page">
    <header className="notes-header"><a href="/" className="brand" aria-label="Lokesh Dhakar, home">ld<span>.</span></a><a href="/" className="notes-back">← BACK TO PORTFOLIO</a><a className="notes-header-social" href="https://www.linkedin.com/in/iamlokeshdhakar/" target="_blank" rel="noreferrer">LINKEDIN ↗</a></header>
    <section className="notes-hero"><div className="notes-hero-top"><span>LOKESH DHAKAR / FIELD NOTES</span><span>THINKING OUT LOUD, ALWAYS</span></div><div className="notes-hero-content"><p>AN OPEN NOTEBOOK</p><h1>Ideas in<br/><em>motion.</em></h1><div className="notes-hero-foot"><p>Thoughts from the messy, interesting work of building things that matter.</p><span aria-hidden="true">✳</span></div></div><div className="notes-hero-bottom"><span>FOUNDING ENGINEERING &nbsp; / &nbsp; SYSTEMS &nbsp; / &nbsp; APPLIED AI</span><span>SCROLL TO EXPLORE ↓</span></div></section>
    <NotesArchive />
    <footer className="notes-footer"><div><span>THERE’S MORE TO THE CONVERSATION</span><h2>Let’s keep<br/><em>learning.</em></h2></div><div><p>Follow along for more thoughts on building, engineering, and what comes next.</p><a href="https://www.linkedin.com/in/iamlokeshdhakar/" target="_blank" rel="noreferrer">Find me on LinkedIn ↗</a><a href="/">Back to the portfolio ↗</a></div></footer>
  </main>;
}
