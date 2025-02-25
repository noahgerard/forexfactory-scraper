import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { parse } from 'date-fns';
export class Scraper {
    async scrapeCalendar(url) {
        const response = await gotScraping({
            url: url || "https://www.forexfactory.com/calendar",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.forexfactory.com/'
            }
        });
        const parsedEvents = this.parse(response.body);
        return parsedEvents;
    }
    parse(body) {
        const $ = cheerio.load(body);
        const events = $('.calendar__row');
        let lastParsedDate = '';
        let lastParsedTime = '';
        const parsedEvents = [];
        events.each((index, element) => {
            const newDate = $(element).find('.calendar__date').text().trim();
            if (newDate && newDate.length > 0) {
                lastParsedDate = newDate;
            }
            const time = $(element).find('.calendar__time').text().trim();
            const currency = $(element).find('.calendar__currency').text().trim();
            const impactClass = $(element).find('.calendar__impact').children()?.[0]?.attribs?.class;
            let impact = "Unknown";
            if (impactClass?.includes('impact-yel')) {
                impact = "Low";
            }
            else if (impactClass?.includes('impact-red')) {
                impact = "High";
            }
            else if (impactClass?.includes('impact-ora')) {
                impact = "Medium";
            }
            else if (impactClass?.includes('impact-none')) {
                impact = "None";
            }
            const event = $(element).find('.calendar__event').text().trim();
            const actual = $(element).find('.calendar__actual').text().trim() || null;
            const forecast = $(element).find('.calendar__forecast').text().trim() || null;
            const previous = $(element).find('.calendar__previous').text().trim() || null;
            if (currency) {
                let parsedDate = parse(lastParsedDate, 'EEE MMM d', new Date());
                let parsedTime = "";
                if (time && time !== "Tentative" && time !== "All Day") {
                    parsedTime = time;
                }
                else if (!time) {
                    parsedTime = lastParsedTime;
                }
                if (parsedTime && parsedTime !== "Tentative" && parsedTime !== "All Day") {
                    const timeSplit = parsedTime.match(/(\d{1,2}):(\d{2})([ap]m)/);
                    if (timeSplit) {
                        const hours = parseInt(timeSplit[1]) + (timeSplit[3] === 'pm' ? 12 : 0);
                        const minutes = parseInt(timeSplit[2]);
                        parsedDate.setHours(hours, minutes);
                    }
                }
                const data = {
                    date: parsedDate,
                    time: time || lastParsedTime,
                    currency,
                    impact,
                    event,
                    actual,
                    forecast,
                    previous
                };
                parsedEvents.push(data);
            }
            if (time) {
                lastParsedTime = time;
            }
        });
        return parsedEvents;
    }
}
/* const t = new Scraper();
t.scrapeCalendar().then(
    (data) => {
        console.log(data.map(({event, date, time}) => `${event} - ${date} - ${time}`));
    }
); */ 
//# sourceMappingURL=index.js.map