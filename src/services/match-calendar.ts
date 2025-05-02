import { parse } from 'date-fns';

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
    return parse(fullDateStr, 'dd.MM.yyyy HH:mm', new Date());
  } catch (e) {
    console.error(`Failed to parse date: ${fullDateStr}`, e);
    return new Date(); // Fallback to current date
  }
}


// Mock data based on the provided image
const mockMatches: Match[] = [
  {
    competition: 'Ligue 1',
    dateTime: parseDateTime('04.05.', '15:00'),
    homeTeam: 'Etoile Sahel',
    homeLogoUrl: 'https://media.api-sports.io/football/teams/990.png',
    awayTeam: 'Gafsa', // Assuming EGS Gafsa
    awayLogoUrl: 'https://media.api-sports.io/football/teams/10604.png',
    homeScore: null, // Not played
    awayScore: null, // Not played
    status: 'Scheduled',
  },
  {
    competition: 'Ligue 1',
    dateTime: parseDateTime('10.05.', '16:00'),
    homeTeam: 'Club Africain',
    homeLogoUrl: 'https://media.api-sports.io/football/teams/988.png',
    awayTeam: 'Etoile Sahel',
    awayLogoUrl: 'https://media.api-sports.io/football/teams/990.png',
    homeScore: null, // Not played
    awayScore: null, // Not played
    status: 'Scheduled',
  },
  {
    competition: 'Ligue 1',
    dateTime: parseDateTime('14.05.', '16:00'),
    homeTeam: 'Etoile Sahel',
    homeLogoUrl: 'https://media.api-sports.io/football/teams/990.png',
    awayTeam: 'CS Sfaxien',
    awayLogoUrl: 'https://media.api-sports.io/football/teams/983.png',
    homeScore: null, // Not played
    awayScore: null, // Not played
    status: 'Scheduled',
  },
  {
    competition: 'Coupe de Tunisie',
    dateTime: parseDateTime('17.05.', '16:00'),
    homeTeam: 'Etoile Sahel',
    homeLogoUrl: 'https://media.api-sports.io/football/teams/990.png',
    awayTeam: 'Stade Tunisien',
    awayLogoUrl: 'https://media.api-sports.io/football/teams/991.png',
    homeScore: null, // Not played
    awayScore: null, // Not played
    status: 'Scheduled',
  },
   // Adding past matches from previous mock data for completeness
   {
    competition: 'Ligue 1',
    dateTime: new Date(Date.now() - 86400000 * 5), // Example past date
    homeTeam: 'Etoile Sahel',
    homeLogoUrl: 'https://media.api-sports.io/football/teams/990.png',
    awayTeam: 'US Monastir',
    awayLogoUrl: 'https://media.api-sports.io/football/teams/992.png',
    homeScore: 1,
    awayScore: 1,
    status: 'Finished',
  },
   {
    competition: 'Ligue 1',
    dateTime: new Date(Date.now() - 86400000 * 10), // Example past date
    homeTeam: 'ES Tunis',
    homeLogoUrl: 'https://media.api-sports.io/football/teams/980.png',
    awayTeam: 'Etoile Sahel',
    awayLogoUrl: 'https://media.api-sports.io/football/teams/990.png',
    homeScore: 2,
    awayScore: 0,
    status: 'Finished',
  }
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

  // Sort matches by date
  return matches.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
}
