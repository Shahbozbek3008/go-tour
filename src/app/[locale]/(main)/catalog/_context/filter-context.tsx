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
    const getInitialFilters = (): FilterState => {
        const destinationsStr = searchParams.get("destinations")
        return {
            ...DEFAULT_FILTERS,
            category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
            promotional: searchParams.get("promotional") === "true",
            guaranteed: searchParams.get("guaranteed") === "true",
            hasReviews: searchParams.get("hasReviews") === "true",
            destinations:
                destinationsStr ?
                    destinationsStr.split(",").map(Number).filter(Boolean)
                :   [],
        }
    }

    const [filters, setFilters] = useState<FilterState>(getInitialFilters)

    const [minInput, setMinInput] = useState(String(filters.priceRange[0]))
    const [maxInput, setMaxInput] = useState(String(filters.priceRange[1]))

    // Flag: hozirgi o'zgarish state'danmi yoki URL'danmi
    const isUpdatingFromState = useRef(false)

    // Store latest searchParams in a ref to avoid triggering the first effect when only URL changes
    const searchParamsRef = useRef(searchParams)
    searchParamsRef.current = searchParams

    // State o'zgarganda URL'ni yangilash
    useEffect(() => {
        const currentSearchParams = searchParamsRef.current
        const params = new URLSearchParams(currentSearchParams.toString())

        if (filters.category && filters.category !== DEFAULT_FILTERS.category) {
            params.set("category", filters.category)
        } else {
            params.delete("category")
        }

        if (filters.promotional) {
            params.set("promotional", "true")
        } else {
            params.delete("promotional")
        }

        if (filters.guaranteed) {
            params.set("guaranteed", "true")
        } else {
            params.delete("guaranteed")
        }

        if (filters.hasReviews) {
            params.set("hasReviews", "true")
        } else {
            params.delete("hasReviews")
        }

        if (filters.visaRequired) {
            params.set("visaRequired", "true")
        } else {
            params.delete("visaRequired")
        }

        if (filters.childDiscount) {
            params.set("childDiscount", "true")
        } else {
            params.delete("childDiscount")
        }

        if (filters.destinations.length > 0) {
            params.set("destinations", filters.destinations.join(","))
        } else {
            params.delete("destinations")
        }

        // Check if anything actually changed
        const currentCategory =
            currentSearchParams.get("category") ?? DEFAULT_FILTERS.category
        const currentPromotional = currentSearchParams.get("promotional") === "true"
        const currentGuaranteed = currentSearchParams.get("guaranteed") === "true"
        const currentHasReviews = currentSearchParams.get("hasReviews") === "true"
        const currentVisaRequired = currentSearchParams.get("visaRequired") === "true"
        const currentChildDiscount =
            currentSearchParams.get("childDiscount") ?
                Number(currentSearchParams.get("childDiscount"))
            :   null
        const currentDestinations = currentSearchParams.get("destinations") ?? ""

        if (
            currentCategory === filters.category &&
            currentPromotional === filters.promotional &&
            currentGuaranteed === filters.guaranteed &&
            currentHasReviews === filters.hasReviews &&
            currentVisaRequired === filters.visaRequired &&
            currentChildDiscount === filters.childDiscount &&
            currentDestinations === filters.destinations.join(",")
        ) {
            return
        }

        isUpdatingFromState.current = true
        router.replace(
            getHref({
                pathname: "/[locale]/catalog",
                query: Object.fromEntries(params),
            }),
            { scroll: false },
        )
    }, [
        filters.category,
        filters.promotional,
        filters.guaranteed,
        filters.hasReviews,
        filters.visaRequired,
        filters.childDiscount,
        filters.destinations,
        router,
        // searchParams olib tashlandi, faqat filters o'zgarganda ishlaydi
    ])

    // URL o'zgarganda state'ni yangilash (faqat external o'zgarishlarda)
    useEffect(() => {
        if (isUpdatingFromState.current) {
            isUpdatingFromState.current = false
            return
        }

        const categoryFromUrl =
            searchParams.get("category") ?? DEFAULT_FILTERS.category
        const promotionalFromUrl = searchParams.get("promotional") === "true"
        const guaranteedFromUrl = searchParams.get("guaranteed") === "true"
        const hasReviewsFromUrl = searchParams.get("hasReviews") === "true"
        const visaRequiredFromUrl = searchParams.get("visaRequired") === "true"
        const childDiscountFromUrl =
            searchParams.get("childDiscount") ?
                Number(searchParams.get("childDiscount"))
            :   null
        const destinationsFromUrl =
            searchParams
                .get("destinations")
                ?.split(",")
                .map(Number)
                .filter(Boolean) ?? []

        if (
            categoryFromUrl !== filters.category ||
            promotionalFromUrl !== filters.promotional ||
            guaranteedFromUrl !== filters.guaranteed ||
            hasReviewsFromUrl !== filters.hasReviews ||
            visaRequiredFromUrl !== filters.visaRequired ||
            childDiscountFromUrl !== filters.childDiscount ||
            destinationsFromUrl.join(",") !== filters.destinations.join(",")
        ) {
            setFilters((prev) => ({
                ...prev,
                category: categoryFromUrl,
                promotional: promotionalFromUrl,
                guaranteed: guaranteedFromUrl,
                hasReviews: hasReviewsFromUrl,
                visaRequired: visaRequiredFromUrl,
                childDiscount: childDiscountFromUrl,
                destinations: destinationsFromUrl,
            }))
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
