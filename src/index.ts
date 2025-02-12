import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';

type Event = {
	date: Date;
	time: string;
	currency: string;
	impact: string;
	event: string;
	actual: string | null;
	forecast: string | null;
	previous: string | null;
}

class Scraper {
	public async scrapeCalendar(url?: string) {
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

	private parse(body: string) {
		const $ = cheerio.load(body);
		const events = $('.calendar__row');
		let lastDate = '';
		let lastTime = '';

		const parsedEvents: Event[] = [];
	
		events.each((index, element) => {
			const newDate = $(element).find('.calendar__date').text().trim();
			if (newDate && newDate.length > 0) {
				lastDate = newDate;
			}
	
			const time = $(element).find('.calendar__time').text().trim();
			const currency = $(element).find('.calendar__currency').text().trim();
			
			const impactClass = $(element).find('.calendar__impact').children()?.[0]?.attribs?.class;
			let impact = "Unknown";
			if (impactClass?.includes('impact-yel')) {
				impact = "Low";
			} else if (impactClass?.includes('impact-red')) {
				impact = "High";
			} else if (impactClass?.includes('impact-orange')) {
				impact = "Medium";
			} else if (impactClass?.includes('impact-none')) {
				impact = "None";
			}
	
			const event = $(element).find('.calendar__event').text().trim();
	
			const actual = $(element).find('.calendar__actual').text().trim() || null;
			const forecast = $(element).find('.calendar__forecast').text().trim() || null;
			const previous = $(element).find('.calendar__previous').text().trim() || null;
	
			if (currency) {
				const data: Event = {
					date: new Date(lastDate),
					time: time || lastTime,
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
				lastTime = time;
			}
		});

		return parsedEvents;
	}
}

export default Scraper;