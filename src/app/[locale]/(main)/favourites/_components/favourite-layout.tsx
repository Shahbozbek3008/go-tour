"use client"

import { ProductCard, ProductGridSkeleton } from "@/components/card"
import { SortDropdown } from "@/components/common/sort-dropdown"
import ClientTranslate from "@/components/common/translation/client-translate"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteFavouritesListQuery } from "../_hooks"
import { EmptyFavourites } from "./empty"

export const FavouriteLayout = () => {
    const pageSize = 12
    const searchParams = useSearchParams()
    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.1,
        rootMargin: "200px",
    })

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteFavouritesListQuery({
            params: {
                type: "FAVORITE",
                sortBy: searchParams.get("sortBy") || null,
                size: pageSize,
            },
        })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

    const favourites = useMemo(() => {
        return adaptTours(data ?? [])
    }, [data])

    return (
        <div className="home-container py-10">
            {favourites?.length > 0 && (
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        <ClientTranslate translationKey="favourites" />
                    </h2>
                    <div className="hidden lg:block">
                        <SortDropdown />
                    </div>
                    <div className="lg:hidden block">
                        <SortDropdown iconOnly />
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {isLoading && favourites.length === 0 ?
                    <ProductGridSkeleton count={pageSize} />
                : favourites.length === 0 ?
                    <div className="col-span-full">
                        <EmptyFavourites />
                    </div>
                :   favourites.map((item, i) => (
                        <ProductCard key={`${item.id}-${i}`} tour={item} />
                    ))
                }
            </div>

            {!isLoading && favourites.length > 0 && hasNextPage && (
                <div className="mt-6">
                    {isFetchingNextPage && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ProductGridSkeleton count={4} />
                        </div>
                    )}
                    <div ref={loadMoreRef} className="h-10 w-full" />
                </div>
            )}
        </div>
    )
}
