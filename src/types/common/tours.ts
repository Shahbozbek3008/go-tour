export interface Tour {
    id: number
    title: string
    subtitle: string
    image: string
    price: number
    originalPrice?: number
    discount?: number
    days: number
    rating: number
    reviews: number
    location: string
    dates: string
    author: string
    authorAvatar: string
    badge: string
    badgeColor: string
    isNew?: boolean
    category: string
}
