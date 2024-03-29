import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import _ from 'lodash';
import iconv from 'iconv-lite';
import ARTICLES from '../db/articles.json' assert { type: 'json' };
import ALL_ARTICLES from '../db/articlesAll.json' assert { type: 'json' };

const URLS_ALL = ['https://as.com/futbol/primera/'];

URLS_ALL.forEach(async (u) => {
  async function scrape(url) {
    const res = await fetch(url);
    let html = await res.text();
    //  html = iconv.decode(html, 'ISO-8859-1');
    return cheerio.load(html);
  }

  const cleanText = (text) => {
    if (!text || typeof text !== 'string') return text;

    return text
      .replace(/\t|\n|\s:/g, '')
      .replace(/.*:/g, ' ')
      .trim();
  };

  async function getarticles() {
    const $ = await scrape(u);
    const $rows = $('article');

    const ARTICLE_SELECTORS = {
      title: { selector: '.s__tl', typeOf: 'string' },
      link: { selector: 'a', typeOf: 'link' },
      image: { selector: 'figure', typeOf: 'image' },
    };

    let articles = [];
    $rows.each(async (index, el) => {
      let today = new Date();
      let date = today.getTime();
      const domain = u.replace('https://', '').split('.')[0];
      const $el = $(el);
      if (index < 3) {
        const articleEntries = Object.entries(ARTICLE_SELECTORS).map(
          ([key, { selector, typeOf }]) => {
            const rawValue =
              typeOf === 'image'
                ? $el.find(selector).find('img').attr('src')
                : typeOf === 'link'
                ? $el.find(selector).attr('href')
                : $el.find(selector).text();
            const cleanedValue =
              typeOf === 'string' ? cleanText(rawValue) : rawValue;
            const value =
              typeOf === 'number' ? Number(cleanedValue) : cleanedValue;
            return [key, value];
          }
        );

        const { ...articleForTeam } = Object.fromEntries(articleEntries);

        articles.push({
          ...articleForTeam,
          createDate: date,
          domain: domain,
        });
      }
    });
    return articles;
  }

  const articles = await getarticles();
  ARTICLES.push(...articles);
  ALL_ARTICLES.push(...articles);

  const filePath = path.join(process.cwd(), './db/articles.json'); // current working directory
  const filePathArticlesAll = path.join(process.cwd(), './db/articlesAll.json');
  
  const currentDate = new Date();

  const filteredArticles = ARTICLES.filter((article) => {
    // filtramos para coger solo los que la fecha de creacón sea mayor a la actual
    const creationDate = new Date(article.createDate);
    creationDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return creationDate >= currentDate;
  });

  const filteredAllArticles = ALL_ARTICLES.filter((v,i,a)=>a.findIndex(v2=>(v2.title===v.title))===i)

  const filteredAllArticlesRemoveOld = filteredAllArticles.filter((article) => {
    const creationDate = new Date(article.createDate);
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - creationDate.getTime();
    const differenceInDays = differenceInMs / 1000 / 60 / 60 / 24;
    return differenceInDays <= 30;
  });

  const filteredArticlesNoDuplicate = filteredArticles.filter((v,i,a)=>a.findIndex(v2=>(v2.title===v.title))===i)

  const filteredArticlesNoDuplicateSorted = filteredArticlesNoDuplicate.sort((a, b) => a.creationDate - b.creationDate).reverse();

  await writeFile(filePath, JSON.stringify(filteredArticlesNoDuplicateSorted, null, 2), null);
  await writeFile(filePathArticlesAll, JSON.stringify(filteredAllArticlesRemoveOld, null, 2), null);
});
