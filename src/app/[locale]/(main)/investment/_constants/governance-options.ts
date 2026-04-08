import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const GOVERNANCE_OPTIONS: Option[] = [
    { id: "Board seat", name: "boardSeat" },
    { id: "Active oversight", name: "activeOversight" },
]
