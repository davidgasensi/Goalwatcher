export const getStats = async (petition) => {
   try {
     let playersArray = [];
     let statsArray = [];
     let statsArrayZamora = [];
     let statsWithImages = [];
     let statsZamoraWithImages = [];
 
     const response = await fetch(
       'https://goalwatcher.davidasensi.workers.dev/players'
     );
     const players = await response.json();
     playersArray = players;
 
     const responsePichichi = await fetch(
       'https://goalwatcher.davidasensi.workers.dev/stats/players/pichichi'
     );
     const statsPichichi = await responsePichichi.json();
     statsArray = statsPichichi;
 
     const responseZamora = await fetch(
       'https://goalwatcher.davidasensi.workers.dev/stats/players/zamora'
     );
     const statsZamora = await responseZamora.json();
     statsArrayZamora = statsZamora;
 
     if (petition === 'pichichi') {
       statsWithImages = statsPichichi.map((stat) => {
         let image = null;
         for (const playerArray of playersArray) {
           const player = playerArray.find((p) => stat.name.includes(p.name));
           image =
             !player || player.image.endsWith('.gif')
               ? 'https://goalwatcher.davidasensi.workers.dev/static/logos/no-photo-footballer.jpg'
               : player.image;
         }
         return { ...stat, image };
       });
       return statsWithImages;
     } else {
       statsZamoraWithImages = statsZamora.map((stat) => {
         let image = null;
         for (const playerArray of playersArray) {
           const player = playerArray.find((p) => stat.name.includes(p.name));
           image =
             !player || player.image.endsWith('.gif')
               ? 'https://goalwatcher.davidasensi.workers.dev/static/logos/no-photo-footballer.jpg'
               : player.image;
         }
         return { ...stat, image };
       });
       return statsZamoraWithImages;
     }
   } catch (e) {
     // enviar el error en una notificacion
     return [];
   }
 };
 