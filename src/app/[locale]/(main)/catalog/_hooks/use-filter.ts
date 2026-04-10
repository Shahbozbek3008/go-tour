import React from "react"
import { PRICE_MAX, PRICE_MIN } from "../_constants"

export type FilterState = {
    category: string
    priceRange: [number, number]
    duration: string
    rating: string
    tags: string[]
}

const DEFAULT_FILTERS: FilterState = {
    category: "all",
    priceRange: [PRICE_MIN, PRICE_MAX],
    duration: "all",
    rating: "all",
    tags: [],
}

export const useFilter = () => {
    const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS)
    const [minInput, setMinInput] = React.useState(String(PRICE_MIN))
    const [maxInput, setMaxInput] = React.useState(String(PRICE_MAX))

    const hasActiveFilters =
        filters.category !== "all" ||
        filters.priceRange[0] !== PRICE_MIN ||
        filters.priceRange[1] !== PRICE_MAX ||
        filters.duration !== "all" ||
        filters.rating !== "all" ||
        filters.tags.length > 0

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
            filters.rating !== "all",
        ].filter(Boolean).length + filters.tags.length

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
    }
}
