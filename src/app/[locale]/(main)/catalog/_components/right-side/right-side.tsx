"use client"

import { ProductCard, ProductGridSkeleton } from "@/components/card"
import { SortDropdown, SortKey } from "@/components/common/sort-dropdown"
import { useInfiniteTourSearch } from "@/hooks/react-query/use-tour-search-query"
import { useDebounce } from "@/hooks/use-debounce"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { cn } from "@/lib/utils/shadcn"
import { keepPreviousData } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { SearchX } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { useFilter } from "../../_hooks"
import { FilterTriggerButton } from "../left-side/filter-trigger-button"
import { ActiveFilterBadge } from "./active-filter-badge"

interface CatalogRightSideProps {
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CatalogRightSide = ({ setSheetOpen }: CatalogRightSideProps) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.1,
        rootMargin: "200px",
    })
    const {
        filters,
        activeFiltersCount,
        activeFilterBadges,
        removeFilterBadge,
    } = useFilter()
    const debouncedFilters = useDebounce(filters, 400)

    const {
        data: toursData,
        totalElements,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteTourSearch({
        deps: [debouncedFilters],
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
            hasReviews: debouncedFilters.hasReviews ? true : null,
            visaRequired: debouncedFilters.visaRequired ? false : null,
            childDiscount: debouncedFilters.childDiscount ?? null,
            languages:
                debouncedFilters.languages.length > 0 ?
                    debouncedFilters.languages
                :   null,
            sortBy: searchParams.get("sortBy") as SortKey,
            destinationId: searchParams.get("destination") as string,
            agentId: searchParams.get("agentId") as string,
            startDate: searchParams.get("startDate") as string,
            endDate: searchParams.get("endDate") as string,
            destinationIds: debouncedFilters.destinations ?? null,
        },
        options: {
            placeholderData: keepPreviousData,
        },
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            const originalRestoration = window.history.scrollRestoration
            window.history.scrollRestoration = "manual"
            window.scrollTo({ top: 0, behavior: "instant" })
            return () => {
                window.history.scrollRestoration = originalRestoration
            }
        }
    }, [])

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

    const adaptedTours = useMemo(() => adaptTours(toursData ?? []), [toursData])

    const showSkeleton = isLoading && toursData.length === 0
    const isEmpty = !isLoading && !isFetching && toursData.length === 0

    return (
        <div className="flex-1 min-w-0 flex flex-col min-h-[600px]">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between gap-4 min-h-[40px]">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="lg:hidden shrink-0">
                            <FilterTriggerButton
                                activeCount={activeFiltersCount}
                                onClick={() => setSheetOpen(true)}
                            />
                        </div>
                        <div className="hidden md:block flex-1">
                            <ActiveFilterBadge
                                activeFilterBadges={activeFilterBadges}
                                removeFilterBadge={removeFilterBadge}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <div className="bg-zinc-50/50 px-3 py-1.5 rounded-lg border border-zinc-100/50 backdrop-blur-sm">
                            <p className="text-[14px] sm:text-[15px] text-zinc-900 font-semibold tracking-tight">
                                {showSkeleton ?
                                    <span className="inline-block w-20 h-4 bg-zinc-200/50 animate-pulse rounded-sm align-middle" />
                                :   <span
                                        className={cn(
                                            "transition-opacity duration-300",
                                            isFetching && !isFetchingNextPage ?
                                                "opacity-40"
                                            :   "opacity-100",
                                        )}
                                    >
                                        {t("foundToursCount", {
                                            count: totalElements,
                                        })}
                                    </span>
                                }
                            </p>
                        </div>
                        <SortDropdown />
                    </div>
                </div>

                <div className="md:hidden">
                    <ActiveFilterBadge
                        activeFilterBadges={activeFilterBadges}
                        removeFilterBadge={removeFilterBadge}
                    />
                </div>
            </div>

            <div className="relative flex-1">
                <motion.div
                    layout
                    initial={false}
                    animate={{
                        opacity:
                            isFetching && !showSkeleton && !isFetchingNextPage ?
                                0.6
                            :   1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-5"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                    }}
                >
                    {showSkeleton ?
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
                                }}
                            >
                                <ProductCard tour={tour} />
                            </motion.div>
                        ))
                    }
                </motion.div>

                {isEmpty && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center"
                    >
                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                            <SearchX className="w-8 h-8 text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                            {t("noToursFound")}
                        </h3>
                        <p className="text-zinc-500 max-w-[280px]">
                            {t("tryChangingFilters")}
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Infinite Scroll trigger & Skeleton Loader */}
            {!isLoading && toursData.length > 0 && hasNextPage && (
                <div className="mt-5">
                    {isFetchingNextPage && (
                        <div
                            className="grid gap-5 mb-10"
                            style={{
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(250px, 1fr))",
                            }}
                        >
                            <ProductGridSkeleton count={4} />
                        </div>
                    )}
                    <div ref={loadMoreRef} className="h-10 w-full" />
                </div>
            )}
        </div>
    )
}

export default CatalogRightSide
