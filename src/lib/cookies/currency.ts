import { Currency } from "@/types/common/extra"
import { getCookie, setCookie } from "cookies-next"
import { COOKIES } from "../constants/cookies"
import { CURRENCIES } from "../constants/currency"

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export const getStoredCurrency = (): Currency => {
    const storedCurrency = getCookie(COOKIES.CURRENCY)
    if (!storedCurrency) return CURRENCIES[0].id

    const isValidCurrency = CURRENCIES.some(
        (curr) => curr.id === storedCurrency,
    )
    return isValidCurrency ? (storedCurrency as Currency) : CURRENCIES[0].id
}

export const setStoredCurrency = (currency: Currency) => {
    setCookie(COOKIES.CURRENCY, currency, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
    })
}
