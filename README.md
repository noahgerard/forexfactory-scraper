# ForexFactory Scraper

A scraper for Forex Factory calendar events.

## Installation

```bash
npm install forexfactory-scraper
```

## Usage

```typescript
import Scraper from 'forexfactory-scraper';

const scraper = new Scraper();
scraper.scrapeCalendar().then(events => {
  console.log(events);
});
```

## Scripts

- `build`: Compiles the TypeScript code to JavaScript.
- `dev`: Runs the TypeScript code directly using `ts-node`.
- `start`: Runs the compiled JavaScript code.

## License

MIT