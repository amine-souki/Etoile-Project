import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Image from 'next/image';
import FormBadge from './form-badge'; // Assuming FormBadge component exists
import { cn } from "@/lib/utils";

// Data extracted from the provided HTML
const leagueData = [
  { position: 1, logoUrl: 'https://media.api-sports.io/football/teams/980.png', teamName: 'ES Tunis', shortName: 'EST', points: 59, played: 27, wins: 17, draws: 8, losses: 2, goalsFor: 51, goalsAgainst: 22, goalDifference: 29, form: ['W', 'D', 'D', 'W', 'W'] },
  { position: 2, logoUrl: 'https://media.api-sports.io/football/teams/992.png', teamName: 'US Monastirienne', shortName: 'USMo', points: 59, played: 27, wins: 17, draws: 8, losses: 2, goalsFor: 41, goalsAgainst: 10, goalDifference: 31, form: ['D', 'W', 'W', 'W', 'W'] },
  { position: 3, logoUrl: 'https://media.api-sports.io/football/teams/990.png', teamName: 'ES Sahel', shortName: 'ESS', points: 57, played: 27, wins: 18, draws: 3, losses: 6, goalsFor: 42, goalsAgainst: 22, goalDifference: 20, form: ['L', 'W', 'W', 'W', 'W'] },
  { position: 4, logoUrl: 'https://media.api-sports.io/football/teams/988.png', teamName: 'Club Africain', shortName: 'CA', points: 55, played: 27, wins: 16, draws: 7, losses: 4, goalsFor: 36, goalsAgainst: 16, goalDifference: 20, form: ['W', 'D', 'W', 'W', 'L'] },
  { position: 5, logoUrl: 'https://media.api-sports.io/football/teams/989.png', teamName: 'ES Zarzis', shortName: 'ESZ', points: 50, played: 27, wins: 15, draws: 5, losses: 7, goalsFor: 33, goalsAgainst: 24, goalDifference: 9, form: ['W', 'W', 'L', 'L', 'W'] },
  { position: 6, logoUrl: 'https://media.api-sports.io/football/teams/991.png', teamName: 'Stade Tunisien', shortName: 'ST', points: 45, played: 27, wins: 12, draws: 9, losses: 6, goalsFor: 27, goalsAgainst: 19, goalDifference: 8, form: ['D', 'W', 'L', 'D', 'D'] },
  { position: 7, logoUrl: 'https://media.api-sports.io/football/teams/983.png', teamName: 'CS Sfaxien', shortName: 'CSS', points: 38, played: 27, wins: 9, draws: 11, losses: 7, goalsFor: 29, goalsAgainst: 18, goalDifference: 11, form: ['D', 'D', 'W', 'D', 'D'] },
  { position: 8, logoUrl: 'https://media.api-sports.io/football/teams/984.png', teamName: 'ES Metlaoui', shortName: 'ESM', points: 36, played: 27, wins: 9, draws: 9, losses: 9, goalsFor: 26, goalsAgainst: 25, goalDifference: 1, form: ['D', 'W', 'L', 'L', 'D'] },
  { position: 9, logoUrl: 'https://media.api-sports.io/football/teams/981.png', teamName: 'CA Bizertin', shortName: 'CAB', points: 29, played: 27, wins: 7, draws: 8, losses: 12, goalsFor: 25, goalsAgainst: 27, goalDifference: -2, form: ['L', 'W', 'L', 'W', 'L'] },
  { position: 10, logoUrl: 'https://media.api-sports.io/football/teams/10625.png', teamName: 'Olympique Béja', shortName: 'OB', points: 29, played: 27, wins: 7, draws: 8, losses: 12, goalsFor: 19, goalsAgainst: 27, goalDifference: -8, form: ['L', 'L', 'L', 'L', 'D'] },
  { position: 11, logoUrl: 'https://media.api-sports.io/football/teams/986.png', teamName: 'US Ben Guerdane', shortName: 'USBG', points: 26, played: 27, wins: 5, draws: 11, losses: 11, goalsFor: 23, goalsAgainst: 29, goalDifference: -6, form: ['D', 'D', 'W', 'L', 'W'] },
  { position: 12, logoUrl: 'https://media.api-sports.io/football/teams/987.png', teamName: 'AS Gabes', shortName: 'ASG', points: 23, played: 27, wins: 6, draws: 5, losses: 16, goalsFor: 19, goalsAgainst: 38, goalDifference: -19, form: ['L', 'L', 'L', 'W', 'L'] },
  { position: 13, logoUrl: 'https://media.api-sports.io/football/teams/6253.png', teamName: 'AS Soliman', shortName: 'ASS', points: 22, played: 27, wins: 5, draws: 7, losses: 15, goalsFor: 15, goalsAgainst: 41, goalDifference: -26, form: ['L', 'D', 'L', 'W', 'L'] },
  { position: 14, logoUrl: 'https://media.api-sports.io/football/teams/18284.png', teamName: 'JS Omrane', shortName: 'JSO', points: 22, played: 27, wins: 3, draws: 13, losses: 11, goalsFor: 22, goalsAgainst: 43, goalDifference: -21, form: ['D', 'L', 'D', 'L', 'L'] },
  { position: 15, logoUrl: 'https://media.api-sports.io/football/teams/10604.png', teamName: 'EGS Gafsa', shortName: 'EGSG', points: 21, played: 27, wins: 6, draws: 3, losses: 18, goalsFor: 22, goalsAgainst: 38, goalDifference: -16, form: ['L', 'W', 'L', 'W', 'L'] },
  { position: 16, logoUrl: 'https://media.api-sports.io/football/teams/1190.png', teamName: 'US Tataouine', shortName: 'UST', points: 18, played: 27, wins: 5, draws: 3, losses: 19, goalsFor: 17, goalsAgainst: 48, goalDifference: -31, form: ['L', 'D', 'W', 'L', 'L'] },
];

// Define Header styles - adjust as needed
const headerClass = "sticky top-[64px] bg-muted text-muted-foreground text-center py-2 px-1 text-xs md:py-3"; // Adjusted top value for header height

export default function LeagueTable() {
  return (
    <div className="lg:w-11/12 w-full max-w-11/12 bg-background flex flex-row mx-auto my-8 shadow-md rounded-lg overflow-hidden border">
      <div className="bg-primary w-2 "></div> {/* Left accent border */}
      <div className="flex-grow overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className={cn(headerClass, "w-[50px]")}>Pos</TableHead>
              <TableHead className={cn(headerClass, "text-left w-[200px]")}>Equipe</TableHead>
              <TableHead className={cn(headerClass, "w-[60px]")}>Pts</TableHead>
              <TableHead className={cn(headerClass, "w-[50px]")}>J.</TableHead>
              <TableHead className={cn(headerClass, "w-[50px]")}>G.</TableHead>
              <TableHead className={cn(headerClass, "w-[50px]")}>N.</TableHead>
              <TableHead className={cn(headerClass, "w-[50px]")}>P.</TableHead>
              <TableHead className={cn(headerClass, "hidden md:table-cell w-[50px]")}>BP</TableHead>
              <TableHead className={cn(headerClass, "hidden md:table-cell w-[50px]")}>BC</TableHead>
              <TableHead className={cn(headerClass, "w-[60px]")}>Diff.</TableHead>
              <TableHead className={cn(headerClass, "w-[120px]")}>Forme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Title Row (Optional, can be removed if not needed) */}
             <TableRow className="bg-accent/10 hover:bg-accent/20">
               <TableCell colSpan={11} className="text-accent-foreground font-semibold text-sm py-2 px-3">
                 Ligue 1 Professionnelle
               </TableCell>
             </TableRow>
            {leagueData.map((team) => (
              <TableRow key={team.position} className="border-b border-border/50 hover:bg-muted/50">
                <TableCell className="text-center font-bold text-foreground">{team.position}</TableCell>
                <TableCell className="text-left flex items-center gap-2 py-2">
                   {team.logoUrl && (
                    <Image
                       src={team.logoUrl}
                       alt={`${team.teamName} logo`}
                       width={24} // Reduced size for table
                       height={24} // Reduced size for table
                       className="object-contain"
                       data-ai-hint="football team logo"
                     />
                   )}
                   <span className="hidden lg:inline text-foreground text-sm">{team.teamName}</span>
                   <span className="lg:hidden text-foreground text-sm">{team.shortName}</span>
                </TableCell>
                <TableCell className="text-center font-bold text-foreground">{team.points}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.played}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.wins}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.draws}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.losses}</TableCell>
                <TableCell className="hidden md:table-cell text-center text-muted-foreground">{team.goalsFor}</TableCell>
                <TableCell className="hidden md:table-cell text-center text-muted-foreground">{team.goalsAgainst}</TableCell>
                <TableCell className={cn("text-center font-medium", team.goalDifference > 0 ? "text-green-600" : team.goalDifference < 0 ? "text-red-600" : "text-muted-foreground")}>
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                </TableCell>
                <TableCell className="text-center">
                   <div className="flex justify-center items-center gap-1">
                    {team.form.map((result, index) => (
                      <FormBadge key={index} result={result as 'W' | 'D' | 'L'} size="default" />
                    ))}
                  </div>
                   {/* Add mobile form view if needed */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-primary w-2"></div> {/* Right accent border */}
    </div>
  );
}
