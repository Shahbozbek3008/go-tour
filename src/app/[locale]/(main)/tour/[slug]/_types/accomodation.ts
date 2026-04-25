export interface AccommodationImage {
    src: string
    alt: string
}

export interface ApiAccommodationImage {
    url: string
    id: number
}

export interface AccommodationOption {
    id: number
    name: string
    descriptionUz: string
    descriptionRu: string
    comfortLevel: number
    images: ApiAccommodationImage[]
}
