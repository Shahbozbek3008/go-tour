import { Locale } from "next-intl"
import { PropsWithChildren } from "react"

export interface NotificationTabsCount {
    chat: number
    post: number
    system: number
    user: number
}

export interface IPaginatedResponse<T> {
    page: number
    size: number
    totalElements: number
    totalPages: number
    tours: T[]
}

export type OptionIdNumber = {
    name: string
    id: number
}
export type OptionIdString = {
    name: string
    id: string
}

export type LocaleParams = Promise<{ locale: Locale }>
export interface PropsWithLocaleParams {
    params: LocaleParams
}
export interface Slug<S = string> {
    slug: S
}
export interface PropsWithLocaleSlug<S = string> {
    params: Promise<{ locale: Locale } & Slug<S>>
}
export type PropsWithChildrenLocale = PropsWithChildren & PropsWithLocaleParams
