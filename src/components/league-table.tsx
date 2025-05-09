import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Image from 'next/image';
import FormIndicator from './form-indicator';
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { getStandings, Standing, FormTrend } from '@/services/api-football'; // Import getStandings and types

// Header styles
const headerClass = "sticky top-0 bg-foreground text-background uppercase text-xs font-semibold text-center py-3 px-2 z-10";
const cellClass = "py-2 px-2 border-b border-gray-11 text-center text-sm";
const textCellClass = "text-left";
const teamCellClass = "flex items-center justify-start gap-2";

const getFormTrendIcon = (trend: FormTrend) => {
    if (!trend) return <Minus className="text-gray-500 h-4 w-4" />; // Default if trend is null
    switch (trend) {
        case 'up': return <ArrowUp className="text-green-500 h-4 w-4" />;
        case 'down': return <ArrowDown className="text-red-500 h-4 w-4" />;
        case 'same': return <Minus className="text-gray-500 h-4 w-4" />;
        default: return null;
    }
};

export default async function LeagueTable() {
  const leagueId = 202; // Tunisian Ligue Professionnelle 1
  const season = 2024; // Current season
  const standingsData: Standing[] = await getStandings(leagueId, season);

  if (!standingsData || standingsData.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Le classement n'est pas disponible pour le moment ou aucune donnée n'a été trouvée.
      </div>
    );
  }

  return (
    <div className="lg:w-11/12 w-full max-w-11/12 bg-white flex flex-row mx-auto shadow-lg rounded-md overflow-hidden border border-gray-11">
      <div className="bg-main w-2"></div>
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
            <TableRow className="border-y-gold border border-x-0 bg-white hover:bg-white">
               <TableCell colSpan={11} className="py-3 pl-3 text-left text-gold font-bold">{standingsData[0]?.group || 'Ligue 1'}</TableCell>
            </TableRow>
            {standingsData.map((standing) => (
              <TableRow
                key={standing.team.id}
                className={cn(
                    "border-0 hover:bg-muted/20",
                    standing.team.name.includes('Etoile Sahel') || standing.team.name.includes('Étoile Sportive du Sahel') ? 'bg-accent/20 hover:bg-accent hover:text-accent-foreground' : ''
                 )}
              >
                <TableCell className={cn(cellClass, "font-bold text-main")}>{standing.rank}</TableCell>
                <TableCell className={cn(cellClass, textCellClass, teamCellClass)}>
                   {standing.team.logo && (
                    <Image
                       src={standing.team.logo}
                       alt={`${standing.team.name} logo`}
                       width={24}
                       height={24}
                       className="object-contain"
                       data-ai-hint="football team logo"
                     />
                   )}
                   <span className="text-main">{standing.team.name}</span>
                </TableCell>
                <TableCell className={cn(cellClass, "font-bold text-main")}>{standing.points}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{standing.all.played}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{standing.all.win}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{standing.all.draw}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>{standing.all.lose}</TableCell>
                <TableCell className={cn(cellClass, "text-main hidden md:table-cell")}>{standing.all.goals.for}</TableCell>
                <TableCell className={cn(cellClass, "text-main hidden md:table-cell")}>{standing.all.goals.against}</TableCell>
                <TableCell className={cn(cellClass, "text-main")}>
                  {standing.goalsDiff > 0 ? `+${standing.goalsDiff}` : standing.goalsDiff}
                </TableCell>
                <TableCell className={cn(cellClass, "text-main")}>
                   <div className="flex justify-center items-center gap-1 sm:gap-2">
                     <div className="flex gap-0.5">
                        {standing.form.map((result, index) => (
                           <FormIndicator key={index} result={result} />
                        ))}
                     </div>
                      <div className="hidden md:flex items-center justify-center w-4">
                          {getFormTrendIcon(standing.formTrend)}
                      </div>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-primary w-2"></div>
    </div>
  );
}
