import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Player {
  name: string;
  number: number;
  age: number;
  imageUrl: string;
}

interface PlayerCardProps {
  player: Player;
  position: string;
  className?: string;
}

export default function PlayerCard({ player, position, className }: PlayerCardProps) {
  return (
    <Card className={cn("relative overflow-hidden rounded-lg shadow-md group w-full aspect-[3/4] hover:shadow-xl transition-shadow duration-300", className)}>
      <Image
        src={player.imageUrl}
        alt={player.name}
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint="football player portrait"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

      {/* Player Info Overlay */}
      <div className="absolute bottom-0 left-0 p-3 sm:p-4 z-20 text-white flex items-end gap-2 sm:gap-3">
        <span className="text-4xl sm:text-5xl font-bold text-white/80 leading-none">{player.number}</span>
        <div className="flex flex-col">
          <p className="text-base sm:text-lg font-semibold leading-tight">{player.name}</p>
          <p className="text-xs sm:text-sm text-white/70 leading-tight">{position}</p>
          {/* Optional: Add age or other details */}
          {/* <p className="text-xs text-white/60">Age: {player.age}</p> */}
        </div>
      </div>
    </Card>
  );
}
