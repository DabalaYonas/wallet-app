// Season definitions: [month (0-indexed), day] for start of each season
// Spring: Mar 1, Summer: Jun 1, Autumn: Sep 1, Winter: Dec 1
const SEASON_STARTS: [number, number][] = [
  [2, 1],  // Spring: March 1
  [5, 1],  // Summer: June 1
  [8, 1],  // Autumn: September 1
  [11, 1], // Winter: December 1
];

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Find which season we're in
  let seasonStartMonth = SEASON_STARTS[0][0];
  let seasonStartDay = SEASON_STARTS[0][1];
  let seasonStartYear = year;

  for (let i = SEASON_STARTS.length - 1; i >= 0; i--) {
    const [sm, sd] = SEASON_STARTS[i];
    if (month > sm || (month === sm && day >= sd)) {
      seasonStartMonth = sm;
      seasonStartDay = sd;
      break;
    }
    // If no season found (e.g. Jan/Feb before March), use winter of previous year
    if (i === 0) {
      seasonStartMonth = SEASON_STARTS[3][0];
      seasonStartDay = SEASON_STARTS[3][1];
      seasonStartYear = year - 1;
    }
  }

  return new Date(seasonStartYear, seasonStartMonth, seasonStartDay);
}

export function getDayOfSeason(date: Date): number {
  const start = getSeasonStart(date);
  const msPerDay = 24 * 60 * 60 * 1000;
  // +1 because the first day of the season is day 1
  return Math.floor((date.getTime() - start.getTime()) / msPerDay) + 1;
}

export function calculateDailyPoints(date: Date): number {
  const n = getDayOfSeason(date);

  // Memoized calculation using fibonacci-like recurrence
  const memo: Record<number, number> = {};

  function points(day: number): number {
    if (day === 1) return 2;
    if (day === 2) return 3;
    if (memo[day] !== undefined) return memo[day];
    // Round the sum at each step to represent the actual integer points granted that day
    const result = Math.round(points(day - 2) + 0.6 * points(day - 1));
    memo[day] = result;
    return result;
  }

  return points(n);
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
}

export function formatTransactionDate(dateStr: string, now: Date): string {
  const date = new Date(dateStr);
  const msPerDay = 24 * 60 * 60 * 1000;

  // Normalize both to midnight
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDays = Math.round((nowMidnight.getTime() - dateMidnight.getTime()) / msPerDay);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 6) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
}
