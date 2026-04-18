import { TranslationKey } from "@/components/common/translation/types"
import { Currency } from "@/types/common/extra"

export const CURRENCIES: {
    id: Currency
    iso: string
    symbol: string
    name: TranslationKey
}[] = [
    { id: "usd", iso: "USD", symbol: "$", name: "usd" },
    { id: "uzs", iso: "UZS", symbol: "UZS", name: "uzs" },
]
