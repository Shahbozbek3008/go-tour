import React from "react"

export type FilterState = {
    category: string
}

const DEFAULT_FILTERS: FilterState = {
    category: "all",
}

export const useFilter = () => {
    const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS)

    const hasActiveFilters = filters.category !== "all"

    const handlePriceSlider = (values: number[]) => {
        const [min, max] = values as [number, number]
        setFilters((prev) => ({ ...prev }))
    }

    const resetFilters = () => {
        setFilters(DEFAULT_FILTERS)
    }

    const activeFiltersCount = [filters.category !== "all"].filter(
        Boolean,
    ).length

    return {
        filters,
        setFilters,
        resetFilters,
        hasActiveFilters,
        activeFiltersCount,
    }
}
