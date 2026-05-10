"use client"

import { getStoredCurrency, setStoredCurrency } from "@/lib/cookies/currency"
import { Currency } from "@/types/common/extra"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"

type CurrencyContextType = {
    currency: Currency
    setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export const CurrencyProvider = ({ 
    children, 
    initialCurrency 
}: { 
    children: React.ReactNode
    initialCurrency: Currency
}) => {
    const [currency, setCurrencyState] = useState<Currency>(initialCurrency)

    useEffect(() => {
        // Sync with cookie after hydration (in case cookie changed)
        const cookieCurrency = getStoredCurrency()
        if (cookieCurrency !== currency) {
            setCurrencyState(cookieCurrency)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setCurrency = useCallback((newCurrency: Currency) => {
        setStoredCurrency(newCurrency)
        setCurrencyState(newCurrency)
    }, [])

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export const useCurrency = () => {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error("useCurrency must be used within CurrencyProvider")
    }
    return context
}
