"use client"
import { createContext, useContext } from "react"

const SlugContext = createContext<string | null>(null)

export function SlugProvider({
    slug,
    children,
}: {
    slug: string
    children: React.ReactNode
}) {
    return <SlugContext.Provider value={slug}>{children}</SlugContext.Provider>
}

export function useSlug(slug?: string) {
    const ctx = useContext(SlugContext)
    if (slug) return slug
    if (!ctx) throw new Error("useSlug must be used within SlugProvider")
    return ctx
}

export function useSlugWithoutThrowError(slug?: string) {
    const ctx = useContext(SlugContext)
    if (slug) return slug
    return ctx
}
