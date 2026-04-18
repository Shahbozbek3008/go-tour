"use client"

import { useCallback, useRef, useState } from "react"
import { CITIES } from "../_constants/mockdata"
import { City } from "../_types/payment"

export function useCityAutocomplete(initialCity: City | null = null) {
    const [query, setQuery] = useState(initialCity?.name ?? "")
    const [suggestions, setSuggestions] = useState<City[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<City | null>(initialCity)
    const inputRef = useRef<HTMLInputElement>(null)

    const search = useCallback((value: string) => {
        setQuery(value)
        if (!value.trim()) {
            setSuggestions(CITIES.slice(0, 7))
            setIsOpen(true)
            return
        }
        const q = value.toLowerCase()
        const results = CITIES.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.code.toLowerCase().includes(q) ||
                c.country.toLowerCase().includes(q),
        ).slice(0, 7)
        setSuggestions(results)
        setIsOpen(results.length > 0)
    }, [])

    const handleFocus = useCallback(() => {
        const results =
            query.trim() ?
                CITIES.filter(
                    (c) =>
                        c.name.toLowerCase().includes(query.toLowerCase()) ||
                        c.code.toLowerCase().includes(query.toLowerCase()),
                ).slice(0, 7)
            :   CITIES.slice(0, 7)
        setSuggestions(results)
        setIsOpen(true)
    }, [query])

    const handleSelect = useCallback((city: City) => {
        setSelected(city)
        setQuery(city.name)
        setIsOpen(false)
    }, [])

    const handleBlur = useCallback(() => {
        setTimeout(() => setIsOpen(false), 150)
    }, [])

    return {
        query,
        suggestions,
        isOpen,
        selected,
        inputRef,
        search,
        handleFocus,
        handleSelect,
        handleBlur,
    }
}
