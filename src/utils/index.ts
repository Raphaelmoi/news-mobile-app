import { NewsItem, Pages } from '@/store/store';


/**
 * Converts a string into a URL-friendly format.
 */
export function stringForUrl(val: string): string {
    if (val) {
        return val
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove all accents
            .replace(/[\W_]/gi, "-") // Remove anything that is not a number, letter, or underscore and convert to lowercase
            .replace(/-+/g, "-") // Replace consecutive dashes with a single dash
            .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
    } else {
        return "";
    }
}

export function toggleNewsToReadLater(item: NewsItem) {
    let storedNews = getStoredNews()

    const isStored = storedNews.findIndex(news => news.link === item.link)

    if (isStored === -1) storedNews.push(item)
    else storedNews.splice(isStored, 1)

    localStorage.setItem('storedNews', JSON.stringify(storedNews))
}

export function getStoredNews(): NewsItem[] {
    const storedNewsStorage = localStorage.getItem('storedNews')
    if (storedNewsStorage) return JSON.parse(storedNewsStorage)
    return []
}



export function getStoredMenu(): Pages[] {
    const storedMenu = localStorage.getItem('menu')
    if (storedMenu) return JSON.parse(storedMenu)
    return []
}


export function storeMenu(menu: Pages[]) {
    const menuWithoutNews = menu.map(item => ({ ...item, news: [] }));
    localStorage.setItem('menu', JSON.stringify(menuWithoutNews))
}




export const newsOutlets = [
    {
        name: "Le Monde",
        logo: "/newspaper-logo/Le_Monde.svg",
        match: 'le monde'
    },
    {
        name: "Libération",
        logo: "/newspaper-logo/Libération.svg",
        match: 'libération'
    },
    {
        name: "20 Minutes",
        logo: "/newspaper-logo/20_Minutes_logo.svg",
        match: "20minutes"
    },
    {
        name: "Le Figaro",
        logo: "/newspaper-logo/Le_Figaro_logo.svg",
        match: "figaro"
    },
    {
        name: "France Inter",
        logo: "/newspaper-logo/France_Inter_logo.svg",
        match: "france inter"
    },
    {
        name: "France Culture",
        logo: "/newspaper-logo/France_Culture_logo_2021.svg",
        match: "france culture"
    },
    {
        name: "Futura",
        logo: "/newspaper-logo/futura.jpg",
        match: "futura"
    },
    {
        name: "La Croix",
        logo: "/newspaper-logo/La_Croix.svg",
        match: "la croix"
    },
    {
        name: "Ouest-France",
        logo: "",
        match: "ouest-france"
    },
    {
        name: "Les Echos",
        logo: "",
        match: "les echos"
    },
    {
        name: "Marianne",
        logo: "",
        match: "marianne"
    },
    {
        name: "Le Parisien",
        logo: "",
        match: "le parisien"
    },
    {
        name: "La Croix",
        logo: "",
        match: "la croix"
    },
    {
        name: "Ouest-France",
        logo: "",
        match: "ouest-france"
    },
    {
        name: "Les Echos",
        logo: "",
        match: "les echos"
    },
    {
        name: "Marianne",
        logo: "",
        match: "marianne"
    },
    {
        name: "Le Parisien",
        logo: "",
        match: "le parisien"
    },
    {
        name: "L'Express",
        logo: "",
        match: "l'express"
    },
    {
        name: "France 24",
        logo: "",
        match: "france 24"
    },
    {
        name: "BFM TV",
        logo: "",
        match: "bfm tv"
    },
    {
        name: "RTL",
        logo: "",
        match: "rtl"
    },
    {
        name: "L'Obs",
        logo: "",
        match: "l'obs"
    },
    {
        name: "Courrier International",
        logo: "",
        match: "courrier international"
    },
    {
        name: "Sud Ouest",
        logo: "",
        match: "sud ouest"
    },
    {
        name: "Sciences et Avenir",
        logo: "/newspaper-logo/Science_et_Avenir.svg",
        match: "sciences et avenir"
    },
    {
        name: "Radio France",
        logo: "/newspaper-logo/radiofrance.svg",
        match: "radio france"
    },
    {
        name: "France info",
        logo: "/newspaper-logo/Franceinfo.svg",
        match: "franceinfo"
    },
];