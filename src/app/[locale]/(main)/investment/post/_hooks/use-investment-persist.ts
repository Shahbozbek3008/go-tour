import { LS } from "@/lib/constants/localstorage"
import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { InvestmentItemDetail } from "../../_types"
import { InvestmentItemForm } from "../_types"

interface State {
    previewData: InvestmentItemDetail | null
    formData: InvestmentItemForm | null
}

interface Actions {
    setInvestmentPersistState: (val: State) => void
    reset: () => void
}

export const useInvestmentPersist = create<State & Actions>()(
    persist(
        (set) => ({
            previewData: null,
            formData: null,
            setInvestmentPersistState: (val) => {
                set(filterDefinedValues(val))
            },
            reset: () => {
                set({
                    previewData: null,
                    formData: null,
                })
            },
        }),
        { name: LS.INVESTMENT },
    ),
)
