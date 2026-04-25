export interface TourDay {
    id: number
    tourId: number
    dayNumber: number
    titleUz: string
    titleRu: string
    descriptionUz: string
    descriptionRu: string
    imageUrls: string[]
}

export interface TourProgram {
    days: TourDay[]
}
