import { load } from 'cheerio';

const DAY_MS = 86_400_000;
const dayNumber = (date) => Date.parse(`${date}T00:00:00.000Z`);
const dateString = (value) => new Date(value).toISOString().slice(0, 10);

export function parseGithubCalendar(html) {
  const $ = load(html);
  const tooltips = new Map();
  $('tool-tip[for]').each((_, element) => {
    tooltips.set($(element).attr('for'), $(element).text().trim());
  });
  const entries = [];
  const seen = new Set();
  $('td[data-date][data-level]').each((_, element) => {
    const cell = $(element);
    const date = cell.attr('data-date');
    const level = Number(cell.attr('data-level'));
    const label = tooltips.get(cell.attr('id')) || '';
    const match = label.match(/^(?:No contributions|([\d,]+) contributions?)\b/i);
    const count = match ? (match[1] ? Number(match[1].replaceAll(',', '')) : 0) : NaN;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !Number.isFinite(dayNumber(date)) || dateString(dayNumber(date)) !== date || !Number.isInteger(level) || level < 0 || level > 4 || !Number.isSafeInteger(count) || count < 0 || seen.has(date)) {
      throw new Error('GitHub contribution calendar format changed');
    }
    seen.add(date);
    entries.push({ date, count, level });
  });
  if (!entries.length) throw new Error('GitHub contribution calendar is unavailable');
  return entries.sort((a, b) => a.date.localeCompare(b.date));
}

export function calculateStreaks(days, today) {
  const validDays = days.filter((day) => day.date <= today).slice().sort((a, b) => a.date.localeCompare(b.date));
  if (!validDays.length) return { current: 0, longest: 0, currentLimited: false };
  const byDate = new Map(validDays.map((day) => [day.date, day.count]));
  let longest = 0;
  let run = 0;
  let previous = null;
  for (const day of validDays) {
    const timestamp = dayNumber(day.date);
    if (day.count > 0) run = previous !== null && timestamp - previous === DAY_MS ? run + 1 : 1;
    else run = 0;
    longest = Math.max(longest, run);
    previous = timestamp;
  }
  let cursor = dayNumber(today);
  if (!(byDate.get(today) > 0)) cursor -= DAY_MS;
  let current = 0;
  while (byDate.get(dateString(cursor)) > 0) {
    current += 1;
    cursor -= DAY_MS;
  }
  return { current, longest, currentLimited: current > 0 && dateString(cursor + DAY_MS) === validDays[0].date };
}
