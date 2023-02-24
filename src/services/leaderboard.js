export const getLeaderboard = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/leaderboard')
      const leaderboard = await response.json();
      return leaderboard
   } catch (e) {
      return []
   }
}