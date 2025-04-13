type Event = {
    date: Date;
    time: string;
    currency: string;
    impact: string;
    event: string;
    actual: string | null;
    forecast: string | null;
    previous: string | null;
};
export type { Event };
export declare class Scraper {
    scrapeCalendar(options?: {
        url?: string;
        proxyUrl?: string;
    }): Promise<Event[]>;
    private parse;
}
//# sourceMappingURL=index.d.ts.map