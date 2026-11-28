import { parseGithubCalendar, calculateStreaks } from '../../../lib/github-activity.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const headers = { 'User-Agent': 'lokesh-portfolio-github-activity', 'Accept-Language': 'en-US,en;q=0.9' };
const githubProfile = 'https://api.github.com/users/iamlokeshdhakar';
const githubCalendar = 'https://github.com/users/iamlokeshdhakar/contributions';

export async function GET() {
  try {
    const [calendarResult, profileResult] = await Promise.allSettled([
      fetch(githubCalendar, { headers, next: { revalidate: 3600 }, signal: AbortSignal.timeout(12000) }),
      fetch(githubProfile, { headers: { ...headers, Accept: 'application/vnd.github+json' }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(12000) }),
    ]);
    if (calendarResult.status !== 'fulfilled' || !calendarResult.value.ok) throw new Error('GitHub calendar unavailable');
    const today = new Date().toISOString().slice(0, 10);
    const days = parseGithubCalendar(await calendarResult.value.text()).filter((day) => day.date <= today);
    const yesterday = new Date(Date.parse(`${today}T00:00:00Z`) - 86400000).toISOString().slice(0, 10);
    if (days.length < 350 || days.length > 375 || days.at(-1).date < yesterday || days.some((day, index) => index > 0 && Date.parse(`${day.date}T00:00:00Z`) - Date.parse(`${days[index - 1].date}T00:00:00Z`) !== 86400000)) {
      throw new Error('GitHub calendar is incomplete or stale');
    }
    let publicRepositories = null;
    if (profileResult.status === 'fulfilled' && profileResult.value.ok) {
      try {
        const profile = await profileResult.value.json();
        if (profile.login?.toLowerCase() === 'iamlokeshdhakar' && Number.isSafeInteger(profile.public_repos) && profile.public_repos >= 0) publicRepositories = profile.public_repos;
      } catch {
        // The calendar remains useful even if GitHub's separate profile endpoint fails.
      }
    }
    const streaks = calculateStreaks(days, today);
    return Response.json({
      username: 'iamlokeshdhakar',
      days,
      total: days.reduce((sum, day) => sum + day.count, 0),
      currentStreak: streaks.current,
      currentStreakLimited: streaks.currentLimited,
      longestStreak: streaks.longest,
      publicRepositories,
      updatedAt: new Date().toISOString(),
    }, { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return Response.json({ error: 'GitHub activity is temporarily unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
