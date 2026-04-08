import { Currency } from "@/types/common/extra"
import { CURRENCIES } from "../constants/currency"

export const getCurrencySign = (currencyId: Currency | undefined | null) => {
    const currency = CURRENCIES.find((c) => c.id === currencyId)
    // return currency?.iso || ""
    return {
        iso: currency?.iso || "",
        symbol: currency?.symbol || "",
    }
}

export const formatMln = (value: unknown) => {
    const num = Number(value) || 0
    const isMln = num >= 1_000_000
    const val = isMln ? num / 1_000_000 : num
    const mlnSuffix = isMln ? "mln" : ""

    return { value: val, mlnSuffix }
}

export const formatCount = (value: unknown) => {
    const num = Number(value) || 0

    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"
    } else {
        return num.toString()
    }
}
