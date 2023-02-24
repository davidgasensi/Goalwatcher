export const getCalendar = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/calendar')
      const calendar = await response.json();
      return calendar
   } catch (e) {
      return []
   }
}