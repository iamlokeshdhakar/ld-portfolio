import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGithubCalendar, calculateStreaks } from '../lib/github-activity.mjs';

test('reads dates, levels, and exact contribution counts from the public calendar', () => {
  const html = `<table><tbody><tr>
    <td id="day-b" data-date="2026-01-02" data-level="3"></td><tool-tip for="day-b">1,234 contributions on January 2nd.</tool-tip>
    <td id="day-a" data-date="2026-01-01" data-level="0"></td><tool-tip for="day-a">No contributions on January 1st.</tool-tip>
    </tr></tbody></table>`;
  assert.deepEqual(parseGithubCalendar(html), [
    { date: '2026-01-01', count: 0, level: 0 },
    { date: '2026-01-02', count: 1234, level: 3 },
  ]);
});

test('rejects calendar entries when exact counts cannot be determined', () => {
  assert.throws(() => parseGithubCalendar('<td id="x" data-date="2026-01-01" data-level="2"></td>'), /calendar/i);
});

test('calculates current streak through yesterday and longest in the visible period', () => {
  const days = [1,1,1,0,1,1,0].map((count, index) => ({ date: `2026-01-0${index + 1}`, count }));
  assert.deepEqual(calculateStreaks(days, '2026-01-07'), { current: 2, longest: 3, currentLimited: false });
});

test('does not bridge missing dates or count contributions after today', () => {
  const days = [{date:'2026-01-01',count:1},{date:'2026-01-03',count:1},{date:'2026-01-04',count:1}];
  assert.deepEqual(calculateStreaks(days, '2026-01-03'), { current: 1, longest: 1, currentLimited: false });
  assert.deepEqual(calculateStreaks([{date:'2026-01-01',count:1},{date:'2026-01-02',count:1}], '2026-01-02'), { current: 2, longest: 2, currentLimited: true });
});
