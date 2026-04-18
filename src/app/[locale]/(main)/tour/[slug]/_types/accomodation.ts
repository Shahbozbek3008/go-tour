export type ComfortLevel = "Economy" | "Comfort" | "Premium" | "Luxury"

export interface AccommodationImage {
    src: string
    alt: string
}

export interface AccommodationOption {
    id: string
    location: string
    comfortLevel: ComfortLevel
    comfortRating: number
    maxRating: number
    description: string
    images: AccommodationImage[]
}
