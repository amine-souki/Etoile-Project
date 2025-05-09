// src/services/api-football.ts
import axios from 'axios';

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

export type FormResult = 'W' | 'D' | 'L';
export type FormTrend = 'up' | 'down' | 'same' | null;

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

const API_KEY = process.env.FOOTBALL_API_KEY;
const API_HOST = process.env.FOOTBALL_API_HOST || 'api-football-v1.p.rapidapi.com';

export async function getStandings(leagueId: number, season: number): Promise<Standing[]> {
  if (!API_KEY) {
    console.error('FOOTBALL_API_KEY is not defined in environment variables.');
    // Fallback to empty array or throw error, based on desired behavior
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
        console.error('Standings data not found in API response:', response.data);
        return [];
      }
      
      return standingsData.map((item: any): Standing => {
        const formString = item.form || "";
        const formArray = formString.split('').map((char: string) => {
          if (char === 'W' || char === 'D' || char === 'L') {
            return char as FormResult;
          }
          return 'D'; // Default to Draw for unknown characters
        }).slice(0, 5) as FormResult[]; // Ensure only last 5 results

        // API 'status' field can be 'same', 'up', 'down' which relates to rank change
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
      console.error('No standings found in API response for league:', leagueId, 'season:', season, 'Response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching standings:', error);
    return []; // Return empty array or re-throw error
  }
}
