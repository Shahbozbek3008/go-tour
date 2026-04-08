import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const DEAL_TYPE_OPTIONS: Option[] = [
    { id: "Merger", name: "merger" },
    { id: "Strategic Acquisition", name: "strategicAcquisition" },
    { id: "Asset Swap", name: "assetSwap" },
    { id: "Spin-off", name: "spinOff" },
    { id: "Carve-out", name: "carveOut" },
    { id: "Alliance / Partnership", name: "alliancePartnership" },
]
