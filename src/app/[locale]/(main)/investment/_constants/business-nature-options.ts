import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const BUSINESS_NATURE_OPTIONS: Option[] = [
    { id: "Operational Business", name: "operationalBusiness" },
    { id: "Non-Operational Business", name: "nonOperationalBusiness" },
    { id: "Greenfield Asset (Land)", name: "greenfieldAsset" },
    {
        id: "Brownfield Asset (Partially Developed)",
        name: "brownfieldAssetPartially",
    },
    { id: "Exploration Asset / License Only", name: "explorationAssetLicense" },
    { id: "Manufacturing Plant", name: "manufacturingPlant" },
    { id: "Real Estate Asset", name: "realEstateAsset" },
    {
        id: "Technology Business / IP Portfolio",
        name: "technologyBusinessPortfolio",
    },
    { id: "Financial Asset", name: "financialAsset" },
    { id: "Distressed Asset", name: "distressedAsset" },
]

export const BUSINESS_NATURE_OPTIONS_ACQUIRING_BUSINESS: Option[] = [
    { id: "Operational Business", name: "operationalBusiness" },
    {
        id: "Greenfield Project (Land or Permit Only)",
        name: "greenfieldAssetPermit",
    },
    { id: "Brownfield (Partially Developed)", name: "brownfieldPartially" },
    { id: "Exploration Asset", name: "explorationAsset" },
    { id: "Manufacturing Plant", name: "manufacturingPlant" },
    { id: "Real Estate Asset", name: "realEstateAsset" },
    { id: "Technology/IP Business", name: "technologyBusiness" },
    { id: "Financial Asset", name: "financialAsset" },
]
