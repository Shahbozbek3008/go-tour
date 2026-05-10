export type ApiCategory = {
    category: string
    order: number
    imageUrl: string
    nameUz: string
    nameRu: string
}

export type NormalizedCategory = {
    id: string
    label: string
    image: string
    featured?: boolean
    nameUz: string
    nameRu: string
}
