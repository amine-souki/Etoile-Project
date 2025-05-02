/**
 * Represents a news item from the club's official website.
 */
export interface NewsItem {
  /**
   * The title of the news item.
   */
  title: string;
  /**
   * A brief excerpt or summary of the news item.
   */
  excerpt: string;
  /**
   * URL of the news item.
   */
  link: string;
  /**
   * URL of the news item image.
   */
  imageUrl?: string;
  /**
   * The date of the news item.
   */
  date: Date;
}

/**
 * Asynchronously retrieves the latest news and announcements from the club's official website.
 *
 * @returns A promise that resolves to an array of NewsItem objects, sorted by date (most recent first).
 */
export async function getLatestNews(): Promise<NewsItem[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      title: 'Match Day!',
      excerpt: 'The team faces its rivals in a crucial match tonight.',
      link: 'https://example.com/news/match-day',
      imageUrl: 'https://example.com/images/match-day.jpg',
      date: new Date(),
    },
    {
      title: 'New Player Signed',
      excerpt: 'The club is excited to announce the signing of a new star player.',
      link: 'https://example.com/news/new-player',
      imageUrl: 'https://example.com/images/new-player.jpg',
      date: new Date(Date.now() - 86400000),
    },
  ];
}
