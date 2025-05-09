// src/lib/trophy-images.ts
export const trophyImageMap: Record<string, string> = {
  // Football
  'Championnat de Tunisie': '/images/Tunisian League Trophy.png',
  'Coupe de Tunisie': '/images/Tunisian Cup Trophy.png',
  'Supercoupe de Tunisie': '/images/Tunisian Super Cup Trophy.png',
  'Ligue des Champions CAF': '/images/CAF Champions League Trophy.jpg',
  'Coupe de la Confédération CAF': '/images/CAF Confederation Cup Trophy.png',
  'Supercoupe de la CAF': '/images/CAF Super Cup Trophy.png',
  "Coupe d'Afrique des Vainqueurs": '/images/African Cup Winners Cup Trophy.png',

  // Handball
  'Championnat de Tunisie Handball': '/images/Tunisian Handball League Trophy.png',
  'Coupe de Tunisie Handball': '/images/Tunisian Handball Cup Trophy.png',

  // Basketball
  'Championnat de Tunisie Basketball': '/images/Tunisian Basketball League Trophy.png',
  'Coupe de Tunisie Basketball': '/images/Tunisian Basketball Cup Trophy.png',

  // Volleyball
  'Championnat de Tunisie Volleyball': '/images/Tunisian Volleyball League Trophy.png',
  // Add more mappings if Volleyball Cup trophy image exists
  // e.g. 'Coupe de Tunisie Volleyball': '/images/Tunisian Volleyball Cup Trophy.png',
};

export const getTrophyImage = (trophyName: string): string | undefined => {
  return trophyImageMap[trophyName];
};
