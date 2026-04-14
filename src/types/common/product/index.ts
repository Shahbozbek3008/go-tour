import { StaticImageData } from "next/image"

interface User {
    name: string
    avatarUrl: string
}

export interface Item {
    id: number
    title: string
    description: string
    image: StaticImageData
    isSaved?: boolean
    postedAgo: string
    badge: string
    minOrder: string
    user: User
    price: string
}

export interface ProductCardProps {
    item: Item
    className?: string
    value: string
    variant:
        | "marketplace"
        | "investment"
        | "outreach_hub"
        | "bookmark"
        | "blogs"
}
