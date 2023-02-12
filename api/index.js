import { Hono } from 'hono';
import leaderboard from '../db/leaderboard.json';
import teams from '../db/teams.json';
import players from '../db/players.json'
import articles from '../db/articles.json'

import goalAgainst from '../db/statsPlayers/goalAgainst.json'
import penalties from '../db/statsPlayers/penalties.json'
import pichichi from '../db/statsPlayers/pichichi.json'
import redcards from '../db/statsPlayers/redcards.json'
import yellowcards from '../db/statsPlayers/yellowcards.json'
import zamora from '../db/statsPlayers/zamora.json'
import foulsPerMatch from '../db/statsTeams/foulsPerMatch.json'
import goalsPerMatch from '../db/statsTeams/goalsPerMatch.json'



import { serveStatic } from 'hono/serve-static.module';
import _ from 'lodash';

const app = new Hono();

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns the leaderboard',
    },
    {
      endpoint: '/teams',
      description: 'Returns the teams',
    },
    {
      endpoint: '/players',
      description: 'Returns the players',
    },
    {
      endpoint: '/articles',
      description: 'Returns the articles',
    },
    {
      endpoint: '/stats',
      description: 'Returns the stats',
    },
    {
      endpoint: '/stats/players',
      description: 'Returns the stats of players',
    },
    {
      endpoint: '/stats/players/goalAgainst',
      description: 'Returns the stats of goals against per player',
    },
    {
      endpoint: '/stats/players/penalties',
      description: 'Return the stats of penalties scored by player',
    },
    {
      endpoint: '/stats/players/pichichi',
      description: 'Returns the stats of pichichi',
    },
    {
      endpoint: '/stats/players/redcards',
      description: 'Returns the stats of red cards per player',
    },
    {
      endpoint: '/stats/players/yellowcards',
      description: 'Returns the stats of yellow cards per player',
    },
    {
      endpoint: '/stats/players/zamora',
      description: 'Returns the stats of zamora',
    },
    {
      endpoint: '/stats/teams',
      description: 'Returns the stats of teams',
    },
    {
      endpoint: '/stats/teams/foulsPerMatch',
      description: 'Returns the stats of fouls per match for teams',
    },
    {
      endpoint: '/stats/teams/goalsPerMatch',
      description: 'Returns the stats of goals scored per match for teams',
    },
    
  ])
);

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard);
});

app.get('/teams', (ctx) => {
  return ctx.json(teams);
});

app.get('/articles', (ctx) => {
  return ctx.json(articles);
});

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id');
  const foundTeam = teams.find(e => e.id === id)

  return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found '}, 404)
});

app.get('/players', (ctx) => {
  return ctx.json(players);
});

app.get('/players/:name', (ctx) => {
  const id = ctx.req.param('name');
  const foundPlayer = _.find(_.flattenDeep(players), { name: id });

  return foundPlayer ? ctx.json(foundPlayer) : ctx.json({ message: 'Player not found '}, 404)
});

app.get('/stats', (ctx) => {
  return ctx.json({
    statsPlayers: {
      endpoint: '/stats/players',
      goalAgainst,
      penalties,
      pichichi,
      redcards,
      yellowcards,
      zamora,
    },
    statsTeams: {
      endpoint: '/stats/teams',
      foulsPerMatch,
      goalsPerMatch,
    }
  });
});

app.get('/stats/players', (ctx) => {
  return ctx.json({
  goalAgainst: {endpoint: '/stats/players/goalAgainst', goalAgainst},
  penalties: {endpoint: '/stats/players/penalties', penalties},
  pichichi: {endpoint: '/stats/players/pichichi', pichichi},
  redcards: {endpoint: '/stats/players/redcards', redcards},
  yellowcards: {endpoint: '/stats/players/yellowcards', yellowcards},
  zamora: {endpoint: '/stats/players/zamora', zamora},
  });
});

app.get('/stats/players/goalAgainst', (ctx) => {
  return ctx.json(goalAgainst);
});

app.get('/stats/players/penalties', (ctx) => {
  return ctx.json(penalties);
});

app.get('/stats/players/pichichi', (ctx) => {
  return ctx.json(pichichi);
});

app.get('/stats/players/redcards', (ctx) => {
  return ctx.json(redcards);
});

app.get('/stats/players/yellowcards', (ctx) => {
  return ctx.json(yellowcards);
});

app.get('/stats/players/zamora', (ctx) => {
  return ctx.json(zamora);
});

app.get('/stats/teams', (ctx) => {
  return ctx.json({
  foulsPerMatch: {endpoint: '/stats/teams/foulsPerMatch', foulsPerMatch},
  goalsPerMatch: {endpoint: '/stats/teams/goalsPerMatch', goalsPerMatch},
  });
});

app.get('/stats/teams/foulsPerMatch', (ctx) => {
  return ctx.json(foulsPerMatch);
});

app.get('/stats/teams/goalsPerMatch', (ctx) => {
  return ctx.json(goalsPerMatch);
});


app.get('/static/*', serveStatic({ root: './'})) // imagenes etc

export default app;
