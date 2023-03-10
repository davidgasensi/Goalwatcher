export const getStatsPlayers = async (stat) => {
  try {
    const response = await fetch(
      'https://goalwatcher.davidasensi.workers.dev/stats/players/' + stat
    );
    const stats = await response.json();
    return stats;
  } catch (e) {
    return [];
  }
};

export const getStatsTeams = async (stat) => {
  try {
    const response = await fetch(
      'https://goalwatcher.davidasensi.workers.dev/stats/teams/' + stat
    );
    const stats = await response.json();
    return stats;
  } catch (e) {
    return [];
  }
};