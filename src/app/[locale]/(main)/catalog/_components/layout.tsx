import { CatalogHeader } from "./header"
import { CatalogLeftSide } from "./left-side"
import { CatalogRightSide } from "./right-side"
import { SpecialOffers } from "./special-offers"

export const CatalogLayout = () => {
    return (
        <div className="w-full">
            <CatalogHeader />
            <div className="flex items-start gap-8 p-15">
                <CatalogLeftSide />
                <CatalogRightSide />
            </div>
            <div className="p-15">
                <SpecialOffers />
            </div>
        </div>
    )
}
