import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCalendarWeeks, getMonthLabels } from '../lib/github-calendar.mjs';

test('aligns contribution dates with Sunday-first weeks across a month boundary', () => {
  const days = ['2026-01-30', '2026-01-31', '2026-02-01'].map((date) => ({ date, count: 1, level: 1 }));
  const weeks = buildCalendarWeeks(days);
  assert.equal(weeks.length, 2);
  assert.equal(weeks[0][0], null);
  assert.equal(weeks[0][5].date, '2026-01-30');
  assert.equal(weeks[0][6].date, '2026-01-31');
  assert.equal(weeks[1][0].date, '2026-02-01');
  assert.equal(weeks[1][6], null);
});

test('shows the full month instead of an overlapping partial first month', () => {
  const start = Date.parse('2025-11-23T00:00:00Z');
  const days = Array.from({length: 18}, (_, index) => ({date: new Date(start + index * 86400000).toISOString().slice(0, 10), count: 0, level: 0}));
  assert.deepEqual(getMonthLabels(buildCalendarWeeks(days)).map(({ label }) => label), ['Dec']);
});
