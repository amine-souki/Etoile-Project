
'use client';

import { useState, useEffect } from 'react';
import type { Match } from '@/services/match-calendar';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin, Trophy } from 'lucide-react';
import { format, differenceInSeconds } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface NextMatchCountdownProps {
  nextMatch: Match;
  homeLogoUrl: string; // Accept resolved URL
  awayLogoUrl: string; // Accept resolved URL
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Helper function to calculate time left
const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const now = new Date();
  const difference = differenceInSeconds(targetDate, now);

  if (difference <= 0) {
    return null; // Match has started or passed
  }

  const days = Math.floor(difference / (60 * 60 * 24));
  const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((difference % (60 * 60)) / 60);
  const seconds = Math.floor(difference % 60);

  return { days, hours, minutes, seconds };
};

// Helper to format numbers with leading zeros
const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};


export default function NextMatchCountdown({ nextMatch, homeLogoUrl, awayLogoUrl }: NextMatchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calculateTimeLeft(nextMatch.dateTime));

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(nextMatch.dateTime));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [nextMatch.dateTime]);

  // Logo URLs are now received directly as props

  return (
    <div className="w-full max-w-4xl text-white flex flex-col items-center relative z-10 px-4">
       <p className="text-sm uppercase tracking-widest mb-4 font-semibold text-white/80">Prochain Match</p>

        {/* Competition Logo/Name */}
        <div className="flex items-center gap-2 mb-6 text-white/90">
            <Trophy className="h-5 w-5" />
            <span className="text-sm font-medium">{nextMatch.competition} {nextMatch.round && `- ${nextMatch.round}`}</span>
        </div>


      {/* Teams and Match Info Row */}
      <div className="flex items-center justify-between w-full mb-8 md:mb-12 gap-4 md:gap-8">
        {/* Home Team */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-end gap-3 md:gap-6 text-right">
          <span className="text-xl md:text-3xl font-bold order-2 md:order-1">{nextMatch.homeTeam}</span>
          <Image
            src={homeLogoUrl} // Use prop directly
            alt={`${nextMatch.homeTeam} logo`}
            width={60}
            height={60}
            className="object-contain order-1 md:order-2 w-12 h-12 md:w-16 md:h-16"
            data-ai-hint="football team logo"
          />
        </div>

        {/* Match Info */}
        <div className="flex-shrink-0 text-center">
           {/* Use the original time string directly */}
           <p className="text-3xl md:text-4xl font-bold mb-1">{nextMatch.time}</p>
           <p className="text-sm md:text-base font-medium capitalize">{format(nextMatch.dateTime, 'eee d MMM', { locale: fr })}</p>
           {nextMatch.stadium && (
             <p className="text-xs text-white/70 mt-1 flex items-center justify-center gap-1">
                 <MapPin className="h-3 w-3 inline" />
                 {nextMatch.stadium}
             </p>
            )}
        </div>

        {/* Away Team */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-start gap-3 md:gap-6 text-left">
          <Image
            src={awayLogoUrl} // Use prop directly
            alt={`${nextMatch.awayTeam} logo`}
            width={60}
            height={60}
            className="object-contain order-1 w-12 h-12 md:w-16 md:h-16"
            data-ai-hint="football team logo"
          />
          <span className="text-xl md:text-3xl font-bold order-2">{nextMatch.awayTeam}</span>
        </div>
      </div>

      {/* Countdown Timer */}
      {timeLeft && (
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-bold">{formatNumber(timeLeft.days)}</p>
            <p className="text-xs uppercase tracking-wider text-white/70">Jours</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-bold">{formatNumber(timeLeft.hours)}</p>
            <p className="text-xs uppercase tracking-wider text-white/70">Heures</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-bold">{formatNumber(timeLeft.minutes)}</p>
            <p className="text-xs uppercase tracking-wider text-white/70">Min</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-bold">{formatNumber(timeLeft.seconds)}</p>
            <p className="text-xs uppercase tracking-wider text-white/70">Sec</p>
          </div>
        </div>
      )}

      {/* Button */}
      <Button
        asChild
        variant="outline"
        size="lg"
        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 group"
      >
        <Link href="/calendrier">
          Voir Calendrier
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
