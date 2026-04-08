import { create } from "zustand"
import { OutreachhubItem } from "../_types"

interface OutreachHubState {
    item: OutreachhubItem | null
    setItem: (item: OutreachhubItem) => void
}

export const useOutreachHubStore = create<OutreachHubState>((set) => ({
    item: null,
    setItem: (item) => set({ item }),
}))
