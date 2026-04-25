"use client"

import React from "react"
import { DEFAULT_FILTERS, PRICE_MAX, PRICE_MIN } from "../_constants"
import { useFilterContext } from "../_context/filter-context"

export const useFilter = () => {
    const {
        filters,
        setFilters,
        minInput,
        setMinInput,
        maxInput,
        setMaxInput,
    } = useFilterContext()

    const hasActiveFilters =
        // filters.category !== "all" ||
        filters.priceRange[0] !== PRICE_MIN ||
        filters.priceRange[1] !== PRICE_MAX ||
        filters.duration !== "all" ||
        filters.rate !== "all" ||
        filters.promotional ||
        filters.guaranteed ||
        filters.tags.length > 0 ||
        filters.languages.length > 0

    const handlePriceSlider = (values: number[]) => {
        const [min, max] = values as [number, number]
        setFilters((prev) => ({ ...prev, priceRange: [min, max] }))
        setMinInput(String(min))
        setMaxInput(String(max))
    }

    const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        setMinInput(raw)
        const num = Number(raw)
        if (!isNaN(num) && num >= PRICE_MIN && num <= filters.priceRange[1]) {
            setFilters((prev) => ({
                ...prev,
                priceRange: [num, prev.priceRange[1]],
            }))
        }
    }

    const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        setMaxInput(raw)
        const num = Number(raw)
        if (!isNaN(num) && num <= PRICE_MAX && num >= filters.priceRange[0]) {
            setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], num],
            }))
        }
    }

    const toggleTag = (tag: string) => {
        setFilters((prev) => ({
            ...prev,
            tags:
                prev.tags.includes(tag) ?
                    prev.tags.filter((t) => t !== tag)
                :   [...prev.tags, tag],
        }))
    }

    const toggleLanguage = (langId: string) => {
        setFilters((prev) => ({
            ...prev,
            languages:
                prev.languages.includes(langId) ?
                    prev.languages.filter((l) => l !== langId)
                :   [...prev.languages, langId],
        }))
    }

    const resetFilters = () => {
        setFilters(DEFAULT_FILTERS)
        setMinInput(String(PRICE_MIN))
        setMaxInput(String(PRICE_MAX))
    }

    const activeFiltersCount =
        [
            filters.category !== "all",
            filters.priceRange[0] !== PRICE_MIN ||
                filters.priceRange[1] !== PRICE_MAX,
            filters.duration !== "all",
            filters.rate !== "all",
            filters.promotional,
            filters.guaranteed,
        ].filter(Boolean).length +
        filters.tags.length +
        filters.languages.length

    const activeFilterBadges = React.useMemo(() => {
        const badges: { key: string; label: string }[] = []
        if (filters.category !== "all")
            badges.push({ key: "category", label: filters.category })
        if (filters.duration !== "all")
            badges.push({ key: "duration", label: filters.duration })
        if (filters.rate !== "all")
            badges.push({ key: "rate", label: `${filters.rate}★` })
        if (filters.promotional)
            badges.push({ key: "promotional", label: "Skidkali" })
        if (filters.guaranteed)
            badges.push({ key: "guaranteed", label: "Ishonchli" })
        filters.tags.forEach((tag) =>
            badges.push({ key: `tag-${tag}`, label: tag }),
        )
        filters.languages.forEach((lang) =>
            badges.push({ key: `lang-${lang}`, label: lang }),
        )
        return badges
    }, [filters])

    const removeFilterBadge = (key: string) => {
        setFilters((prev) => {
            if (key === "category") return { ...prev, category: "all" }
            if (key === "duration") return { ...prev, duration: "all" }
            if (key === "rate") return { ...prev, rate: "all" }
            if (key === "promotional") return { ...prev, promotional: false }
            if (key === "guaranteed") return { ...prev, guaranteed: false }
            if (key.startsWith("tag-"))
                return {
                    ...prev,
                    tags: prev.tags.filter(
                        (t) => t !== key.replace("tag-", ""),
                    ),
                }
            if (key.startsWith("lang-"))
                return {
                    ...prev,
                    languages: prev.languages.filter(
                        (l) => l !== key.replace("lang-", ""),
                    ),
                }
            return prev
        })
    }

    return {
        filters,
        minInput,
        maxInput,
        toggleTag,
        setFilters,
        resetFilters,
        handleMinInput,
        handleMaxInput,
        hasActiveFilters,
        handlePriceSlider,
        activeFiltersCount,
        activeFilterBadges,
        removeFilterBadge,
        toggleLanguage,
    }
}
