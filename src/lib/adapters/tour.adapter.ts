import { Tour } from "@/types/api/tour"

const FALLBACK_AVATAR =
    "https://ui-avatars.com/api/?name=GoTour&background=random&color=fff"
const FALLBACK_IMAGE =
    "https://api.file.gotour.uz/file-service/api/v1/images/get/default-tour.jpg"

const CATEGORY_MAP: Record<string, string> = {
    EDUCATIONAL: "best",
    WEEKEND: "new",
    ADVENTURE: "bestseller",
    CULTURAL: "best",
    BEACH: "bestseller",
    BUSINESS: "special",
}

const formatDateRange = (startMs: number, endMs: number): string => {
    const fmt = (ms: number) =>
        new Date(ms).toLocaleDateString("uz-UZ", {
            day: "numeric",
            month: "short",
        })
    return `${fmt(startMs)} – ${fmt(endMs)}`
}

const resolveAuthor = (agent: Tour["agent"]): string => {
    if (!agent) return "GoTour"
    if (typeof agent === "string") return agent
    if (typeof agent === "object" && "name" in agent)
        return (agent as { name: string }).name
    return "GoTour"
}

const resolveBadge = (tour: Tour): string => {
    if (tour.hasDiscount) return "Chegirma"
    if (tour.popular) return "Bestseller"
    if (tour.visaRequired === false) return "Vizasiz"
    return tour.categories[0] ?? "Tur"
}

const resolveCategory = (tour: Tour): string => {
    if (tour.hasDiscount) return "discount"
    if (tour.popular) return "bestseller"
    return CATEGORY_MAP[tour.categories[0]] ?? "best"
}

const resolveOriginalPrice = (tour: Tour): number | undefined => {
    if (!tour.hasDiscount || tour.discountAmount <= 0) return undefined
    return tour.minPrice + tour.discountAmount
}

export const adaptTour = (tour: Tour) => ({
    id: tour.id,
    title: tour.nameUz,
    subtitle: tour.nameRu,
    image: tour.imageUrl || FALLBACK_IMAGE,
    author: resolveAuthor(tour.agent),
    authorAvatar: FALLBACK_AVATAR,
    rating: tour.avgRating,
    reviews: 0,
    location: tour.destination.nameUz,
    price: tour.minPrice,
    originalPrice: resolveOriginalPrice(tour),
    days: tour.durationInDays,
    dates: formatDateRange(tour.earliestStartDate, tour.latestEndDate),
    badge: resolveBadge(tour),
    isNew: !tour.popular && !tour.hasDiscount,
    discount: tour.hasDiscount ? tour.discountPercent : undefined,
    category: resolveCategory(tour),
    isFavorite: tour?.isFavorite,
})

export const adaptTours = (tours: Tour[]) => tours.map(adaptTour)
