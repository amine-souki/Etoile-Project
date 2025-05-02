/**
 * Represents a match event.
 */
export interface Match {
  /**
   * The date of the match.
   */
  date: Date;
  /**
   * The time of the match.
   */
  time: string;
  /**
   * The opponent team.
   */
  opponent: string;
  /**
   * The score of the match (if finished).
   */
  score?: string;
  /**
   * The stadium where the match is played.
   */
  stadium: string;
  /**
   * The competition the match belongs to.
   */
  competition: string;
}

/**
 * Asynchronously retrieves the match calendar data.
 *
 * @param competition Optional filter for the competition.
 * @returns A promise that resolves to an array of Match objects.
 */
export async function getMatchCalendar(competition?: string): Promise<Match[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      date: new Date(Date.now() + 86400000),
      time: '20:00',
      opponent: 'Esperance',
      stadium: 'Stade Olympique de Radès',
      competition: 'League 1',
    },
    {
      date: new Date(Date.now() - 86400000),
      time: '18:00',
      opponent: 'Club Africain',
      score: '2-1',
      stadium: 'Stade de Rades',
      competition: 'League 1',
    },
  ];
}
