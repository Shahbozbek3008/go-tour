export type ApiCategory = {
    category: string
    order: number
    imageUrl: string
}

export type NormalizedCategory = {
    id: string
    label: string
    image: string
    featured?: boolean
}
