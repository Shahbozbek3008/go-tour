import { ApiCategory, NormalizedCategory } from "./categories.types"

const CATEGORY_FEATURED_ID = "city"

const CATEGORY_LABEL_MAP: Record<string, string> = {
    BEACH: "Beach",
    ADVENTURE: "Adventure",
    CITY: "City",
    NATURE: "Nature",
    HIKING: "Hiking",
    SKI: "Ski",
    SAFARI: "Safari",
    CRUISE: "Cruise",
    GASTRONOMIC: "Gastronomic",
    EDUCATIONAL: "Educational",
    BUSINESS: "Business",
    EVENT: "Event",
    HONEYMOON: "Honeymoon",
    FAMILY: "Family",
    LUXURY: "Luxury",
    WEEKEND: "Weekend",
}

export const normalizeCategory = (item: ApiCategory): NormalizedCategory => {
    const id = item.category.toLowerCase()
    return {
        id,
        label: CATEGORY_LABEL_MAP[item.category] ?? item.category,
        image: item.imageUrl,
        featured: id === CATEGORY_FEATURED_ID,
    }
}

export const getCategoryGridClass = (id: string): string => {
    const map: Record<string, string> = {
        beach: "lg:col-start-1 lg:row-start-1",
        city: "lg:col-span-1 lg:col-start-2 lg:row-span-2",
        nature: "lg:col-span-2 lg:col-start-3 lg:row-start-1",
        adventure: "lg:col-start-1 lg:row-start-2",
        hiking: "lg:col-start-3 lg:row-start-2",
        ski: "lg:col-start-4 lg:row-start-2",
    }
    return map[id] ?? ""
}
