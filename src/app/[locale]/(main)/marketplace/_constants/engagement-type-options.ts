import { TranslationKey } from "@/components/common/translation/types"
import { EngagementType } from "../_types"

interface Opt {
    id: EngagementType
    name: TranslationKey
}

export const ENGAGEMENT_TYPE_OPTIONS: Opt[] = [
    { id: "one_time", name: "oneTime" },
    { id: "ongoing", name: "onGoing" },
]
