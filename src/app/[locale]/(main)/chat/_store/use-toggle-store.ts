import { create } from "@/configs/zustand"
import type { ToggleActions, ToggleState } from "../_types/store"

export const useToggleStore = create<ToggleState & ToggleActions>((set) => ({
    userOpen: false,
    isCollapsed: false,
    profileOpen: false,
    setUserOpen: (open) => set({ userOpen: open }),
    setProfileOpen: (open) => set({ profileOpen: open }),
    closeAll: () => set({ profileOpen: false, userOpen: false }),
    toggleIsCollapsed: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
}))
