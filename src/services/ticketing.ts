/**
 * Represents a ticket for a match.
 */
export interface Ticket {
  /**
   * The match for which the ticket is valid.
   */
  match: string;
  /**
   * The price of the ticket.
   */
  price: number;
  /**
   * The category of the ticket (e.g., VIP, Standard).
   */
  category: string;
  /**
   * URL to buy ticket.
   */
  buyUrl: string;
}

/**
 * Asynchronously retrieves information about available tickets.
 *
 * @returns A promise that resolves to an array of Ticket objects.
 */
export async function getTickets(): Promise<Ticket[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      match: 'Etoile vs. Esperance',
      price: 50.00,
      category: 'VIP',
      buyUrl: 'https://example.com/tickets/etoile-esperance-vip',
    },
    {
      match: 'Etoile vs. Club Africain',
      price: 25.00,
      category: 'Standard',
      buyUrl: 'https://example.com/tickets/etoile-club-africain-standard',
    },
  ];
}
