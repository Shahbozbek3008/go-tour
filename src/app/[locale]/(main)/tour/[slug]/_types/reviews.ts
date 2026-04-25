export type MediaType = "IMAGE" | "VIDEO"

export interface ReviewMedia {
    id: number
    url: string
    type: MediaType
    orderIndex: number
    isMain: boolean | null
}

export interface Review {
    id: number
    rating: number
    comment: string
    reply: string | null
    status: string
    userId: number
    userFullName: string
    tourId: number
    createdAt: number
    mediaUrls: ReviewMedia[]
}

export interface ReviewsSectionProps {
    rating: number
    totalCount: number
    reviews: Review[]
}
