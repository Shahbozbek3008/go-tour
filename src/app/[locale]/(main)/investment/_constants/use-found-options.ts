import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const USE_FOUND_OPTIONS: Option[] = [
    { id: "Product or technology development", name: "productOrTechnology" },
    { id: "Equipment or machinery", name: "equipmentOrMachinery" },
    { id: "Real estate or land", name: "realEstateOrLand" },
    { id: "Operations / working capital", name: "operationsWorking" },
    { id: "Hiring / HR", name: "hiringHr" },
    { id: "Marketing & growth", name: "marketingGrowth" },
    { id: "Expansion to new markets", name: "expansionToNew" },
    { id: "Inventory or raw materials", name: "inventoryOrRaw" },
    {
        id: "Construction or infrastructure",
        name: "constructionOrInfrastructure",
    },
    { id: "Licenses / regulatory approvals", name: "licensesRegulatory" },
    { id: "Debt restructuring", name: "debtRestructuring" },
    { id: "M&A or company acquisition", name: "maOrCompany" },
    {
        id: "Social / environmental programs",
        name: "socialEnvironmentalPrograms",
    },
]
