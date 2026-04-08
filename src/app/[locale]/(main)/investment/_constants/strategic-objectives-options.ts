import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const STRATEGIC_OBJECTIVES_OPTIONS: Option[] = [
    { id: "Market Expansion", name: "marketExpansion" },
    { id: "Technology Access", name: "technologyAccess" },
    { id: "Geographic Expansion", name: "geographicExpansion" },
    { id: "Product Synergy", name: "productSynergy" },
    { id: "Cost Synergy", name: "costSynergy" },
    { id: "Talent Acquisition", name: "emptyStr" },
]
