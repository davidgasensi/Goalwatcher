import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { writeFile } from 'fs/promises';
import path from 'path';

const URLS = {
  leaderboard: 'https://www.sport.es/es/resultados/la-liga/estadisticas/',
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

async function getStats() {
  const $ = await scrape(URLS.leaderboard);
  const $rows = $('div.sp-ranking');

  const STATS_SELECTOR = {
    position: { selector: '.td1', typeOf: 'number' },
    value: { selector: '.td3', typeOf: 'number' },
    name: { selector: '.td2 .name', typeOf: 'string' },
    team: { selector: '.thumb', typeOf: 'image' },
  };

  let stats = [];
  $rows.each(async (index, el) => {
    const $el = $(el);
      const type = $el.find('.title').text();
      const $rowsInner = $el.find('tbody tr');

      $rowsInner.each((indexInner, elInner) => {
        const $elInner = $(elInner);
        const statsEntries = Object.entries(STATS_SELECTOR).map(
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

        const { position, value, name, team } =
          Object.fromEntries(statsEntries);

        stats.push({
          type,
          position,
          value,
          name,
          team,
        });
      });
    
  });

  return stats;
}

(async () => {
   const statsArray = await getStats();
 
   const filteredArrays = [
     { type: 'Pichichi', filePath: './db/statsPlayers/pichichi.json' },
     { type: 'Zamora', filePath: './db/statsPlayers/zamora.json' },
     { type: 'Tarjetas rojas', filePath: './db/statsPlayers/redcards.json' },
     { type: 'Tarjetas amarillas', filePath: './db/statsPlayers/yellowcards.json' },
     { type: 'Penaltis', filePath: './db/statsPlayers/penalties.json' },
     { type: 'Goles en contra', filePath: './db/statsPlayers/goalAgainst.json' },
     { type: 'Faltas por partido', filePath: './db/statsTeams/foulsPerMatch.json' },
     { type: 'Goles por partido', filePath: './db/statsTeams/goalsPerMatch.json' },
   ];
 
   const fileWritingTasks = filteredArrays.map(({ type, filePath }) => {
     const filteredArray = statsArray
       .filter(e => e.type === type)
       .sort((a, b) => a.position - b.position);
 
     const fullFilePath = path.join(process.cwd(), filePath);
 
     return writeFile(
       fullFilePath,
       JSON.stringify(filteredArray, null, 2),
       'utf-8'
     );
   });
 
   await Promise.all(fileWritingTasks);
 })();
 