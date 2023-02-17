export const getArticlesDaily = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/articles')
      const articles = await response.json();
      return articles
   } catch (e) {
      // enviar el error en una notificacion
      return []
   }
}