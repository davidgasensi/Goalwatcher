# GoalWatcher

Proyecto creado por motivos didácticos sin ánimo de lucro. Los datos de la API han sido recogidos mediante scraping a páginas web.

GoalWatcher es un sitio web dedicado a la actualidad del fútbol. Ofrece noticias actualizadas sobre los equipos y jugadores más destacados, así como estadísticas y resultados. Con GoalWatcher, los aficionados al fútbol pueden mantenerse al día sobre sus equipos y jugadores favoritos.

## Web

URL: https://goalwatcher.vercel.app/

![image](https://user-images.githubusercontent.com/20258310/221303579-6331120b-8bf5-4a81-a373-7c603d55dfc1.png)


## API
URL: https://goalwatcher.davidasensi.workers.dev/

La API se actualiza automáticamente cada 2 horas que es cuando el script de scraping se ejecuta mediante GitHub Actions y recoge los datos, la API también se despliega automáticamente por lo mismo.

Endpoints disponibles:

* GET `/leaderboard`: Devuelve la clasificacón de la Liga Española.
* GET `/teams`: Devuelve todos los equipos de la primera división española.
* GET `/teams:id`: Devuelve un equipo de la primera división española.
* GET `/players`: Devuelve todos los jugadores de la primera división española.
* GET `/players:id`: Devuelve un jugador de la primera división española.
* GET `/calendar`: Devuelve el calendario en curso.
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


