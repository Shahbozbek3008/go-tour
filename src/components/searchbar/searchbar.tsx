"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/navigation"
import { formatDate } from "@/lib/utils/format-date"
import { getHref } from "@/lib/utils/get-href"
import { Search } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ClientTranslate from "../common/translation/client-translate"
import { Destination, useTourShortListQuery } from "./_hooks"
import { DatePicker } from "./datepicker"
import { LocationSearch } from "./location-search"

interface SearchBarProps {
    locationValue?: string | null
    onLocationSelect?: (dest: Destination | null) => void
    selectedDestination?: Destination | null
}

export function SearchBar({
    locationValue,
    onLocationSelect,
    selectedDestination,
}: SearchBarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const { locale } = useParams() as { locale: string }
    const searchParams = useSearchParams()
    const { tourShortList } = useTourShortListQuery()

    const [manualQuery, setManualQuery] = useState("")
    const [dateRange, setDateRange] = useState<{
        from: Date | null
        to: Date | null
    }>({ from: null, to: null })
    const lastSyncedParams = useRef<string>("")

    const [internalDest, setInternalDest] = useState<Destination | null>(null)
    const [internalLocValue, setInternalLocValue] = useState<string | null>(
        null,
    )

    const isControlled = onLocationSelect !== undefined
    const effectiveDest = isControlled ? selectedDestination : internalDest
    const effectiveLocValue = isControlled ? locationValue : internalLocValue

    useEffect(() => {
        const currentParams = searchParams.toString()
        if (currentParams === lastSyncedParams.current) return
        lastSyncedParams.current = currentParams

        const startDateParam = searchParams.get("startDate")
        const endDateParam = searchParams.get("endDate")
        const nameParam = searchParams.get("name")
        const destinationParam = searchParams.get("destination")

        if (startDateParam || endDateParam) {
            const from =
                startDateParam && !isNaN(Date.parse(startDateParam)) ?
                    new Date(startDateParam)
                :   null
            const to =
                endDateParam && !isNaN(Date.parse(endDateParam)) ?
                    new Date(endDateParam)
                :   null

            // Faqat o'zgargan bo'lsa yangilaymiz
            if (
                from?.getTime() !== dateRange.from?.getTime() ||
                to?.getTime() !== dateRange.to?.getTime()
            ) {
                setDateRange({ from, to })
            }
        }

        if (nameParam && nameParam !== manualQuery) {
            setManualQuery(nameParam)
        }

        if (destinationParam && !effectiveDest && tourShortList.length > 0) {
            const found = tourShortList.find(
                (item) => String(item.destination.id) === destinationParam,
            )
            if (found) {
                if (isControlled) {
                    onLocationSelect?.(found.destination)
                } else {
                    setInternalDest(found.destination)
                    setInternalLocValue(
                        locale === "ru" ?
                            found.destination.nameRu
                        :   found.destination.nameUz,
                    )
                }
            }
        }
    }, [
        searchParams,
        tourShortList,
        onLocationSelect,
        isControlled,
        locale,
        // Eslatma: state parametrlarini dependencydan olib tashladik
        // Bu foydalanuvchiga ma'lumotlarni o'chirish imkonini beradi
    ])

    const handleLocationSelect = (dest: Destination | null) => {
        if (isControlled) {
            onLocationSelect?.(dest)
        } else {
            setInternalDest(dest)
            if (dest) {
                setInternalLocValue(locale === "ru" ? dest.nameRu : dest.nameUz)
            } else {
                setInternalLocValue(null)
            }
        }

        // Tozalash tugmasi bosilganda URL'dan ham o'chiramiz
        if (!dest) {
            const params = new URLSearchParams(searchParams.toString())
            if (params.has("destination") || params.has("name")) {
                params.delete("destination")
                params.delete("name")
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                })
            }
        } else {
            // Agar tanlangan bo'lsa, 'name' parametrini o'chirib tashlaymiz
            const params = new URLSearchParams(searchParams.toString())
            if (params.has("name")) {
                params.delete("name")
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                })
            }
        }
    }

    const handleQueryChange = (q: string) => {
        setManualQuery(q)
        // Agar qo'lda yozilgan matn o'chirilsa, URL'dan 'name' ni ham o'chiramiz
        if (q === "") {
            const params = new URLSearchParams(searchParams.toString())
            if (params.has("name")) {
                params.delete("name")
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                })
            }
        }
    }

    const handleDateChange = (
        _: string,
        range: { from: Date | null; to: Date | null },
    ) => {
        setDateRange(range)
        // Agar sanalar o'chirilsa, URL'dan 'startDate' va 'endDate' ni ham o'chiramiz
        if (!range.from && !range.to) {
            const params = new URLSearchParams(searchParams.toString())
            if (params.has("startDate") || params.has("endDate")) {
                params.delete("startDate")
                params.delete("endDate")
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                })
            }
        }
    }
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (dateRange.from) {
            params.set("startDate", formatDate(dateRange.from, "yyyy-MM-dd"))
        } else {
            params.delete("startDate")
        }

        if (dateRange.to) {
            params.set("endDate", formatDate(dateRange.to, "yyyy-MM-dd"))
        } else {
            params.delete("endDate")
        }

        if (effectiveDest) {
            params.set("destination", String(effectiveDest.id))
            params.delete("name")
        } else if (manualQuery || effectiveLocValue) {
            params.set("name", manualQuery || effectiveLocValue || "")
            params.delete("destination")
        } else {
            params.delete("destination")
            params.delete("name")
        }

        router.push(
            getHref({
                pathname: "/[locale]/catalog",
                query: Object.fromEntries(params),
            }),
        )
    }

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 bg-white rounded-3xl md:rounded-2xl shadow-xl md:shadow-2xl p-4 md:p-2">
                <LocationSearch
                    value={effectiveLocValue ?? null}
                    onSelect={handleLocationSelect}
                    onQueryChange={handleQueryChange}
                />

                <div className="hidden md:block w-px bg-gray-100 my-2 mx-1" />

                <div className="flex-1 min-w-0">
                    <DatePicker
                        defaultRange={dateRange}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="hidden md:block w-px bg-gray-100 my-2 mx-1" />

                <Button
                    onClick={handleSearch}
                    className="shrink-0 w-full md:w-auto mt-1 md:mt-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-6 md:py-auto px-6 rounded-2xl md:rounded-xl flex items-center justify-center gap-2 text-base md:text-sm transition-all duration-200 shadow-lg shadow-blue-200"
                >
                    <Search className="w-5 h-5 md:w-4 md:h-4" />
                    <ClientTranslate translationKey="search2" />
                </Button>
            </div>
        </div>
    )
}
