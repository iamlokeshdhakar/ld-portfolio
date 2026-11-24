export function buildCalendarWeeks(days) {
  if (!days.length) return [];
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(firstWeekday).fill(null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7));
  return weeks;
}

export function getMonthLabels(weeks) {
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const labels = [];
  let previousMonth = '';
  weeks.forEach((week, weekIndex) => {
    for (const day of week) {
      if (!day) continue;
      const month = day.date.slice(0, 7);
      if (month === previousMonth) continue;
      previousMonth = month;
      const label = { weekIndex, label: names[Number(month.slice(5, 7)) - 1], month };
      const last = labels.at(-1);
      if (!last || weekIndex - last.weekIndex >= 3) labels.push(label);
      else if (labels.length === 1 && last.weekIndex === 0) labels[0] = label;
    }
  });
  return labels;
}
