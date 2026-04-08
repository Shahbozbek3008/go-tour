import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const STRATEGIC_OBJECTIVE_OPTIONS: Option[] = [
    { id: "ROI / Financial Return", name: "roiFinancialReturn" },
    { id: "Strategic Partnership", name: "strategicPartnership" },
    { id: "Diversification", name: "diversification" },
    { id: "Access to Markets / Tech", name: "accessToMarkets" },
    { id: "Social / Environmental Impact", name: "socialEnvironmental" },
    { id: "ROI + Strategic Partnership", name: "roiStrategicPartnership" },
    { id: "Open to All", name: "openToAll" },
]
