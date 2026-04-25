export interface MediaItem {
    id: number | null
    url: string
    type: "IMAGE" | "VIDEO" | "FILE"
    orderIndex: number
    isMain: boolean
}

export interface Destination {
    id: number
    nameUz: string
    nameRu: string
    imageUrl: string | null
}

export interface Agent {
    id: number
    phoneNumber1: string | null
    phoneNumber2: string | null
    address: string
    name: string
    logo: string | null
    rating: number | null
    reviewsCount: number | null
    toursCount: number | null
}

export interface TourDetailResponse {
    id: number
    nameUz: string
    nameRu: string
    descriptionUz: string
    descriptionRu: string
    destination: Destination
    durationInDays: number
    maxParticipants: number
    popular: boolean
    visaRequired: boolean
    childDiscount: number | null
    categories: string[]
    services: string[]
    minPrice: number
    avgPrice: number
    maxPrice: number
    earliestStartDate: string | null
    latestEndDate: string | null
    media: MediaItem[]
    agent: Agent
    isFavorite: boolean
    discountPercent: number | null
    hasDiscount: boolean | null
    discountAmount: number | null
    sessions: unknown[]
    avgRating: number
}
