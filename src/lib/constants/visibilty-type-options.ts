import { TranslationKey } from "@/components/common/translation/types"
import { VisibilityType } from "@/types/common/extra"

interface Opt {
    id: VisibilityType
    name: TranslationKey
}
export const VISIBILITY_TYPE_OPTIONS: Opt[] = [
    {
        id: "public",
        name: "public",
    },
    {
        id: "my_connections",
        name: "myConnections",
    },
    {
        id: "manual",
        name: "manual",
    },
]
