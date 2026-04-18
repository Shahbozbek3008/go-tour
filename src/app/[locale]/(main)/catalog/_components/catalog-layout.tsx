"use client"

import { SpecialOffers } from "@/components/special-offers"
import { useState } from "react"
import { CatalogHeader } from "./header"
import { CatalogLeftSide } from "./left-side"
import { FilterBottomSheet } from "./left-side/filter-bottom-sheet"
import { CatalogRightSide } from "./right-side"

export const CatalogLayout = () => {
    const [sheetOpen, setSheetOpen] = useState(false)

    return (
        <div className="w-full overflow-x-hidden md:overflow-visible">
            <div className="home-container w-full flex flex-col gap-6 pt-6">
                <CatalogHeader />
            </div>

            <div className="home-container flex items-start gap-8 lg:py-16 py-6">
                <div className="hidden lg:block sticky top-24">
                    <CatalogLeftSide />
                </div>
                <div className="flex-1 min-w-0 w-full">
                    <CatalogRightSide setSheetOpen={setSheetOpen} />
                </div>
            </div>

            <div className="home-container py-10">
                <SpecialOffers />
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
