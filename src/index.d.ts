declare module 'forexfactory-scraper' {
  export type Event = {
    date: Date;
    time: string;
    currency: string;
    impact: string;
    event: string;
    actual: string | null;
    forecast: string | null;
    previous: string | null;
  };

  export default class Scraper {
    public scrapeCalendar(url?: string): Promise<Event[]>;
  }
}
