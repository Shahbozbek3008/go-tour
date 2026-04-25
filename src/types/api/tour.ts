export interface TourDestination {
    id: number
    nameUz: string
    nameRu: string
    imageUrl: string | null
}

export interface Tour {
    id: number
    nameUz: string
    nameRu: string
    destination: TourDestination
    durationInDays: number
    maxParticipants: number
    popular: boolean
    visaRequired: boolean
    childDiscount: number | null
    categories: ("EDUCATIONAL" | "WEEKEND" | string)[]
    services: ("GUIDE" | string)[]
    earliestStartDate: number // timestamp
    latestEndDate: number // timestamp
    imageUrl: string
    avgRating: number
    agent: unknown | null
    isFavorite: boolean
    minPrice: number
    discountPercent: number
    hasDiscount: boolean
    maxPrice: number
    discountAmount: number
}
