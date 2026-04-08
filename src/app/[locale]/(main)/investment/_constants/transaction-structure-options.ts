import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const TRANSACTION_STRUCTURE_OPTIONS: Option[] = [
    { id: "Full Acquisition", name: "fullAcquisition" },
    { id: "Joint Venture", name: "jointVenture" },
    { id: "Asset Purchase", name: "assetPurchase" },
    { id: "Share Swap / Equity Swap", name: "shareSwapEquity" },
    { id: "Carve-out / Spin-off", name: "carveOutSpinOff" },
    { id: "Open to Negotiation", name: "openToNegotiation" },
    { id: "", name: "emptyStr" },
]
