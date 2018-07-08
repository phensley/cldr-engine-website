import { inspect } from 'util';
import { framework } from './helpers';
import { FormatWidthType } from '@phensley/cldr';

const ts = (s: string) => '```typescript\n' + s + '\n```';
const html = (s: string) => '<pre class="output">\n' + s + '\n</pre>';
const method = (o: any) => `cldr.Calendars.formatDate(date, ${inspect(o)});`;
const header = (s: string) => console.log(`## ${s}\n\n`);

// formatDate
(() => {
  const cldr = framework.get('en');
  const date = new Date(2018, 2, 15, 12, 34, 56, 789);
  const newyork = 'America/New_York';
  const tokyo = 'Asia/Tokyo';
  const london = 'Europe/London';

  const zones = [newyork, london, tokyo];
  const widths: FormatWidthType[] = ['short', 'medium', 'long', 'full'];

  header('Dates');

  for (const width of widths) {
    const opts = { date: width };
    const d = { date, zoneId: newyork };
    console.log(ts(method(opts)));
    const res = cldr.Calendars.formatDate(d, opts);
    console.log(html(res));
    console.log();
  }

  header('Times');

  for (const width of widths) {
    const opts = { time: width };
    console.log(ts(method(opts)));

    let res: string[] = [];
    for (const zoneId of zones) {
      const d = { date, zoneId };
      const s = cldr.Calendars.formatDate(d, opts);
      res.push(s);
    }
    console.log(html(res.join('\n')));
    console.log();
  }

  header('Dates and times');

  for (const width of widths) {
    const opts = { datetime: width };
    console.log(ts(method(opts)));

    let res: string[] = [];
    for (const zoneId of zones) {
      const d = { date, zoneId };
      const s = cldr.Calendars.formatDate(d, opts);
      res.push(s);
    }
    console.log(html(res.join('\n')));
    console.log();
  }

  header('Date skeletons');

  // Skeleton examples

  let skeletons = ['yMd', 'yMMMd', 'yMMMMd', 'EEEEyMMMMd'];
  for (const skeleton of skeletons) {
    const opts = { skeleton };
    console.log(ts(`cldr.Calendars.formatDate(date, ${inspect(opts)});`));
    const res = cldr.Calendars.formatDate({ date, zoneId: newyork }, opts);
    console.log(html(res));
    console.log();
  }

  header('Time skeletons');

  skeletons = ['hm', 'hmsz', 'hmszzzz', 'hmsVVVV', 'hmsvvvv'];
  for (const skeleton of skeletons) {
    const opts = { skeleton };
    console.log(ts(`cldr.Calendars.formatDate(date, ${inspect(opts)});`));
    let res: string[] = [];
    for (const zoneId of zones) {
      const s = cldr.Calendars.formatDate({ date, zoneId }, opts);
      res.push(s);
    }
    console.log(html(res.join('\n')));
    console.log();
  }

  header('Date time skeletons');

  skeletons = ['yMdhm', 'yMMMdhmsz', 'EyMMMMdhmszzzz', 'yMMMdhmsVVVV', 'yMMMMdhmsvvvv'];
  for (const skeleton of skeletons) {
    const opts = { skeleton };
    console.log(ts(`cldr.Calendars.formatDate(date, ${inspect(opts)});`));
    let res: string[] = [];
    for (const zoneId of zones) {
      const s = cldr.Calendars.formatDate({ date, zoneId }, opts);
      res.push(s);
    }
    console.log(html(res.join('\n')));
    console.log();
  }
})();
