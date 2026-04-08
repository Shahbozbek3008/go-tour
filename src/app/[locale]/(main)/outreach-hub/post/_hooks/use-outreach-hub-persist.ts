import { LS } from "@/lib/constants/localstorage"
import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { OutreachhubItemDetail } from "../../_types"
import { OutreachHubItemForm } from "../_types"

interface State {
    previewData: OutreachhubItemDetail | null
    formData: OutreachHubItemForm | null
}

interface Actions {
    setOutreachHubPersistState: (val: State) => void
    reset: () => void
}

export const useOutreachHubPersist = create<State & Actions>()(
    persist(
        (set) => ({
            previewData: null,
            formData: null,
            setOutreachHubPersistState: (val) => {
                set(filterDefinedValues(val))
            },
            reset: () => {
                set({
                    previewData: null,
                    formData: null,
                })
            },
        }),
        { name: LS.OUTREACH_HUB },
    ),
)
