"use client"

import { useCurrency } from "@/app/_providers/currency-provider"
import { ProductCard, ProductGridSkeleton } from "@/components/card"
import { SortDropdown, SortKey } from "@/components/common/sort-dropdown"
import { useInfiniteTourSearch } from "@/hooks/react-query/use-tour-search-query"
import { useDebounce } from "@/hooks/use-debounce"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { cn } from "@/lib/utils/shadcn"
import { keepPreviousData } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useEffect, useMemo, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { getPriceLimit } from "../../_constants"
import { useFilter } from "../../_hooks"
import { FilterTriggerButton } from "../left-side/filter-trigger-button"
import { EmptyState } from "./empty-state"

interface CatalogRightSideProps {
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
    setTotalTours: React.Dispatch<React.SetStateAction<number>>
}

export const CatalogRightSide = ({
    setSheetOpen,
    setTotalTours,
}: CatalogRightSideProps) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.1,
        rootMargin: "200px",
    })
    const { filters, activeFiltersCount } = useFilter()
    const debouncedFilters = useDebounce(filters, 400)
    const { currency } = useCurrency()
    const { max: PRICE_MAX } = getPriceLimit(currency)

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
                debouncedFilters.priceRange[1] === PRICE_MAX ?
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
            childrenCount: debouncedFilters.childrenCount ?? null,
            childAge: debouncedFilters.childAge ?? null,
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
            name: searchParams.get("name") as string,
        },
        options: {
            placeholderData: keepPreviousData,
        },
    })

    // Sahifa birinchi yuklanishda footerga tushib qolmaslik uchun
    const isInitialMount = useRef(true)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const originalRestoration = window.history.scrollRestoration
            window.history.scrollRestoration = "manual"

            if (isInitialMount.current) {
                window.scrollTo({ top: 0, behavior: "instant" })
                isInitialMount.current = false
            }

            return () => {
                window.history.scrollRestoration = originalRestoration
            }
        }
    }, [])

    useEffect(() => {
        setTotalTours(totalElements)
    }, [totalElements])

    const catalogRef = React.useRef<HTMLDivElement>(null)

    const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
        if (!catalogRef.current) return
        const rect = catalogRef.current.getBoundingClientRect()
        if (rect.top < 0) {
            window.scrollTo({
                top: window.scrollY + rect.top - 100,
                behavior,
            })
        }
    }

    // Asosiy filterlar o'zgarganda — har doim scroll
    const scrollTriggerFilters = useMemo(
        () => ({
            category: debouncedFilters.category,
            priceRange: debouncedFilters.priceRange,
            duration: debouncedFilters.duration,
            rate: debouncedFilters.rate,
            promotional: debouncedFilters.promotional,
            guaranteed: debouncedFilters.guaranteed,
            hasReviews: debouncedFilters.hasReviews,
            visaRequired: debouncedFilters.visaRequired,
            destinations: debouncedFilters.destinations,
        }),
        [
            debouncedFilters.category,
            debouncedFilters.priceRange,
            debouncedFilters.duration,
            debouncedFilters.rate,
            debouncedFilters.promotional,
            debouncedFilters.guaranteed,
            debouncedFilters.hasReviews,
            debouncedFilters.visaRequired,
            debouncedFilters.destinations,
        ],
    )

    useEffect(() => {
        scrollToTop()
    }, [scrollTriggerFilters])

    // Til va bolalar filterlari — faqat natija bo'sh bo'lganda scroll
    const softTriggerFilters = useMemo(
        () => ({
            languages: debouncedFilters.languages,
            childrenCount: debouncedFilters.childrenCount,
            childAge: debouncedFilters.childAge,
        }),
        [
            debouncedFilters.languages,
            debouncedFilters.childrenCount,
            debouncedFilters.childAge,
        ],
    )

    const isEmpty = !isLoading && !isFetching && toursData.length === 0

    useEffect(() => {
        if (!isEmpty) return
        scrollToTop()
    }, [isEmpty, softTriggerFilters])

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

    const adaptedTours = useMemo(() => adaptTours(toursData ?? []), [toursData])

    const showSkeleton = isLoading && toursData.length === 0

    return (
        <div
            ref={catalogRef}
            className="flex-1 min-w-0 flex flex-col min-h-[600px] pb-24 md:pb-0"
        >
            <div className="flex flex-col gap-4 mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 min-h-[40px]">
                    <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
                        <div className="lg:hidden shrink-0">
                            <FilterTriggerButton
                                activeCount={activeFiltersCount}
                                onClick={() => setSheetOpen(true)}
                            />
                        </div>
                        <div className="lg:hidden block">
                            <SortDropdown />
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0">
                        <div className="bg-zinc-50/50 px-3 py-1.5 rounded-lg border border-zinc-100/50 backdrop-blur-sm hidden lg:block">
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
                        <div className="hidden lg:block">
                            <SortDropdown />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex-1">
                <motion.div
                    layout
                    initial={false}
                    transition={{ duration: 0.3 }}
                    className="grid gap-5 grid-cols-1 md:[grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]"
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

                {isEmpty && <EmptyState />}
            </div>

            {!isLoading && toursData.length > 0 && hasNextPage && (
                <div className="mt-5">
                    {isFetchingNextPage && (
                        <div className="grid gap-5 mb-10 grid-cols-1 md:[grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
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
