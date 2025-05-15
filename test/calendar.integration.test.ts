import { describe, it, expect } from "vitest";
import { Scraper } from "../src/index.ts";
import expectedEvents from "./expectedEvents.json"; // or paste the array directly

describe("forexfactory-scraper", () => {
  it("should fetch and parse events exactly as expected", async () => {
    const scraper = new Scraper();
    const events = await scraper.scrapeCalendar({
      url: "https://www.forexfactory.com/calendar?day=feb5.2025",
    });

    // Convert the Date objects to ISO strings for comparison
    const dateStringEvents = events.map((event) => ({
      ...event,
      date: event.date.toISOString(),
    }));

    expect(dateStringEvents).toEqual(expectedEvents);
  });
});
