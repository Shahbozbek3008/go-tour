"use client"

import { ProductCard, ProductGridSkeleton } from "@/components/card"
import { SortDropdown } from "@/components/common/sort-dropdown"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { useFavouritesListQuery } from "../_hooks"

export const FavouriteLayout = () => {
    const pageSize = 12
    const params = useSearch()
    const searchParams = useSearchParams()
    const { data, favouritesList, isLoading } = useFavouritesListQuery({
        params: {
            type: "FAVORITE",
            sortBy: searchParams.get("sortBy") || null,
            page: params.page ? Number(params.page) - 1 : 0,
            size: pageSize,
        },
    })

    const favourites = useMemo(() => {
        return adaptTours(favouritesList)
    }, [favouritesList])

    return (
        <div className="home-container py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Sevimli turlar</h2>
                <SortDropdown />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {isLoading ?
                    <ProductGridSkeleton count={12} />
                :   favourites?.map((item) => {
                        return <ProductCard key={item.id} tour={item} />
                    })
                }
            </div>
            <ParamPagination
                pageSize={pageSize}
                count={data?.totalElements}
                className="mt-12 justify-end"
            />
        </div>
    )
}
