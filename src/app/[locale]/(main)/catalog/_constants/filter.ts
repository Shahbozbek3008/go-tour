export const CATEGORIES = [
    { id: "all", label: "Barcha kategoriyalar" },
    { id: "beach", label: "Plyaj" },
    { id: "city", label: "Shahar" },
    { id: "nature", label: "Tabiat" },
    { id: "adventure", label: "Sarguzasht" },
    { id: "hiking", label: "Piyoda sayohat" },
    { id: "ski", label: "Chang'i" },
    { id: "safari", label: "Safari" },
    { id: "cruise", label: "Kruiz" },
    { id: "gastro", label: "Gastronomik" },
    { id: "edu", label: "Ta'limiy" },
    { id: "business", label: "Biznes" },
    { id: "event", label: "Tadbir" },
    { id: "honeymoon", label: "Asal oyi" },
    { id: "family", label: "Oila" },
    { id: "luxury", label: "Lyuks" },
    { id: "relax", label: "Dam olish" },
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
    "Oila safari",
    "Ekoturizm",
    "Chegirmali tur",
] as const

export const PRICE_MIN = 0
export const PRICE_MAX = 10_000
