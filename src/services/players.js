export const getPlayers = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/players')
      const players = await response.json();
      return players
   } catch (e) {
      return []
   }
}