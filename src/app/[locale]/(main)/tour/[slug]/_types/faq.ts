import { ReactNode } from "react"

export interface FaqItem {
    id: string
    title: string
    content: ReactNode
}

export interface GTKItem {
    id: number
    tourId: number
    titleUz: string
    titleRu: string
    descriptionUz: string
    descriptionRu: string
}
