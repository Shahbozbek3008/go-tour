"use client"

import { useCurrency } from "@/app/_providers/currency-provider"
import React from "react"
import { getPriceLimit } from "../_constants"
import { DEFAULT_FILTERS } from "../_constants/filter"
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
    const { currency } = useCurrency()
    const {
        min: PRICE_MIN,
        max: PRICE_MAX,
        step: PRICE_STEP,
    } = getPriceLimit(currency)

    const hasActiveFilters =
        filters.category !== "all" ||
        filters.priceRange[0] !== PRICE_MIN ||
        filters.priceRange[1] !== PRICE_MAX ||
        filters.duration !== "all" ||
        filters.rate !== "all" ||
        filters.promotional ||
        filters.guaranteed ||
        filters.visaRequired ||
        filters.hasReviews ||
        filters.childrenCount !== null ||
        filters.childAge !== null ||
        filters.tags.length > 0 ||
        filters.languages.length > 0 ||
        filters.destinations.length > 0

    const handlePriceSlider = (values: number[]) => {
        const [min, max] = values as [number, number]
        setFilters((prev) => ({ ...prev, priceRange: [min, max] }))
        setMinInput(String(min))
        setMaxInput(String(max))
    }

    const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        const num = Number(raw)
        if (!isNaN(num) && num > PRICE_MAX) {
            setMaxInput(String(PRICE_MAX))
            setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], PRICE_MAX],
            }))
            return
        }
        setMaxInput(raw)
        if (!isNaN(num) && num <= PRICE_MAX && num >= filters.priceRange[0]) {
            setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], num],
            }))
        }
    }

    const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        const num = Number(raw)
        if (!isNaN(num) && num >= filters.priceRange[1]) {
            setMinInput(String(filters.priceRange[1] - PRICE_STEP))
            setFilters((prev) => ({
                ...prev,
                priceRange: [
                    filters.priceRange[1] - PRICE_STEP,
                    prev.priceRange[1],
                ],
            }))
            return
        }
        setMinInput(raw)
        if (!isNaN(num) && num >= PRICE_MIN && num < filters.priceRange[1]) {
            setFilters((prev) => ({
                ...prev,
                priceRange: [num, prev.priceRange[1]],
            }))
        }
    }

    const handleMaxInputBlur = () => {
        const num = Number(maxInput)
        if (isNaN(num) || num > PRICE_MAX) {
            setMaxInput(String(PRICE_MAX))
            setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], PRICE_MAX],
            }))
        } else if (num < filters.priceRange[0]) {
            setMaxInput(String(filters.priceRange[0]))
        }
    }

    const handleMinInputBlur = () => {
        const num = Number(minInput)
        if (isNaN(num) || num < PRICE_MIN) {
            setMinInput(String(PRICE_MIN))
            setFilters((prev) => ({
                ...prev,
                priceRange: [PRICE_MIN, prev.priceRange[1]],
            }))
        } else if (num > filters.priceRange[1]) {
            setMinInput(String(filters.priceRange[1]))
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

    const toggleDestination = (destId: number) => {
        setFilters((prev) => ({
            ...prev,
            destinations:
                prev.destinations.includes(destId) ?
                    prev.destinations.filter((d) => d !== destId)
                :   [...prev.destinations, destId],
        }))
    }

    const resetFilters = () => {
        setFilters(() => ({
            ...DEFAULT_FILTERS,
            priceRange: [PRICE_MIN, PRICE_MAX],
        }))
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
            filters.visaRequired,
            filters.hasReviews,
            filters.childrenCount !== null,
            filters.childAge !== null,
        ].filter(Boolean).length +
        filters.tags.length +
        filters.languages.length +
        filters.destinations.length

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
        if (filters.visaRequired)
            badges.push({ key: "visaRequired", label: "Vizasiz" })
        if (filters.hasReviews)
            badges.push({ key: "hasReviews", label: "Otziv bor" })
        if (filters.childrenCount !== null)
            badges.push({
                key: "childrenCount",
                label: `Bolalar soni: ${filters.childrenCount}`,
            })
        if (filters.childAge !== null)
            badges.push({
                key: "childAge",
                label:
                    filters.childAge === 0 ?
                        "1 yoshdan kichik"
                    :   `${filters.childAge} yosh`,
            })
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
            if (key === "visaRequired") return { ...prev, visaRequired: false }
            if (key === "hasReviews") return { ...prev, hasReviews: false }
            if (key === "childrenCount") return { ...prev, childrenCount: null }
            if (key === "childAge") return { ...prev, childAge: null }
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
            if (key.startsWith("dest-"))
                return {
                    ...prev,
                    destinations: prev.destinations.filter(
                        (d) => d !== Number(key.replace("dest-", "")),
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
        toggleDestination,
        handleMaxInputBlur,
        handleMinInputBlur,
    }
}
