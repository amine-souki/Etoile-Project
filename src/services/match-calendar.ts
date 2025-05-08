import { parse, format as formatDate } from 'date-fns';
import type { Locale } from 'date-fns'; // Import Locale type

/**
 * Represents a match event.
 */
export interface Match {
  /** The competition the match belongs to (e.g., 'Ligue 1', 'Coupe de Tunisie'). */
  competition: string;
  /** The date and time of the match. */
  dateTime: Date;
  /** The name of the home team. */
  homeTeam: string;
  /** The URL of the home team's logo. */
  homeLogoUrl?: string;
  /** The name of the away team. */
  awayTeam: string;
  /** The URL of the away team's logo. */
  awayLogoUrl?: string;
  /** The score for the home team (or null if not played/available). */
  homeScore?: number | null;
  /** The score for the away team (or null if not played/available). */
  awayScore?: number | null;
  /** The status of the match (e.g., 'Scheduled', 'Finished'). */
  status: 'Scheduled' | 'Finished' | 'Live'; // Add more statuses if needed
  /** Optional: The round or matchday designation (e.g., 'Journée 34'). */
  round?: string;
  /** Optional: The name of the stadium or venue. */
  stadium?: string;
  /** Optional: Date object for simpler date extraction (derived from dateTime). */
  date: Date;
  /** Optional: Time string for simpler time extraction (derived from dateTime). */
  time: string;
}

/**
 * Parses date and time strings into Date objects.
 * Assumes format 'dd.MM. HH:mm' and current year.
 * @param dateStr - The date string (e.g., '04.05.')
 * @param timeStr - The time string (e.g., '15:00')
 * @returns A Date object.
 */
function parseDateTime(dateStr: string, timeStr: string): Date {
  const currentYear = new Date().getFullYear();
  // Add current year to the date string
  const fullDateStr = `${dateStr}${currentYear} ${timeStr}`;
  // Parse using the correct format
  try {
    // Using a base date ensures correct parsing even if the system date is different
    const baseDate = new Date(`${currentYear}-01-01T00:00:00`);
    return parse(fullDateStr, 'dd.MM.yyyy HH:mm', baseDate);
  } catch (e) {
    console.error(`Failed to parse date: ${fullDateStr}`, e);
    return new Date(); // Fallback to current date
  }
}

// Helper function to create Match objects consistently
const createMatch = (
    competition: string,
    round: string,
    dateStr: string,
    timeStr: string,
    homeTeam: string,
    awayTeam: string,
    stadium: string,
    homeScore: number | null = null,
    awayScore: number | null = null,
    status: 'Scheduled' | 'Finished' | 'Live' = 'Scheduled',
    homeLogoUrl?: string,
    awayLogoUrl?: string,
): Match => {
    const dt = parseDateTime(dateStr, timeStr);
    return {
        competition,
        round,
        dateTime: dt,
        date: dt, // Derive date from dateTime
        time: timeStr, // Keep original time string
        homeTeam,
        homeLogoUrl,
        awayTeam,
        awayLogoUrl,
        stadium,
        homeScore,
        awayScore,
        status,
    };
};


// Mock data - Filtered to include only the requested upcoming matches and added round/stadium
// Ensure dateTime is the source of truth for date/time.
const mockMatches: Match[] = [
  createMatch(
    'Ligue 1',
    'Journée 28',
    '04.05.', '15:00',
    'Etoile Sahel', 'Gafsa',
    'Stade Olympique de Sousse',
    1, // homeScore
    1, // awayScore
    'Finished', // status
    'https://media.api-sports.io/football/teams/990.png',
    'https://media.api-sports.io/football/teams/10604.png'
  ),
  createMatch(
    'Ligue 1',
    'Journée 29',
    '10.05.', '16:00',
    'Club Africain', 'Etoile Sahel',
    'Stade Hammadi Agrebi',
    null, null, 'Scheduled',
    'https://media.api-sports.io/football/teams/988.png',
    'https://media.api-sports.io/football/teams/990.png'
  ),
  createMatch(
    'Ligue 1',
    'Journée 30',
    '14.05.', '16:00',
    'Etoile Sahel', 'CS Sfaxien',
    'Stade Olympique de Sousse',
    null, null, 'Scheduled',
    'https://media.api-sports.io/football/teams/990.png',
    'https://media.api-sports.io/football/teams/983.png'
  ),
  createMatch(
    'Coupe de Tunisie',
    '8èmes de finale',
    '17.05.', '16:00',
    'Etoile Sahel', 'Stade Tunisien',
    'Stade Olympique de Sousse',
    null, null, 'Scheduled',
    'https://media.api-sports.io/football/teams/990.png',
    'https://media.api-sports.io/football/teams/991.png'
  ),
];

/**
 * Asynchronously retrieves the match calendar data.
 *
 * @param competitionFilter Optional filter for the competition.
 * @returns A promise that resolves to an array of Match objects, sorted by date.
 */
export async function getMatchCalendar(competitionFilter?: string): Promise<Match[]> {
  // TODO: Implement this by calling an API.

  let matches = mockMatches;

  if (competitionFilter) {
    matches = matches.filter(match => match.competition === competitionFilter);
  }

  // Ensure date and time are correctly populated from dateTime
  // This is now handled in createMatch, but keep as a safeguard if data comes from API
  matches.forEach(match => {
     if (!match.date || !match.time) {
       match.date = match.dateTime;
       match.time = formatDate(match.dateTime, 'HH:mm');
     }
  });


  // Sort matches by date
  return matches.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
}

// Helper function (already in your date-fns import)
// Using named import 'formatDate' to avoid conflict with variable 'format' if used elsewhere
// function format(date: Date, formatStr: string, options?: { locale?: Locale }): string {
//   return formatDate(date, formatStr, options);
// }

// Define Locale type if not already globally available (or import from date-fns)
// interface Locale { ... } // Kept for reference, assuming it's available via import
