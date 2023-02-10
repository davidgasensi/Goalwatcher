import { Hono } from 'hono';
import leaderboard from '../db/leaderboard.json';
import teams from '../db/teams.json';
import players from '../db/players.json'
import { serveStatic } from 'hono/serve-static.module';

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
    }
  ])
);

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard);
});

app.get('/teams', (ctx) => {
  return ctx.json(teams);
});

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id');
  const foundTeam = teams.find(e => e.id === id)

  return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found '}, 404)
});

app.get('/players', (ctx) => {
  return ctx.json(players);
});


app.get('/static/*', serveStatic({ root: './'}))

export default app;
