// src/app/sections/football/classement/components/standings.tsx

import { getStandingsByLeague } from '@/services/api-football';
import LeagueTable from '@/components/league-table';

interface Standing {
    rank: number;
    team: {
        name: string;
        logo: string;
    };
    points: number;
    goalsDiff: number;
    all: {
        played: number;
        win: number;
        draw: number;
        lose: number;
    }
}

const Standings = async () => {
    const leagueId = 234;
    const data = await getStandingsByLeague(leagueId);
    if (data.response && data.response[0]?.league?.standings) {
        const standingsData: Standing[] = data.response[0].league.standings[0].map((item: any) => ({
            rank: item.rank,
            team: {
                name: item.team.name,
                logo: item.team.logo,
            },
            points: item.points,
            goalsDiff: item.goalsDiff,
            all: {
                played: item.all.played,
                win: item.all.win,
                draw: item.all.draw,
                lose: item.all.lose,
            }
        }));
        return <LeagueTable standings={standingsData} />;
    } else {
        return <div>Error loading standings data</div>;
    }
};

export default Standings;