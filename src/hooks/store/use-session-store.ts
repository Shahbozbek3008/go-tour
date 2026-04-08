import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
    access: string | null
    refresh: string | null
}

type Actions = {
    setSessionState: (vals: Partial<State>) => void
}

export const useSessionStore = create<State & Actions>()(
    persist(
        (set) => ({
            access: null,
            refresh: null,
            setSessionState: (vals) => {
                set(vals)
            },
        }),
        {
            name: "session-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
