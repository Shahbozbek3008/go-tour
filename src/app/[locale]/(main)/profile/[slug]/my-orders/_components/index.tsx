"use client"

import { ProductCard } from "@/components/card"
import { MOCK_TOURS } from "@/lib/constants/mockdata"
import { useState } from "react"
import { useFilter, useMyBookingsQuery } from "../_hooks"
import { EmptyOrders } from "./empty"
import { MyOrdersFilter } from "./filter"
import { FilterBottomSheet } from "./filter/filter-bottom-sheet"
import { FilterTriggerButton } from "./filter/filter-trigger-button"

export const ComponentIndex = () => {
    const { activeFiltersCount } = useFilter()
    const [sheetOpen, setSheetOpen] = useState(false)
    const { allBookings } = useMyBookingsQuery()

    return (
        <div className="flex items-start lg:gap-8 md:gap-4 gap-0">
            <div className="hidden lg:block sticky top-24">
                <MyOrdersFilter />
            </div>
            <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center justify-between lg:hidden mb-4">
                    <FilterTriggerButton
                        activeCount={activeFiltersCount}
                        onClick={() => setSheetOpen(true)}
                    />
                </div>
                {allBookings.length === 0 ?
                    <EmptyOrders />
                :   <div
                        className="grid gap-5 grid-cols-1 md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]"
                    >
                        {MOCK_TOURS.map((tour) => (
                            <ProductCard
                                tour={tour}
                                key={tour.id}
                                hasLike={false}
                            />
                        ))}
                    </div>
                }
            </div>
            <div className="lg:hidden">
                <FilterBottomSheet
                    open={sheetOpen}
                    onOpenChange={setSheetOpen}
                />
            </div>
        </div>
    )
}
