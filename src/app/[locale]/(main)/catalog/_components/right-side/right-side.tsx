"use client"

import { ProductCard, ProductGridSkeleton } from "@/components/card"
import { SortDropdown, SortKey } from "@/components/common/sort-dropdown"
import { ParamPagination } from "@/components/filter/param-pagination"
import { useTourSearch } from "@/hooks/react-query/use-tour-search-query"
import { useDebounce } from "@/hooks/use-debounce"
import useSearch from "@/hooks/use-search"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useFilter } from "../../_hooks"
import { FilterTriggerButton } from "../left-side/filter-trigger-button"
import { ActiveFilterBadge } from "./active-filter-badge"

interface CatalogRightSideProps {
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CatalogRightSide = ({ setSheetOpen }: CatalogRightSideProps) => {
    const {
        activeFiltersCount,
        filters,
        activeFilterBadges,
        removeFilterBadge,
    } = useFilter()
    const params = useSearch()
    const pageSize = 12
    const searchParams = useSearchParams()
    const debouncedFilters = useDebounce(filters, 400)

    const { data, tours, isLoading } = useTourSearch({
        deps: [debouncedFilters, params.page],
        params: {
            page: params.page ? Number(params.page) - 1 : 0,
            size: pageSize,
        },
        data: {
            categories:
                debouncedFilters.category !== "all" ?
                    [debouncedFilters.category.toUpperCase()]
                :   null,
            minPrice:
                debouncedFilters.priceRange[0] === 0 ?
                    null
                :   debouncedFilters.priceRange[0],
            maxPrice:
                debouncedFilters.priceRange[1] === 10000 ?
                    null
                :   debouncedFilters.priceRange[1],
            duration:
                debouncedFilters.duration !== "all" ?
                    debouncedFilters.duration
                :   null,
            rate:
                debouncedFilters.rate !== "all" ? debouncedFilters.rate : null,
            promotional: debouncedFilters.promotional ? true : null,
            guaranteed: debouncedFilters.guaranteed ? true : null,
            languages:
                debouncedFilters.languages.length > 0 ?
                    debouncedFilters.languages
                :   null,
            sortBy: searchParams.get("sortBy") as SortKey,
            destinationId: searchParams.get("destination") as string,
            startDate: searchParams.get("startDate") as string,
            endDate: searchParams.get("endDate") as string,
        },
    })

    const adaptedTours = React.useMemo(() => {
        return adaptTours(tours ?? [])
    }, [tours])

    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-between lg:hidden">
                    <FilterTriggerButton
                        activeCount={activeFiltersCount}
                        onClick={() => setSheetOpen(true)}
                    />
                </div>
                <ActiveFilterBadge
                    activeFilterBadges={activeFilterBadges}
                    removeFilterBadge={removeFilterBadge}
                />
                <SortDropdown />
            </div>

            <motion.div
                layout
                className="grid gap-5"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                }}
            >
                {isLoading ?
                    <ProductGridSkeleton count={6} />
                :   adaptedTours?.map((tour, i) => (
                        <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: i * 0.04,
                            }}
                        >
                            <ProductCard tour={tour} />
                        </motion.div>
                    ))
                }
            </motion.div>
            <ParamPagination
                pageSize={pageSize}
                count={data?.totalElements}
                className="mt-12 justify-end"
            />
        </div>
    )
}

export default CatalogRightSide
