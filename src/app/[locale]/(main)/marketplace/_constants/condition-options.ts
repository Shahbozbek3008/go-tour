import { TranslationKey } from "@/components/common/translation/types"
import { MarketplaceProductCondition } from "../_types"

interface Option {
    id: MarketplaceProductCondition
    name: TranslationKey
}

export const CONDITION_OPTIONS: Option[] = [
    { id: "new", name: "new" as TranslationKey },
    { id: "used", name: "used" as TranslationKey },
    { id: "republished", name: "republished" as TranslationKey },
    {
        id: "Non standard Inventory",
        name: "nonStandardInventory" as TranslationKey,
    },
    { id: "Not applicable", name: "notApplicable" as TranslationKey },
]
