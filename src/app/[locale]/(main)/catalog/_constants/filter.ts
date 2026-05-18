import { Currency } from "@/types/common/extra"

export const CATEGORIES = [
    { id: "all", label: "cat_all" },
    { id: "BEACH", label: "cat_BEACH" },
    { id: "CITY", label: "cat_CITY" },
    { id: "NATURE", label: "cat_NATURE" },
    { id: "ADVENTURE", label: "cat_ADVENTURE" },
    { id: "HIKING", label: "cat_HIKING" },
    { id: "SKI", label: "cat_SKI" },
    { id: "SAFARI", label: "cat_SAFARI" },
    { id: "CRUISE", label: "cat_CRUISE" },
    { id: "GASTRONOMIC", label: "cat_GASTRONOMIC" },
    { id: "EDUCATIONAL", label: "cat_EDUCATIONAL" },
    { id: "BUSINESS", label: "cat_BUSINESS" },
    { id: "EVENT", label: "cat_EVENT" },
    { id: "HONEYMOON", label: "cat_HONEYMOON" },
    { id: "FAMILY", label: "cat_FAMILY" },
    { id: "LUXURY", label: "cat_LUXURY" },
    { id: "WEEKEND", label: "cat_WEEKEND" },
] as const

export const RATINGS: any = [
    { value: "all", label: "rat_all" },
    { value: "4.5", label: "4.5", stars: 5 },
    { value: "4.0", label: "4.0", stars: 4 },
    { value: "3.5", label: "3.5", stars: 3 },
    { value: "3.0", label: "3.0", stars: 3 },
] as const

export const DURATIONS = [
    { value: "all", label: "dur_all" },
    { value: "1-3", label: "dur_1-3" },
    { value: "4-7", label: "dur_4-7" },
    { value: "8-14", label: "dur_8-14" },
    { value: "15+", label: "dur_15+" },
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
    { id: "RU", label: "lang_RU" },
    { id: "EN", label: "lang_EN" },
    { id: "ES", label: "lang_ES" },
    { id: "FR", label: "lang_FR" },
    { id: "DE", label: "lang_DE" },
    { id: "IT", label: "lang_IT" },
    { id: "TR", label: "lang_TR" },
    { id: "UZ", label: "lang_UZ" },
] as const

export const PRICE_MIN = 0
export const PRICE_MAX = 10_000

export const CURRENCY_PRICE_LIMITS: Record<
    Currency,
    { min: number; max: number; step: number }
> = {
    USD: { min: 0, max: 10_000, step: 100 },
    UZS: { min: 0, max: 150_000_000, step: 1_000_000 },
}

export const getPriceLimit = (currency: Currency) => {
    return CURRENCY_PRICE_LIMITS[currency] || CURRENCY_PRICE_LIMITS.USD
}

export type FilterState = {
    category: string
    priceRange: [number, number]
    duration: string
    rate: string
    tags: string[]
    promotional: boolean
    guaranteed: boolean
    hasReviews: boolean
    languages: string[]
    destinations: number[]
    visaRequired: boolean
    childDiscount: number | null
    childrenCount: number | null // ilgari: childDiscount
    childAge: number | null
}

export const DEFAULT_FILTERS: FilterState = {
    category: "all",
    priceRange: [PRICE_MIN, PRICE_MAX],
    duration: "all",
    rate: "all",
    tags: [],
    promotional: false,
    guaranteed: false,
    hasReviews: false,
    languages: [],
    destinations: [],
    visaRequired: false,
    childDiscount: null,
    childrenCount: null,
    childAge: null,
}
