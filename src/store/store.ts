import { defineStore } from 'pinia'

export interface NewsItem {
  title: string,
  image: string,
  description: string,
  creationDate: string,
  link: string,
  source: string
  toReadLater: boolean
}

export interface Pages {
  title: string,
  link: string,
  flux: string[],
  news: NewsItem[]
}

export const useStore = defineStore('mainStore', {
  state: () => {
    return {
      localStoredNews: [] as NewsItem[],
    }
  },
})


export let pages: Pages[] = [
  {
    title: "A la une",
    link: "a-la-une",
    flux: [
      'https://www.radiofrance.fr/franceinter/rss',
      'https://www.radiofrance.fr/franceculture/rss',
      'https://www.lemonde.fr/rss/une.xml',
      'https://www.liberation.fr/arc/outboundfeeds/rss-all/',
      'https://www.lefigaro.fr/rss/figaro_actualites.xml',
      'https://www.20minutes.fr/feeds/rss-une.xml',
      'https://www.francetvinfo.fr/titres.rss',
    ],
    news: []
  },
  {
    title: "Culture",
    link: "culture",
    flux: [
      "https://www.radiofrance.fr/rss/arts-divertissements/bd-manga",
      "https://www.radiofrance.fr/rss/arts-divertissements/arts-visuels"
    ],
    news: []
  },
  {
    title: "Humour",
    link: "humour",
    flux: [
      "https://www.radiofrance.fr/rss/arts-divertissements/humour",
      "https://www.legorafi.fr/feed/"
    ],
    news: []
  },
  {
    title: "Science",
    link: "science",
    flux: [
      "https://www.radiofrance.fr/rss/sciences-savoirs/sciences",
      "https://www.francetvinfo.fr/decouverte.rss",
      "https://www.futura-sciences.com/rss/actualites.xml",
      "https://www.sciencesetavenir.fr/decouvrir/rss.xml"
    ],
    news: []
  },
  {
    title: "International",
    link: "international",
    flux: [
      "https://www.radiofrance.fr/rss/monde",
      "https://www.francetvinfo.fr/monde.rss",
      "https://www.radiofrance.fr/rss/monde/geopolitique"
    ],
    news: []
  },
]


export function fillPageWithStorage(storedPages: Pages[]) {
  pages = storedPages
}