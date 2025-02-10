### Forex Factory Calendar Scraper
A simple Node.js script to scrape the Forex Factory calendar and return the data in JSON format.

#### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/forexfactory-scraper.git
    cd forexfactory-scraper
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

#### Usage

1. Run the scraper in development mode:
    ```sh
    npm run dev
    ```

2. Build the project:
    ```sh
    npm run build
    ```

3. Run the scraper:
    ```sh
    npm start
    ```

#### Example

To use the scraper in your own code, you can import and use the `Scraper` class:

```typescript
import Scraper from './dist/index.js';

const scraper = new Scraper();

(async () => {
    const events = await scraper.scrapeCalendar();
    console.log(events);
})();
```

#### Dependencies
- cheerio
- got-scraping

#### License

ISC