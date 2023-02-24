export const getArticlesDaily = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/articles')
      const articles = await response.json();
      return articles
   } catch (e) {
      return []
   }
}

export const getArticlesAll = async () => {
   try {
      const response = await fetch('https://goalwatcher.davidasensi.workers.dev/articlesAll')
      const articlesAll = await response.json();
      return articlesAll
   } catch (e) {
      return []
   }
}