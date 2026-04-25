export const CATEGORIES = [
    { id: "all", label: "Barcha kategoriyalar" },
    { id: "BEACH", label: "Plyaj" },
    { id: "CITY", label: "Shahar" },
    { id: "NATURE", label: "Tabiat" },
    { id: "ADVENTURE", label: "Sarguzasht" },
    { id: "HIKING", label: "Piyoda sayohat" },
    { id: "SKI", label: "Chang'i" },
    { id: "SAFARI", label: "Safari" },
    { id: "CRUISE", label: "Kruiz" },
    { id: "GASTRONOMIC", label: "Gastronomik" },
    { id: "EDUCATIONAL", label: "Ta'limiy" },
    { id: "BUSINESS", label: "Biznes" },
    { id: "EVENT", label: "Tadbir" },
    { id: "HONEYMOON", label: "Asal oyi" },
    { id: "FAMILY", label: "Oila" },
    { id: "LUXURY", label: "Lyuks" },
    { id: "WEEKEND", label: "Dam olish" },
] as const

export const RATINGS = [
    { value: "all", label: "Barcha reyting", stars: 0 },
    { value: "4.5", label: "4.5 yulduz", stars: 5 },
    { value: "4.0", label: "4.0 yulduz", stars: 4 },
    { value: "3.5", label: "3.5 yulduz", stars: 3 },
    { value: "3.0", label: "3.0 yulduz", stars: 3 },
] as const

export const DURATIONS = [
    { value: "all", label: "Barchasi" },
    { value: "1-3", label: "1–3 kun" },
    { value: "4-7", label: "4–7 kun" },
    { value: "8-14", label: "8–14 kun" },
    { value: "15+", label: "15+ kun" },
] as const

export const TAGS = [
    "Sayohat",
    "Dam olish",
    "Tadqiqot",
    "Safar",
    "Dunyo bo'ylab",
    "Bayram",
    "Lager",
    "Okean",
    "Madaniy tur",
    "Chegirmali tur",
    "Ekoturizm",
    "Oila safari",
] as const

export const LANGUAGES = [
    { id: "RU", label: "Ruscha" },
    { id: "EN", label: "Inglizcha" },
    { id: "ES", label: "Ispancha" },
    { id: "FR", label: "Fransuzcha" },
    { id: "DE", label: "Nemischa" },
    { id: "IT", label: "Italyancha" },
    { id: "TR", label: "Turkcha" },
    { id: "UZ", label: "O'zbekcha" },
] as const

export const PRICE_MIN = 0
export const PRICE_MAX = 10_000

export type FilterState = {
    category: string
    priceRange: [number, number]
    duration: string
    rate: string
    tags: string[]
    promotional: boolean
    guaranteed: boolean
    languages: string[]
}

export const DEFAULT_FILTERS: FilterState = {
    category: "all",
    priceRange: [PRICE_MIN, PRICE_MAX],
    duration: "all",
    rate: "all",
    tags: [],
    promotional: false,
    guaranteed: false,
    languages: [],
}
