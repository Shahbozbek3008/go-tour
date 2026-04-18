export interface Reviewer {
    name: string
    avatarUrl?: string
    rating: number
    date: string
}

export interface ReviewImage {
    src: string
    alt: string
}

export interface Review {
    id: string
    reviewer: Reviewer
    text: string
    images?: ReviewImage[]
}

export interface ReviewsSectionProps {
    rating: number
    totalCount: number
    reviews: Review[]
}
