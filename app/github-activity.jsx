'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { buildCalendarWeeks, getMonthLabels } from '../lib/github-calendar.mjs';

const PROFILE_URL = 'https://github.com/iamlokeshdhakar';
const dateFormatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const formatDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00Z`));
const plural = (count, noun) => `${count.toLocaleString('en-US')} ${noun}${count === 1 ? '' : 's'}`;

function ContributionCalendar({ days }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollRef = useRef(null);
  const weeks = useMemo(() => buildCalendarWeeks(days), [days]);
  const dayIndexes = useMemo(() => new Map(days.map((day, index) => [day.date, index])), [days]);
  const active = days[activeIndex ?? days.length - 1];
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, []);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  const moveSelection = (event) => {
    const offsets = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    if (!(event.key in offsets) && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const current = activeIndex ?? days.length - 1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? days.length - 1 : current + offsets[event.key];
    const selected = Math.max(0, Math.min(days.length - 1, next));
    setActiveIndex(selected);
    window.requestAnimationFrame(() => {
      const container = scrollRef.current;
      const cell = container?.querySelector(`[data-day="${days[selected].date}"]`);
      if (!container || !cell) return;
      const bounds = container.getBoundingClientRect();
      const cellBounds = cell.getBoundingClientRect();
      if (cellBounds.left < bounds.left) container.scrollLeft -= bounds.left - cellBounds.left + 10;
      else if (cellBounds.right > bounds.right) container.scrollLeft += cellBounds.right - bounds.right + 10;
    });
  };

  return <div className="github-calendar-area">
    <div className="github-calendar-heading"><div><p>CONTRIBUTION CALENDAR</p><span>{formatDate(days[0].date)} — {formatDate(days.at(-1).date)}</span></div><div className="github-calendar-selection" aria-live="polite" aria-atomic="true"><strong>{plural(active.count, 'contribution')}</strong><span>{formatDate(active.date)}</span></div></div>
    <p id="github-calendar-help" className="github-calendar-help">Hover or tap a square to explore. Use arrow keys when the calendar is focused.</p>
    <div className="github-calendar-scroll" ref={scrollRef} data-lenis-prevent-horizontal>
      <div className="github-calendar-inner" style={{ '--github-weeks': weeks.length }}>
        <div className="github-months" aria-hidden="true">{monthLabels.map(({ weekIndex, label, month }) => <span key={month} style={{ '--week': weekIndex }}>{label}</span>)}</div>
        <div className="github-grid" role="group" aria-label="GitHub contribution calendar, Sunday through Saturday" aria-describedby="github-calendar-help" tabIndex={0} onKeyDown={moveSelection}>
          {weeks.flatMap((week, weekIndex) => week.map((day, weekday) => day ? <span key={day.date} data-day={day.date} className={`github-cell github-cell--${day.level} ${active.date === day.date ? 'is-selected' : ''}`} title={`${plural(day.count, 'contribution')} on ${formatDate(day.date)}`} aria-hidden="true" onMouseEnter={() => setActiveIndex(dayIndexes.get(day.date))} onClick={() => setActiveIndex(dayIndexes.get(day.date))}/> : <span className="github-cell-empty" aria-hidden="true" key={`empty-${weekIndex}-${weekday}`}/>))}
        </div>
      </div>
    </div>
    <div className="github-calendar-legend"><span>LESS</span><div aria-hidden="true">{[0,1,2,3,4].map((level) => <i key={level} className={`github-cell github-cell--${level}`}/>)}</div><span>MORE</span></div>
  </div>;
}

export default function GitHubActivity() {
  const [state, setState] = useState({ status: 'loading', data: null });
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/github', { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Activity unavailable'); return response.json(); })
      .then((data) => setState({ status: 'ready', data }))
      .catch((error) => { if (error.name !== 'AbortError') setState({ status: 'error', data: null }); });
    return () => controller.abort();
  }, []);
  const { data, status } = state;
  return <section className="github-section section-pad" id="github" data-header-theme="light">
    <div className="section-top reveal"><span>06 / IN THE OPEN</span><span>A LITTLE OF THE WORK BEHIND THE WORK</span></div>
    <div className="github-heading reveal"><div><p>GITHUB / @IAMLOKESHDHAKAR</p><h2>Always<br/><span>in progress.</span></h2></div><p>Building, learning, and sharing along the way. Here’s a glimpse of the work visible on GitHub.</p></div>
    <div className="github-dashboard reveal">
      <div className="github-dashboard-top"><div><span className="github-mark" aria-hidden="true">✳</span><div><p>GITHUB ACTIVITY</p><span>@iamlokeshdhakar</span></div></div><a href={PROFILE_URL} target="_blank" rel="noreferrer">View profile <span aria-hidden="true">↗</span></a></div>
      {status === 'ready' ? <>
        <div className="github-stats">
          <div><span>CONTRIBUTIONS</span><strong>{data.total.toLocaleString('en-US')}</strong><small>In the calendar below</small></div>
          <div><span>CURRENT STREAK</span><strong>{data.currentStreakLimited ? '≥' : ''}{data.currentStreak}<i> {data.currentStreak === 1 ? 'day' : 'days'}</i></strong><small>Active today or yesterday · UTC</small></div>
          <div><span>BEST STREAK</span><strong>{data.longestStreak}<i> {data.longestStreak === 1 ? 'day' : 'days'}</i></strong><small>Within the calendar below</small></div>
          <div><span>PUBLIC REPOSITORIES</span><strong>{data.publicRepositories === null ? '—' : data.publicRepositories.toLocaleString('en-US')}</strong><small>On GitHub</small></div>
        </div>
        <ContributionCalendar days={data.days}/>
        <div className="github-dashboard-foot"><span>Profile-visible contributions. Private work may not appear.</span><span>UPDATED {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(data.updatedAt)).toUpperCase()} · UTC</span></div>
      </> : status === 'loading' ? <div className="github-status" role="status"><span className="github-loader" aria-hidden="true"/>Loading GitHub activity…</div> : <div className="github-status github-status--error" role="status"><div><strong>Activity is taking a little break.</strong><p>GitHub’s contribution data is temporarily unavailable. You can still explore the profile directly.</p></div><a href={PROFILE_URL} target="_blank" rel="noreferrer">Visit GitHub ↗</a></div>}
    </div>
  </section>;
}
