import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const URLS = {
  leaderboard: 'https://www.sport.es/es/resultados/la-liga/clasificacion/'
}

async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

const cleanText = text => text.replace(/\t|\n|\s:/g, '').replace(/.*:/g, ' ').trim()


async function getLeaderBoard() {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('div.sp-clasificacion-liga ol.list li.item')

  const LEADERBOARD_SELECTORS = {
    team: { selector: '.name', typeOf: 'string'},
    gamesPlayed: { selector: '.pj', typeOf: 'number' },
    wins: { selector: '.pg', typeOf: 'number' },
    loses: { selector: '.pp', typeOf: 'number' },
    draws: { selector: '.pe', typeOf: 'number' },
    goalsScored: { selector: '.gf', typeOf: 'number' },
    goalsConceded: { selector: '.gc', typeOf: 'number' },
    points: { selector: '.puntos', typeOf: 'number' }
    
  }

  let leaderboard = [];
  $rows.each((index, el) => {
    const $el = $(el)

    const leaderBoardEntries = Object.entries(LEADERBOARD_SELECTORS).map(([key, {selector, typeOf}]) => {
      const rawValue = $el.find(selector).text()
      const cleanedValue = cleanText(rawValue);
      const value = typeOf === 'number'
        ? Number(cleanedValue)
        : cleanedValue
      return [key, value]
    })

    leaderboard.push(Object.fromEntries(leaderBoardEntries));
  })
  return leaderboard
}

const leaderboard = await getLeaderBoard()
const filePath = path.join(process.cwd(), './db/leaderboard.json') // current working directory

await writeFile(filePath, JSON.stringify(leaderboard, null, 2), 'utf-8')