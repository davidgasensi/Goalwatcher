# GoalWatcher

*Work in progress*
Proyecto para crear una página web y una api con datos de jugadores y equipos de fútbol así como artículos/noticias del día. (Motivos didácticos)

Los datos se han conseguido mediante scraping.

## API

Endpoints disponibles:

* GET `/leaderboard`: Devuelve la clasificacón de la Liga Española.
* GET `/teams`: Devuelve todos los equipos de la primera división española.
* GET `/teams:id`: Devuelve un equipo de la primera división española.
* GET `/players`: Devuelve todos los jugadores de la primera división española.
* GET `/players:id`: Devuelve un jugador de la primera división española.
* GET `/articles`: Devuelve noticias del día de diferentes páginas web (https://www.sport.es/es/ y https://as.com/).
* GET `/stats`: Devuelve las estadísticas por jugadores y equipos.
* GET `/stats/players`: Devuelve las estadísticas por jugador.
* GET `/stats/players/goalAgainst`: Devuelve las estadísticas de gol en contra por jugador.
* GET `/stats/players/penalties`: Devuelve las estadísticas de penaltis marcados por jugador.
* GET `/stats/players/pichichi`: Devuelve las estadísticas del pichichi.
* GET `/stats/players/redcards`: Devuelve las estadísticas de tarjetas roja por jugador.
* GET `/stats/players/yellowcards`: Devuelve las estadísticas de tarjetas roja por jugador.
* GET `/stats/players/zamora`: Devuelve las estadísticas del zamora.
* GET `/stats/teams`: Devuelve las estadísticas por equipo.
* GET `/stats/teams/goalsPerMatch`: Devuelve las estadísticas de los goles por partido por los equipos.
* GET `/stats/teams/foulsPerMatch`: Devuelve las estadísticas de las faltas cometidas por partido por los equipos.



## Web
