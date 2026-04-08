import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"

export interface MediaItem {
    src: string
    img: boolean
    video: boolean
    alt?: string
    id?: string
}

interface MediaViewerState {
    media: MediaItem[]
    startIndex?: number
    alt?: string
}

interface MediaViewerActions {
    setMediaViewerState: (vals: MediaViewerState) => void
}

export const useMediaViewerStore = create<
    MediaViewerState & MediaViewerActions
>()((set) => ({
    media: [],
    startIndex: 0,
    setMediaViewerState: (vals) => {
        set(filterDefinedValues(vals))
    },
}))
