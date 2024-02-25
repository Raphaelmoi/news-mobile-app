import { XMLParser } from "fast-xml-parser";
import axios from 'axios';
import cheerio from 'cheerio';
import { NewsItem, useStore } from "@/store/store";

const store = useStore()

export const CORS_PROXY = "https://corsproxy.io/?"

export async function getRSSFlux(link: string) {
    try {
        const res = await fetch(CORS_PROXY + link)
        const feed = await res.text()

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: ""
        });
        let jObj = parser.parse(feed);
        console.log(jObj);

        return jObj.rss

    } catch (error) {
        console.error('Error while getting news from ' + link);
        console.error(error)
    }
}

export async function getMetaImage(url: string): Promise<string | null> {
    try {
        // Fetch the HTML content of the external link
        const response = await axios.get(CORS_PROXY + url);
        const html = response.data;
        // Use cheerio to parse the HTML
        const c = cheerio.load(html);
        return c('meta[property="og:image"]').attr('content') || "";

    } catch (error) {
        console.error('Error fetching and parsing the HTML:', error);
        return "";
    }
}

export async function feedResults(rss: any): Promise<NewsItem[]> {
    const results: NewsItem[] = []

    await Promise.all(rss.channel.item.map(async (NewsItem: any) => {

        const image = NewsItem.enclosure ? NewsItem.enclosure.url : NewsItem['media:content']?.url || await getMetaImage(NewsItem.link);

        results.push({
            source: rss.channel.title,
            title: NewsItem.title,
            description: NewsItem.description,
            image,
            link: NewsItem.link,
            creationDate: NewsItem.pubDate,
            toReadLater: saveForLaterNews(NewsItem.link)
        });

    }));
    return results
}

function saveForLaterNews(newsLink: string) {
    if (store.localStoredNews.find(n => n.link === newsLink)) return true
    return false
}
