export type Currency = "USD" | "UZS"

export type Continent =
    | "asia"
    | "europe"
    | "africa"
    | "australia"
    | "north_america"
    | "south_america"

export interface MediaResponse {
    file: string
    size: number
    name: string
}

export interface DocumentPayload {
    document_url: string
    name: string
    size: number
    order_number?: number
    only_invites_allow?: boolean
}

export type VisibilityType = "public" | "manual" | "my_connections"
