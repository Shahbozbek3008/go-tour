import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const TARGET_SECTOR_OPTIONS: Option[] = [
    { id: "Technology & Fintech", name: "technologyFintech" },
    { id: "Energy & Renewables", name: "energyRenewables" },
    { id: "Real Estate", name: "realEstate" },
    { id: "Healthcare", name: "healthcare" },
    { id: "Industrial / Manufacturing", name: "industrialManafacturing" },
    { id: "Consumer & Retail", name: "consumerRetail" },
]
