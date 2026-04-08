import { LS } from "@/lib/constants/localstorage"
import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MarketplaceProductDetail } from "../../_types"
import { MarketplaceProductForm } from "../_types"

interface State {
    previewData: MarketplaceProductDetail | null
    formData: MarketplaceProductForm | null
}

interface Actions {
    setMarketplacePersistState: (val: State) => void
    reset: () => void
}

export const useMarketplacePersist = create<State & Actions>()(
    persist(
        (set) => ({
            previewData: null,
            formData: null,
            setMarketplacePersistState: (val) => {
                set(filterDefinedValues(val))
            },
            reset: () => {
                set({
                    previewData: null,
                    formData: null,
                })
            },
        }),
        { name: LS.MARKETPLACE },
    ),
)
