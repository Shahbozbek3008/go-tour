import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const TARGET_INDUSTRY_OPTIONS: Option[] = [
    { id: "Technology & Innovation", name: "technologyInnovation" },
    { id: "Energy & Renewables", name: "energyRenewables" },
    { id: "Real Estate", name: "realEstate" },
    { id: "Healthcare & Biotech", name: "healthcareBiotech" },
    { id: "Manufacturing & Industrial", name: "manafacturingIndustrial" },
    { id: "Consumer Goods", name: "consumerGoods" },
    { id: "Financial Services", name: "financialServices" },
    { id: "Agriculture & Food", name: "agricultureFood" },
]

export const TARGET_INDUSTRY_OPTIONS_LOOKING: Option[] = [
    { id: "Renewable Energy", name: "renewableEnergy" },
    { id: "Infrastructure", name: "infrastructure" },
    { id: "Heavy Industry", name: "heavyIndustry" },
    { id: "Mining Renewables", name: "miningRenewables" },
]

export const TARGET_INDUSTRY_OPTIONS_SELL: Option[] = [
    { id: "Mining", name: "mining" },
    { id: "Energy", name: "energy" },
    { id: "Technology", name: "technology" },
    { id: "Industrial / Manufacturing", name: "industrialManafacturing" },
    { id: "Healthcare", name: "healthcare" },
    { id: "Financial Services", name: "financialServices" },
]

export const TARGET_INDUSTRY_OPTIONS_ACQUIRING_BUSINESS: Option[] = [
    { id: "Mining", name: "mining" },
    { id: "Energy & Renewables", name: "energyRenewables" },
    { id: "Real Estate", name: "realEstate" },
    { id: "Technology", name: "technology" },
    { id: "Industrial / Manufacturing", name: "industrialManafacturing" },
    { id: "Healthcare", name: "healthcare" },
    { id: "Financial Services", name: "financialServices" },
]

export const TARGET_INDUSTRY_OPTIONS_STRATEGIC_DEAL: Option[] = [
    { id: "Pre-revenue / Early Stage", name: "preRevenueEarlyStage" },
    { id: "Revenue-generating", name: "revenueGenerating" },
    { id: "Profitable / Scaling", name: "profitableScaling" },
    { id: "Mature / Established", name: "matureEstablished" },
    { id: "Distressed / Turnaround", name: "distressedTurnaround" },
]
