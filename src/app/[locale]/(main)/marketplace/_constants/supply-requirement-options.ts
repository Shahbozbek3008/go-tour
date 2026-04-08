import { TranslationKey } from "@/components/common/translation/types"
import { MarketplaceSupplyRequirement } from "../_types"

interface Opt {
    id: MarketplaceSupplyRequirement
    name: TranslationKey
}
export const SUPPLY_REQUIREMENT_OPTIONS: Opt[] = [
    {
        id: "monthly",
        name: "monthly",
    },
    {
        id: "yearly",
        name: "yearly",
    },
    {
        id: "one_time",
        name: "oneTime",
    },
]
