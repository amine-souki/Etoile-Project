import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Image from 'next/image';
import FormIndicator from './form-indicator'; // Updated import
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'; // Import icons for form trend

// Data extracted from the previous code
const leagueData = [
  { position: 1, logoUrl: 'https://media.api-sports.io/football/teams/980.png', teamName: 'ES Tunis', shortName: 'EST', points: 59, played: 27, wins: 17, draws: 8, losses: 2, goalsFor: 51, goalsAgainst: 22, goalDifference: 29, form: ['W', 'D', 'D', 'W', 'W'] as const, formTrend: 'same' as const },
  { position: 2, logoUrl: 'https://media.api-sports.io/football/teams/992.png', teamName: 'US Monastirienne', shortName: 'USMo', points: 59, played: 27, wins: 17, draws: 8, losses: 2, goalsFor: 41, goalsAgainst: 10, goalDifference: 31, form: ['D', 'W', 'W', 'W', 'W'] as const, formTrend: 'same' as const },
  { position: 3, logoUrl: 'https://media.api-sports.io/football/teams/990.png', teamName: 'ES Sahel', shortName: 'ESS', points: 57, played: 27, wins: 18, draws: 3, losses: 6, goalsFor: 42, goalsAgainst: 22, goalDifference: 20, form: ['L', 'W', 'W', 'W', 'W'] as const, formTrend: 'up' as const },
  { position: 4, logoUrl: 'https://media.api-sports.io/football/teams/988.png', teamName: 'Club Africain', shortName: 'CA', points: 55, played: 27, wins: 16, draws: 7, losses: 4, goalsFor: 36, goalsAgainst: 16, goalDifference: 20, form: ['W', 'D', 'W', 'W', 'L'] as const, formTrend: 'down' as const },
  { position: 5, logoUrl: 'https://media.api-sports.io/football/teams/989.png', teamName: 'ES Zarzis', shortName: 'ESZ', points: 50, played: 27, wins: 15, draws: 5, losses: 7, goalsFor: 33, goalsAgainst: 24, goalDifference: 9, form: ['W', 'W', 'L', 'L', 'W'] as const, formTrend: 'same' as const },
  { position: 6, logoUrl: 'https://media.api-sports.io/football/teams/991.png', teamName: 'Stade Tunisien', shortName: 'ST', points: 45, played: 27, wins: 12, draws: 9, losses: 6, goalsFor: 27, goalsAgainst: 19, goalDifference: 8, form: ['D', 'W', 'L', 'D', 'D'] as const, formTrend: 'same' as const },
  { position: 7, logoUrl: 'https://media.api-sports.io/football/teams/983.png', teamName: 'CS Sfaxien', shortName: 'CSS', points: 38, played: 27, wins: 9, draws: 11, losses: 7, goalsFor: 29, goalsAgainst: 18, goalDifference: 11, form: ['D', 'D', 'W', 'D', 'D'] as const, formTrend: 'same' as const },
  { position: 8, logoUrl: 'https://media.api-sports.io/football/teams/984.png', teamName: 'ES Metlaoui', shortName: 'ESM', points: 36, played: 27, wins: 9, draws: 9, losses: 9, goalsFor: 26, goalsAgainst: 25, goalDifference: 1, form: ['D', 'W', 'L', 'L', 'D'] as const, formTrend: 'same' as const },
  { position: 9, logoUrl: 'https://media.api-sports.io/football/teams/981.png', teamName: 'CA Bizertin', shortName: 'CAB', points: 29, played: 27, wins: 7, draws: 8, losses: 12, goalsFor: 25, goalsAgainst: 27, goalDifference: -2, form: ['L', 'W', 'L', 'W', 'L'] as const, formTrend: 'same' as const },
  { position: 10, logoUrl: 'https://media.api-sports.io/football/teams/10625.png', teamName: 'Olympique Béja', shortName: 'OB', points: 29, played: 27, wins: 7, draws: 8, losses: 12, goalsFor: 19, goalsAgainst: 27, goalDifference: -8, form: ['L', 'L', 'L', 'L', 'D'] as const, formTrend: 'same' as const },
  { position: 11, logoUrl: 'https://media.api-sports.io/football/teams/986.png', teamName: 'US Ben Guerdane', shortName: 'USBG', points: 26, played: 27, wins: 5, draws: 11, losses: 11, goalsFor: 23, goalsAgainst: 29, goalDifference: -6, form: ['D', 'D', 'W', 'L', 'W'] as const, formTrend: 'same' as const },
  { position: 12, logoUrl: 'https://media.api-sports.io/football/teams/987.png', teamName: 'AS Gabes', shortName: 'ASG', points: 23, played: 27, wins: 6, draws: 5, losses: 16, goalsFor: 19, goalsAgainst: 38, goalDifference: -19, form: ['L', 'L', 'L', 'W', 'L'] as const, formTrend: 'same' as const },
  { position: 13, logoUrl: 'https://media.api-sports.io/football/teams/6253.png', teamName: 'AS Soliman', shortName: 'ASS', points: 22, played: 27, wins: 5, draws: 7, losses: 15, goalsFor: 15, goalsAgainst: 41, goalDifference: -26, form: ['L', 'D', 'L', 'W', 'L'] as const, formTrend: 'same' as const },
  { position: 14, logoUrl: 'https://media.api-sports.io/football/teams/18284.png', teamName: 'JS Omrane', shortName: 'JSO', points: 22, played: 27, wins: 3, draws: 13, losses: 11, goalsFor: 22, goalsAgainst: 43, goalDifference: -21, form: ['D', 'L', 'D', 'L', 'L'] as const, formTrend: 'same' as const },
  { position: 15, logoUrl: 'https://media.api-sports.io/football/teams/10604.png', teamName: 'EGS Gafsa', shortName: 'EGSG', points: 21, played: 27, wins: 6, draws: 3, losses: 18, goalsFor: 22, goalsAgainst: 38, goalDifference: -16, form: ['L', 'W', 'L', 'W', 'L'] as const, formTrend: 'same' as const },
  { position: 16, logoUrl: 'https://media.api-sports.io/football/teams/1190.png', teamName: 'US Tataouine', shortName: 'UST', points: 18, played: 27, wins: 5, draws: 3, losses: 19, goalsFor: 17, goalsAgainst: 48, goalDifference: -31, form: ['L', 'D', 'W', 'L', 'L'] as const, formTrend: 'same' as const },
];


// Header styles
const headerClass = "sticky top-0 bg-foreground text-background uppercase text-xs font-semibold text-center py-3 px-2 z-10";
const cellClass = "py-2 px-2 border-b border-gray-11 text-center text-sm"; // gray-11 for border
const textCellClass = "text-left";
const teamCellClass = "flex items-center justify-start gap-2"; // Align items to start

const getFormTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
        case 'up': return <ArrowUp className="text-green-500 h-4 w-4" />;
        case 'down': return <ArrowDown className="text-red-500 h-4 w-4" />;
        case 'same': return <Minus className="text-gray-500 h-4 w-4" />; // gray-500 for minus
        default: return null;
    }
};

export default function LeagueTable() {
  return (
    <div className="lg:w-11/12 w-full max-w-11/12 bg-white flex flex-row mx-auto shadow-lg rounded-md overflow-hidden border border-gray-11">
      <div className="bg-main w-2"></div> {/* Sidebar color, adjust if needed */}
      <div className="flex-1 overflow-x-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className={cn(headerClass, "w-12")}>Pos</TableHead>
              <TableHead className={cn(headerClass, "min-w-[180px] lg:min-w-[250px] text-left")}>Equipe</TableHead>
              <TableHead className={cn(headerClass)}>Pts</TableHead>
              <TableHead className={cn(headerClass)}>J.</TableHead>
              <TableHead className={cn(headerClass)}>G.</TableHead>
              <TableHead className={cn(headerClass)}>N.</TableHead>
              <TableHead className={cn(headerClass)}>P.</TableHead>
              <TableHead className={cn(headerClass, "hidden md:table-cell")}>BP</TableHead>
              <TableHead className={cn(headerClass, "hidden md:table-cell")}>BC</TableHead>
              <TableHead className={cn(headerClass)}>Diff.</TableHead>
              <TableHead className={cn(headerClass, "min-w-[120px]")}>Form.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Title Row - Spanning across columns */}
            <TableRow className="border-y-gold border border-x-0 bg-white hover:bg-white">
               <TableCell colSpan={11} className="py-3 pl-3 text-left text-gold font-bold">Ligue 1</TableCell>
            </TableRow>
            {leagueData.map((team) => (
              <TableRow
                key={team.position}
                className={cn(
                    "border-0 hover:bg-muted/20",
                    team.teamName === 'ES Sahel' && 'hover:bg-accent hover:text-accent-foreground' // Gold hover for ES Sahel
                 )}
              >
                <TableCell className={cn(cellClass, "font-bold text-main")}>{team.position}</TableCell>
                <TableCell className={cn(cellClass, textCellClass, teamCellClass)}>
                   {team.logoUrl && (
                    <Image
                       src={team.logoUrl}
                       alt={`${team.teamName} logo`}
                       width={24} // Slightly smaller logo
                       height={24}
                       className="object-contain"
                       data-ai-hint="football team logo"
                     />
                   )}
                   <span className="text-main lg:hidden">{team.shortName}</span>
                   <span className="text-main hidden lg:inline">{team.teamName}</span>
                </TableCell>
                <TableCell className={cn(cellClass, "font-bold text-main")}>{team.points}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{team.played}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{team.wins}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{team.draws}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{team.losses}</TableCell>
                <TableCell className={cn(cellClass, "text-main hidden md:table-cell")}>{team.goalsFor}</TableCell>
                <TableCell className={cn(cellClass, "text-main hidden md:table-cell")}>{team.goalsAgainst}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                </TableCell>
                <TableCell className={cn(cellClass, "text-main")}>
                   <div className="flex justify-center items-center gap-1 sm:gap-2">
                     {/* Simplified Form Indicators */}
                     <div className="flex gap-0.5">
                        {team.form.map((result, index) => (
                           <FormIndicator key={index} result={result} />
                        ))}
                     </div>
                      {/* Form Trend Icon */}
                      <div className="hidden md:flex items-center justify-center w-4">
                          {getFormTrendIcon(team.formTrend)}
                      </div>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-primary w-2"></div> {/* Sidebar color, adjust if needed */}
    </div>
  );
}
