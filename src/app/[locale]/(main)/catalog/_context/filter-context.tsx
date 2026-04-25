"use client"

import { getHref } from "@/lib/utils/get-href"
import { useRouter, useSearchParams } from "next/navigation"
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { DEFAULT_FILTERS, FilterState } from "../_constants/filter"

interface FilterContextType {
    filters: FilterState
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>
    minInput: string
    setMinInput: React.Dispatch<React.SetStateAction<string>>
    maxInput: string
    setMaxInput: React.Dispatch<React.SetStateAction<string>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    // URL'dan initial state olish
    const getInitialFilters = (): FilterState => ({
        ...DEFAULT_FILTERS,
        category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
    })

    const [filters, setFilters] = useState<FilterState>(getInitialFilters)

    const [minInput, setMinInput] = useState(String(filters.priceRange[0]))
    const [maxInput, setMaxInput] = useState(String(filters.priceRange[1]))

    // Flag: hozirgi o'zgarish state'danmi yoki URL'danmi
    const isUpdatingFromState = useRef(false)

    // State o'zgarganda URL'ni yangilash
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (filters.category && filters.category !== DEFAULT_FILTERS.category) {
            params.set("category", filters.category)
        } else {
            params.delete("category")
        }

        // Agar URL allaqachon shunday bo'lsa, replace qilmaymiz
        const currentCategory =
            searchParams.get("category") ?? DEFAULT_FILTERS.category
        if (currentCategory === filters.category) return

        isUpdatingFromState.current = true
        router.replace(
            getHref({
                pathname: "/[locale]/catalog",
                query: Object.fromEntries(params),
            }),
            { scroll: false },
        )
    }, [filters.category, router, searchParams])

    // URL o'zgarganda state'ni yangilash (faqat external o'zgarishlarda)
    useEffect(() => {
        if (isUpdatingFromState.current) {
            isUpdatingFromState.current = false
            return
        }

        const categoryFromUrl =
            searchParams.get("category") ?? DEFAULT_FILTERS.category
        if (categoryFromUrl !== filters.category) {
            setFilters((prev) => ({ ...prev, category: categoryFromUrl }))
        }
    }, [searchParams])

    const value = useMemo(
        () => ({
            filters,
            setFilters,
            minInput,
            setMinInput,
            maxInput,
            setMaxInput,
        }),
        [filters, minInput, maxInput],
    )

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error("useFilterContext must be used within a FilterProvider")
    }
    return context
}
