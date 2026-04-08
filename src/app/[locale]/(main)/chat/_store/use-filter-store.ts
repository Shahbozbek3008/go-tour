import { create } from "@/configs/zustand"
import { FilterActions, FilterState } from "../_types/store"

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
    folder: null,
    search: "",
    setSearch: (value) => set({ search: value }),
    setFolder: (folder: string | null) => set({ folder }),
}))
