import { LS } from "@/lib/constants/localstorage"
import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SearchState {
    focus: boolean
    searchDropDownContentHeight: number
}

interface SearchActions {
    setSearchState: (val: Partial<SearchState>) => void
}

export const useSearchStore = create<SearchActions & SearchState>()(
    persist(
        (set) => ({
            focus: false,
            searchDropDownContentHeight: 0,
            setSearchState: (val) => {
                set({ ...filterDefinedValues(val) })
            },
        }),
        { name: LS.SEARCH },
    ),
)
