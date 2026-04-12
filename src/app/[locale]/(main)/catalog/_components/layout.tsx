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
        <div className="w-full">
            <CatalogHeader />

            <div className="flex items-start gap-8 lg:p-15 p-6">
                <div className="hidden lg:block sticky top-24">
                    <CatalogLeftSide />
                </div>
                <div className="flex-1 min-w-0 w-full">
                    <CatalogRightSide setSheetOpen={setSheetOpen} />
                </div>
            </div>

            <div className="p-15">
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
