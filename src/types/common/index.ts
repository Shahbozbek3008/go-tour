import { Locale } from "next-intl"
import { PropsWithChildren } from "react"

export interface NotificationTabsCount {
    chat: number
    post: number
    system: number
    user: number
}

export interface IPaginatedResponse<T> {
    count: number
    previous: string | null
    next: string | null
    results: T[]
    notification_tabs_count?: NotificationTabsCount
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
