import { Organizer } from "./organizer"

export interface Tour {
    id: string
    title: string
    rating: number
    reviewCount: number
    country: string
    type: string
    discount: number
    images: {
        main: string
        gallery: string[]
    }
}

export interface TourMetaItem {
    icon?: React.ReactNode
    label: string
    value: string
    variant?: "default" | "primary" | "outline"
}

export interface TourOrganizer {
    name: string
    rating: number
    avatar: string
}

export interface TourDetails {
    days: number
    type: string
    language: string
    comfort: string
    activity: string
    ageGroup: string
}

export interface TourPricing {
    currentPrice: number
    originalPrice: number
    discountPercent: number
    pricePerDay: number
    totalDays: number
    prepayment: number
}

export interface TourData {
    slug: string
    title: string
    pricing: TourPricing
    dateRange: { start: string; end: string }
    availableSpots: number
    totalSpots: number
    details: TourDetails
    organizer: Organizer
    tags: string[]
    instantBooking: boolean
    description: string
}
