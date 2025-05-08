const API_KEY = process.env.API_FOOTBALL_KEY;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

const getLeagues = async () => {
  const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues', options);
  const data = await response.json();
  return data;
};

const getTeamsByLeague = async (leagueId: number) => {
  const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${leagueId}&season=2023`, options);
  const data = await response.json();
  return data;
};

const getStandingsByLeague = async (leagueId: number) => {
  const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueId}&season=2023`, options);
  const data = await response.json();
  return data;
};

export { getLeagues, getTeamsByLeague, getStandingsByLeague };