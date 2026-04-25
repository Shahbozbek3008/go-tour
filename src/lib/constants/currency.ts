import { TranslationKey } from "@/components/common/translation/types"
import { Currency } from "@/types/common/extra"

export const CURRENCIES: {
    id: Currency
    iso: string
    symbol: string
    name: TranslationKey
}[] = [
    { id: "USD", iso: "USD", symbol: "$", name: "USD" },
    { id: "UZS", iso: "UZS", symbol: "UZS", name: "UZS" },
]
