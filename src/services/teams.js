export const getAllTeams = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/teams')
      const teams = await response.json();
      return teams
   } catch (e) {
      return []
   }
}