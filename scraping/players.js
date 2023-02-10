import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import iconv from 'iconv-lite';
import _ from 'lodash';
import TEAMS from '../db/teams.json' assert { type: 'json' };

const URLS_ALL = [
  'https://resultados.as.com/resultados/ficha/equipo/barcelona/3/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/almeria/85/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/athletic/5/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/atletico/42/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/betis/171/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/cadiz/91/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/celta/6/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/elche/121/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/espanyol/8/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/getafe/172/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/girona/648/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/mallorca/11/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/osasuna/13/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/r_sociedad/16/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/rayo/2/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/real_madrid/1/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/valladolid/18/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/sevilla/53/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/valencia/17/plantilla/',
  'https://resultados.as.com/resultados/ficha/equipo/villarreal/19/plantilla/',
];

URLS_ALL.forEach(async (el) => {
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

  async function getPlayers() {
    const $ = await scrape(el);
    const $rows = $('div.container section.plantilla ul li a');

    const PLAYER_SELECTORS = {
      name: { selector: '.nom-jugador', typeOf: 'string' },
      position: { selector: 'span.info-team.s-left', typeOf: 'string' },
      number: { selector: 'strong.info-team', typeOf: 'number' },
    };

    let players = [];
    $rows.each((index, el) => {
      const $el = $(el);
      const playerEntries = Object.entries(PLAYER_SELECTORS).map(
        ([key, { selector, typeOf }]) => {
          const rawValue = $el.find(selector).text();
          const cleanedValue = cleanText(rawValue);
          const value =
            typeOf === 'number' ? Number(cleanedValue) : cleanedValue;
          return [key, value];
        }
      );

      const { team: teamName, ...playerForTeam } =
        Object.fromEntries(playerEntries);

      players.push({
        ...playerForTeam,
        team: $('h1.tit-ppal.s-block').text().toLocaleLowerCase(),
      });
    });
    return players;
  }

  async function getTeam() {
    const $ = await scrape(el);
    const found = TEAMS.find(
      (element) =>
        element.id === cleanText($('h1.tit-ppal.s-block').text().toLocaleLowerCase().trim()) // buscamos el equipo para saber cual estamos scrapeando
    );
    return found;
  }

  const players = await getPlayers();
  const teamFiltered = await getTeam(); // tenemos el equipo que estamos scrapeando
  const filePath = path.join(process.cwd(), './db/teams.json'); // current working directory

  TEAMS.filter(
    (el) => (el === teamFiltered ? (teamFiltered.players = []) : null) // filtramos el TEAMS para coger
  );

  const foundTeam = _.find(TEAMS, teamFiltered, null); // buscamos el equipo filtrado en el array de TEAMS que está en el fichero teams.json
  foundTeam.players.push(...players); // y pusheamos los players scrapeados con ... para reemplazar

  await writeFile(filePath, JSON.stringify(TEAMS, null, 2), null); // escribimos en el fichero teams.json el nuevo array de TEAMS
});
