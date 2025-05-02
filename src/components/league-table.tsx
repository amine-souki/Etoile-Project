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

// Data extracted from the previous code
const leagueData = [
  { position: 1, logoUrl: 'https://media.api-sports.io/football/teams/980.png', teamName: 'ES Tunis', shortName: 'EST', points: 59, played: 27, wins: 17, draws: 8, losses: 2, goalsFor: 51, goalsAgainst: 22, goalDifference: 29, form: ['W', 'D', 'D', 'W', 'W'] as const },
  { position: 2, logoUrl: 'https://media.api-sports.io/football/teams/992.png', teamName: 'US Monastirienne', shortName: 'USMo', points: 59, played: 27, wins: 17, draws: 8, losses: 2, goalsFor: 41, goalsAgainst: 10, goalDifference: 31, form: ['D', 'W', 'W', 'W', 'W'] as const },
  { position: 3, logoUrl: 'https://media.api-sports.io/football/teams/990.png', teamName: 'ES Sahel', shortName: 'ESS', points: 57, played: 27, wins: 18, draws: 3, losses: 6, goalsFor: 42, goalsAgainst: 22, goalDifference: 20, form: ['L', 'W', 'W', 'W', 'W'] as const },
  { position: 4, logoUrl: 'https://media.api-sports.io/football/teams/988.png', teamName: 'Club Africain', shortName: 'CA', points: 55, played: 27, wins: 16, draws: 7, losses: 4, goalsFor: 36, goalsAgainst: 16, goalDifference: 20, form: ['W', 'D', 'W', 'W', 'L'] as const },
  { position: 5, logoUrl: 'https://media.api-sports.io/football/teams/989.png', teamName: 'ES Zarzis', shortName: 'ESZ', points: 50, played: 27, wins: 15, draws: 5, losses: 7, goalsFor: 33, goalsAgainst: 24, goalDifference: 9, form: ['W', 'W', 'L', 'L', 'W'] as const },
  { position: 6, logoUrl: 'https://media.api-sports.io/football/teams/991.png', teamName: 'Stade Tunisien', shortName: 'ST', points: 45, played: 27, wins: 12, draws: 9, losses: 6, goalsFor: 27, goalsAgainst: 19, goalDifference: 8, form: ['D', 'W', 'L', 'D', 'D'] as const },
  { position: 7, logoUrl: 'https://media.api-sports.io/football/teams/983.png', teamName: 'CS Sfaxien', shortName: 'CSS', points: 38, played: 27, wins: 9, draws: 11, losses: 7, goalsFor: 29, goalsAgainst: 18, goalDifference: 11, form: ['D', 'D', 'W', 'D', 'D'] as const },
  { position: 8, logoUrl: 'https://media.api-sports.io/football/teams/984.png', teamName: 'ES Metlaoui', shortName: 'ESM', points: 36, played: 27, wins: 9, draws: 9, losses: 9, goalsFor: 26, goalsAgainst: 25, goalDifference: 1, form: ['D', 'W', 'L', 'L', 'D'] as const },
  { position: 9, logoUrl: 'https://media.api-sports.io/football/teams/981.png', teamName: 'CA Bizertin', shortName: 'CAB', points: 29, played: 27, wins: 7, draws: 8, losses: 12, goalsFor: 25, goalsAgainst: 27, goalDifference: -2, form: ['L', 'W', 'L', 'W', 'L'] as const },
  { position: 10, logoUrl: 'https://media.api-sports.io/football/teams/10625.png', teamName: 'Olympique Béja', shortName: 'OB', points: 29, played: 27, wins: 7, draws: 8, losses: 12, goalsFor: 19, goalsAgainst: 27, goalDifference: -8, form: ['L', 'L', 'L', 'L', 'D'] as const },
  { position: 11, logoUrl: 'https://media.api-sports.io/football/teams/986.png', teamName: 'US Ben Guerdane', shortName: 'USBG', points: 26, played: 27, wins: 5, draws: 11, losses: 11, goalsFor: 23, goalsAgainst: 29, goalDifference: -6, form: ['D', 'D', 'W', 'L', 'W'] as const },
  { position: 12, logoUrl: 'https://media.api-sports.io/football/teams/987.png', teamName: 'AS Gabes', shortName: 'ASG', points: 23, played: 27, wins: 6, draws: 5, losses: 16, goalsFor: 19, goalsAgainst: 38, goalDifference: -19, form: ['L', 'L', 'L', 'W', 'L'] as const },
  { position: 13, logoUrl: 'https://media.api-sports.io/football/teams/6253.png', teamName: 'AS Soliman', shortName: 'ASS', points: 22, played: 27, wins: 5, draws: 7, losses: 15, goalsFor: 15, goalsAgainst: 41, goalDifference: -26, form: ['L', 'D', 'L', 'W', 'L'] as const },
  { position: 14, logoUrl: 'https://media.api-sports.io/football/teams/18284.png', teamName: 'JS Omrane', shortName: 'JSO', points: 22, played: 27, wins: 3, draws: 13, losses: 11, goalsFor: 22, goalsAgainst: 43, goalDifference: -21, form: ['D', 'L', 'D', 'L', 'L'] as const },
  { position: 15, logoUrl: 'https://media.api-sports.io/football/teams/10604.png', teamName: 'EGS Gafsa', shortName: 'EGSG', points: 21, played: 27, wins: 6, draws: 3, losses: 18, goalsFor: 22, goalsAgainst: 38, goalDifference: -16, form: ['L', 'W', 'L', 'W', 'L'] as const },
  { position: 16, logoUrl: 'https://media.api-sports.io/football/teams/1190.png', teamName: 'US Tataouine', shortName: 'UST', points: 18, played: 27, wins: 5, draws: 3, losses: 19, goalsFor: 17, goalsAgainst: 48, goalDifference: -31, form: ['L', 'D', 'W', 'L', 'L'] as const },
];

// Define Header styles - adjust as needed
const headerClass = "uppercase text-xs font-semibold text-muted-foreground h-10 py-2 px-3 border-b"; // Removed sticky and bg color
const cellClass = "py-2 px-3 border-b border-dotted";
const highlightedRowClass = "bg-primary text-primary-foreground";


export default function LeagueTable() {
  return (
    <div className="overflow-x-auto">
        <Table className="min-w-full w-full border-collapse bg-background shadow-md rounded-lg">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className={cn(headerClass, "text-left w-[50px]")}> </TableHead> {/* Position */}
              <TableHead className={cn(headerClass, "text-left w-[250px]")}>Team</TableHead>
              <TableHead className={cn(headerClass, "text-center w-[50px]")}>P</TableHead>
              <TableHead className={cn(headerClass, "text-center w-[50px]")}>W</TableHead>
              <TableHead className={cn(headerClass, "text-center w-[50px]")}>D</TableHead>
              <TableHead className={cn(headerClass, "text-center w-[50px]")}>L</TableHead>
              <TableHead className={cn(headerClass, "text-center w-[50px]")}>GD</TableHead>
              <TableHead className={cn(headerClass, "text-center font-bold w-[60px]")}>PTS</TableHead>
              <TableHead className={cn(headerClass, "text-center w-[150px]")}>Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagueData.map((team) => (
              <TableRow key={team.position} className={cn(team.teamName === 'ES Sahel' ? highlightedRowClass : 'hover:bg-muted/20', "border-0")}>
                 {/* Remove dotted border for highlighted row */}
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm font-medium text-muted-foreground w-[50px]")}>{team.position}</TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-left flex items-center gap-2 py-2 w-[250px]")}>
                   {team.logoUrl && (
                    <Image
                       src={team.logoUrl}
                       alt={`${team.teamName} logo`}
                       width={20} // Adjusted size
                       height={20} // Adjusted size
                       className="object-contain"
                       data-ai-hint="football team logo"
                     />
                   )}
                   <span className={cn("text-sm font-medium", team.teamName === 'ES Sahel' ? 'text-primary-foreground' : 'text-foreground')}>{team.teamName}</span>
                </TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm text-muted-foreground w-[50px]")}>{team.played}</TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm text-muted-foreground w-[50px]")}>{team.wins}</TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm text-muted-foreground w-[50px]")}>{team.draws}</TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm text-muted-foreground w-[50px]")}>{team.losses}</TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm text-muted-foreground w-[50px]")}>
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                </TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center text-sm font-bold w-[60px]", team.teamName === 'ES Sahel' ? 'text-primary-foreground' : 'text-foreground')}>
                    {team.points}
                </TableCell>
                <TableCell className={cn(cellClass, team.teamName === 'ES Sahel' ? 'border-transparent' : 'border-b-border/50 border-dotted', "text-center w-[150px]")}>
                   <div className="flex justify-center items-center gap-1">
                    {team.form.map((result, index) => (
                      <FormIndicator key={index} result={result} />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
}
