import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { writeFile } from 'fs/promises';
import path from 'path';

const URLS = {
  calendar: 'https://www.sport.es/es/resultados/la-liga/calendario/',
};

async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  return cheerio.load(html);
}

const cleanText = (text) =>
  text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim();

async function getCalendar() {
  const $ = await scrape(URLS.calendar);
  const $rows = $('div.sp-jornada');

  const CALENDAR_SELECTOR = {
    team1: { selector: '.td1', typeOf: 'string' },
    result: { selector: '.td2', typeOf: 'string' },
    team2: { selector: '.td3', typeOf: 'string' },
  };

  let calendar = [];
  $rows.each(async (index, el) => {
    const $el = $(el);
    const numJornada = $el
      .find('h2.title')
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();
    const date = $el.find('h2.title span.date').text().trim();
    const $rowsInner = $el.find('tbody tr');

    const matches = [];
    $rowsInner.each((indexInner, elInner) => {
      const $elInner = $(elInner);
      const calendarEntries = Object.entries(CALENDAR_SELECTOR).map(
        ([key, { selector, typeOf }]) => {
          const rawValue =
            typeOf === 'image'
              ? $elInner.find(selector).find('img').attr('src')
              : typeOf === 'link'
              ? $elInner.find(selector).attr('href')
              : $elInner.find(selector).text();
          const cleanedValue =
            typeOf === 'string' ? cleanText(rawValue) : rawValue;
          const value =
            typeOf === 'number' ? Number(cleanedValue) : cleanedValue;
          return [key, value];
        }
      );

      const { team1, result, team2 } = Object.fromEntries(calendarEntries);

      matches.push({
        team1,
        result,
        team2,
      });
    });

    calendar.push({
      numJornada,
      date,
      matches,
    });
  });

  return calendar;
}

(async () => {
  const calendarArray = await getCalendar();

  console.log(calendarArray);

  const filePathPlayers = path.join(process.cwd(), './db/calendar.json');

  await writeFile(filePathPlayers, JSON.stringify(calendarArray, null, 2), null);
})();
