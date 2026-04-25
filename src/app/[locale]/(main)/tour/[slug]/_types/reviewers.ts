export type MediaType = "IMAGE" | "VIDEO"

export interface Media {
    id: number
    isMain: boolean
    orderIndex: number
    type: MediaType
    url: string
}

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED"

import { Review } from "./reviews"

export type { Review }


export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

export interface Pageable {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: Sort
    unpaged: boolean
}

export interface ReviewsResponse {
    content: Review[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: Pageable
    size: number
    sort: Sort
    totalElements: number
    totalPages: number
}
