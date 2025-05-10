// src/services/api-football.ts
import axios from 'axios';
import type { FormResult, FormTrend } from '@/services/api-football'; // Keep existing imports if they don't conflict
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


export interface StandingTeam {
  id: number;
  name: string;
  logo: string;
}

export interface StandingGoals {
  for: number;
  against: number;
}

export interface StandingStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: StandingGoals;
}

// export type FormResult = 'W' | 'D' | 'L'; // Already defined
// export type FormTrend = 'up' | 'down' | 'same' | null; // Already defined

export interface Standing {
  rank: number;
  team: StandingTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: FormResult[];
  formTrend: FormTrend;
  description?: string | null;
  all: StandingStats;
}

// New Fixture related types
export interface FixtureTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface FixtureGoals {
  home: number | null;
  away: number | null;
}

export interface FixtureStatus {
  long: string;
  short: string; // e.g., 'FT', 'NS', 'HT'
  elapsed: number | null;
}

export interface FixtureLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  round: string;
}

export interface ApiFixture { // Raw fixture from API
  id: number;
  referee: string | null;
  timezone: string;
  date: string; // ISO string "2024-05-17T13:00:00+00:00"
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number | null;
    name: string | null;
    city: string | null;
  };
  status: FixtureStatus;
}

export interface Fixture {
  // Fields from ApiFixture
  id: number;
  referee: string | null;
  timezone: string;
  date: string; 
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number | null;
    name: string | null;
    city: string | null;
  };
  status: FixtureStatus; // Raw status object

  // Fields from other parts of API response
  league: FixtureLeague;
  teams: {
    home: FixtureTeam;
    away: FixtureTeam;
  };
  goals: FixtureGoals;
  score: {
    halftime: FixtureGoals;
    fulltime: FixtureGoals;
    extratime: FixtureGoals;
    penalty: FixtureGoals;
  };

  // Transformed fields for easier use in components
  dateTime: Date;
  competition: string; 
  homeTeam: string; 
  homeLogoUrl?: string; 
  awayTeam: string; 
  awayLogoUrl?: string;
  homeScore?: number | null;
  awayScore?: number | null;
  matchStatus: 'Scheduled' | 'Finished' | 'Live' | 'Postponed' | 'Cancelled' | 'Other';
  round?: string; 
  stadium?: string | null; 
  time: string; 
}


const API_KEY = process.env.FOOTBALL_API_KEY;
const API_HOST = process.env.FOOTBALL_API_HOST || 'api-football-v1.p.rapidapi.com';

export async function getStandings(leagueId: number, season: number): Promise<Standing[]> {
  if (!API_KEY) {
    console.error('FOOTBALL_API_KEY is not defined in environment variables.');
    return [];
  }

  const options = {
    method: 'GET',
    url: `https://${API_HOST}/v3/standings`,
    params: { season: String(season), league: String(leagueId) },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data && response.data.response && response.data.response.length > 0) {
      const standingsData = response.data.response[0]?.league?.standings?.[0];
      if (!standingsData) {
        console.warn('Standings data array not found or empty in API response for league:', leagueId, 'season:', season);
        return [];
      }
      
      return standingsData.map((item: any): Standing => {
        const formString = item.form || "";
        const formArray = formString.split('').map((char: string) => {
          if (char === 'W' || char === 'D' || char === 'L') {
            return char as FormResult;
          }
          return 'D'; 
        }).slice(-5) as FormResult[]; 

        let trend: FormTrend = null;
        if (item.status === 'same' || item.status === 'up' || item.status === 'down') {
            trend = item.status as FormTrend;
        }

        return {
          rank: item.rank,
          team: {
            id: item.team.id,
            name: item.team.name,
            logo: item.team.logo,
          },
          points: item.points,
          goalsDiff: item.goalsDiff,
          group: item.group,
          form: formArray,
          formTrend: trend,
          description: item.description,
          all: {
            played: item.all.played,
            win: item.all.win,
            draw: item.all.draw,
            lose: item.all.lose,
            goals: {
              for: item.all.goals.for,
              against: item.all.goals.against,
            },
          },
        };
      });
    } else {
      console.warn('No standings data in API response for league:', leagueId, 'season:', season);
      return [];
    }
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}

export async function getTeamCupFixtures(teamId: number, cupId: number, season: number): Promise<Fixture[]> {
  if (!API_KEY) {
    console.error('FOOTBALL_API_KEY is not defined in environment variables.');
    return [];
  }

  const options = {
    method: 'GET',
    url: `https://${API_HOST}/v3/fixtures`,
    // Get all fixtures for the cup and season, then filter client-side, or hope API filters by team in cup
    // The API seems to support team + league + season for fixtures directly.
    params: { team: String(teamId), league: String(cupId), season: String(season) },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data && response.data.response && response.data.response.length > 0) {
      return response.data.response.map((item: any): Fixture => {
        const rawDateTime = new Date(item.fixture.date);
        let matchStatus: Fixture['matchStatus'] = 'Scheduled';
        
        // Status mapping from https://www.api-football.com/documentation-v3#tag/Fixtures/operation/get-fixtures
        switch (item.fixture.status.short) {
          case 'TBD': // Time To Be Defined
          case 'NS': // Not Started
            matchStatus = 'Scheduled';
            break;
          case '1H': // First Half, Kick Off
          case 'HT': // Halftime
          case '2H': // Second Half, 2nd Half Started
          case 'ET': // Extra Time
          case 'BT': // Break Time (in Extra Time)
          case 'P':  // Penalty In Progress
          case 'INT': // Interrupted
            matchStatus = 'Live';
            break;
          case 'FT': // Match Finished
          case 'AET': // Match Finished After Extra Time
          case 'PEN': // Match Finished After Penalty
            matchStatus = 'Finished';
            break;
          case 'PST': // Match Postponed
            matchStatus = 'Postponed';
            break;
          case 'CANC': // Match Cancelled
            matchStatus = 'Cancelled';
            break;
          case 'ABD': // Match Abandoned
          case 'AWD': // Technical Loss
          case 'WO': // WalkOver
            matchStatus = 'Other'; // Or handle as Finished/Cancelled depending on needs
            break;
          default:
            matchStatus = 'Other';
        }

        return {
          // Spread raw data from API and then override/add transformed fields
          ...item.fixture,
          league: item.league,
          teams: item.teams,
          goals: item.goals,
          score: item.score,
          // Transformed for consistency
          dateTime: rawDateTime,
          competition: item.league.name,
          homeTeam: item.teams.home.name,
          homeLogoUrl: item.teams.home.logo,
          awayTeam: item.teams.away.name,
          awayLogoUrl: item.teams.away.logo,
          homeScore: item.goals.home,
          awayScore: item.goals.away,
          matchStatus: matchStatus,
          round: item.league.round,
          stadium: item.fixture.venue.name,
          time: format(rawDateTime, 'HH:mm', { locale: fr }),
        };
      }).sort((a: Fixture, b: Fixture) => a.dateTime.getTime() - b.dateTime.getTime()); // Sort by date
    } else {
      console.warn('No fixtures found in API response for team:', teamId, 'cup:', cupId, 'season:', season);
      return [];
    }
  } catch (error) {
    console.error('Error fetching team cup fixtures:', error);
    return [];
  }
}
