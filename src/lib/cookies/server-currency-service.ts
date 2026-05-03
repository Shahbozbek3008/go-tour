import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import { COOKIES } from "../constants/cookies"
import { CURRENCIES } from "../constants/currency"
import { Currency } from "@/types/common/extra"

export const ServerCurrencyService = {
    getCurrency: async (): Promise<Currency> => {
        const storedCurrency = await getCookie(COOKIES.CURRENCY, { cookies })
        if (!storedCurrency) return CURRENCIES[0].id

        const isValidCurrency = CURRENCIES.some(
            (curr) => curr.id === storedCurrency,
        )
        return isValidCurrency ? (storedCurrency as Currency) : CURRENCIES[0].id
    },
}
