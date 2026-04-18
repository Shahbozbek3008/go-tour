export interface DayImage {
    src: string
    alt: string
}

export interface TourDay {
    id: string
    dayNumber: number
    title: string
    images: DayImage[]
    description: string
}

export interface TourProgram {
    days: TourDay[]
}
