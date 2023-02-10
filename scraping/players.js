import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import _ from 'lodash';
import TEAMS from '../db/teams.json' assert { type: 'json' };
import removeAccents from 'remove-accents';

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

let allPlayers = [];
URLS_ALL.forEach(async (u) => {
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

  const cleanTextTeam = (text) =>
    text
      .replace(/\t|\n|\s:/g, '')
      .replace(/.*:/g, ' ')
      .replace(/\s/g, '')
      .split('.')
      .join('')
      .trim();

  async function getPlayers() {
    const $ = await scrape(u);
    const $rows = $('div.container section.plantilla ul li a');

    const PLAYER_SELECTORS = {
      name: { selector: '.nom-jugador', typeOf: 'string' },
      position: { selector: 'span.info-team.s-left', typeOf: 'string' },
      number: { selector: 'strong.info-team', typeOf: 'number' },
      image: { selector: '.s-block.fundido', typeOf: 'image' },
    };

    let players = [];
    $rows.each(async (index, el) => {
      const $el = $(el);
      const playerEntries = Object.entries(PLAYER_SELECTORS).map(
        ([key, { selector, typeOf }]) => {
          const rawValue =
            typeOf === 'image'
              ? $el.find(selector).find('img').attr('src')
              : $el.find(selector).text();
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
        team: removeAccents(
          cleanTextTeam(
            $('h1.tit-ppal.s-block').text().toLocaleLowerCase().trim()
          )
        ),
      });
    });
    return players;
  }

  async function getTeam() {
    const $ = await scrape(u);
    const found = TEAMS.find(
      (element) =>
        element.id ===
        removeAccents(
          cleanTextTeam(
            $('h1.tit-ppal.s-block').text().toLocaleLowerCase().trim()
          )
        ) // buscamos el equipo para saber cual estamos scrapeando
    );
    return found;
  }

  const players = await getPlayers();

  const teamFiltered = await getTeam(); // tenemos el equipo que estamos scrapeando
  const filePathTeams = path.join(process.cwd(), './db/teams.json'); // current working directory
  const filePathPlayers = path.join(process.cwd(), './db/players.json');

  TEAMS.filter(
    (el) => (el === teamFiltered ? (teamFiltered.players = []) : null) // filtramos el TEAMS para coger
  );

  const foundTeam = _.find(TEAMS, teamFiltered, null); // buscamos el equipo filtrado en el array de TEAMS que está en el fichero teams.json
  foundTeam.players.push(...players); // y pusheamos los players scrapeados con ... para reemplazar

  allPlayers.push(players);
  await writeFile(filePathTeams, JSON.stringify(TEAMS, null, 2), null); // escribimos en el fichero teams.json el nuevo array de TEAMS
  await writeFile(filePathPlayers, JSON.stringify(allPlayers, null, 2), null);
});
