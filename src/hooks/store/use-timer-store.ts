import { LS } from "@/lib/constants/localstorage"
import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface TimerState {
    timeLeft: number
    isTimerActive: boolean
}

interface TimerActions {
    setTimerState: (vals: Partial<TimerState>) => void
}

export const useTimerStore = create<TimerState & TimerActions>()(
    persist(
        (set) => ({
            timeLeft: 0,
            isTimerActive: true,
            setTimerState: (vals) => set(filterDefinedValues(vals)),
        }),
        { name: LS.TIMER },
    ),
)
