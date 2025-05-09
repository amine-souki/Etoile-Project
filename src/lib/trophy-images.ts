// src/lib/trophy-images.ts
export const trophyImageMap: Record<string, string> = {
  // Football
  'Championnat de Tunisie': '/images/Championnat-de-Tunisie.jpg',
  'Coupe de Tunisie': '/images/Coupe-de-Tunisie.jpg',
  'Supercoupe de Tunisie': '/images/Supercoupe-de-Tunisie.jpg',
  'Ligue des Champions CAF': '/images/Ligue-des-Champions-CAF.jpg',
  'Coupe de la Confédération CAF': '/images/Coupe-de-la-Confédération-CAF.jpg',
  'Supercoupe de la CAF': '/images/Supercoupe-de-la-CAF.jpg',
  "Coupe d'Afrique des Vainqueurs": "/images/Coupe-d_Afrique-des-Vainqueurs.jpg",

  // Handball
  'Championnat de Tunisie Handball': '/images/Tunisian Handball League Trophy.png', // Placeholder, update if actual image exists
  'Coupe de Tunisie Handball': '/images/Tunisian Handball Cup Trophy.png', // Placeholder, update if actual image exists

  // Basketball
  'Championnat de Tunisie Basketball': '/images/Tunisian Basketball League Trophy.png', // Placeholder, update if actual image exists
  'Coupe de Tunisie Basketball': '/images/Tunisian Basketball Cup Trophy.png', // Placeholder, update if actual image exists

  // Volleyball
  'Championnat de Tunisie Volleyball': '/images/Tunisian Volleyball League Trophy.png', // Placeholder, update if actual image exists
  // Add more mappings if Volleyball Cup trophy image exists
  // e.g. 'Coupe de Tunisie Volleyball': '/images/Tunisian Volleyball Cup Trophy.png',
};

export const getTrophyImage = (trophyName: string): string | undefined => {
  return trophyImageMap[trophyName];
};
