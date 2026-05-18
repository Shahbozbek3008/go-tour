"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "@/i18n/navigation"
import { formatDate } from "@/lib/utils/format-date"
import { getHref } from "@/lib/utils/get-href"
import { Search } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"
import ClientTranslate from "../common/translation/client-translate"
import { Destination, useTourShortListQuery } from "./_hooks"
import { DatePicker } from "./datepicker"
import { LocationSearch } from "./location-search"

interface SearchBarProps {
    locationValue?: string | null
    onLocationSelect?: (dest: Destination | null) => void
    onQueryChange?: (query: string) => void
    selectedDestination?: Destination | null
    autoOpen?: boolean
}

export function SearchBar({
    locationValue,
    onLocationSelect,
    onQueryChange,
    selectedDestination,
    autoOpen,
}: SearchBarProps) {
    const router = useRouter()
    const { locale } = useParams() as { locale: string }
    const searchParams = useSearchParams()
    const { tourShortList } = useTourShortListQuery()
    const [isPending, startTransition] = useTransition()

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
        const destinationParam = searchParams.get("destinations")

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
                const name = locale === "ru" ? dest.nameRu : dest.nameUz
                setInternalLocValue(name)
                setManualQuery(name)
            } else {
                setInternalLocValue(null)
                setManualQuery("")
            }
        }
    }

    const handleQueryChange = (q: string) => {
        setManualQuery(q)
        if (!isControlled) {
            setInternalLocValue(q)
            setInternalDest(null)
        } else {
            onQueryChange?.(q)
        }
    }

    const handleDateChange = (
        _: string,
        range: { from: Date | null; to: Date | null },
    ) => {
        setDateRange(range)
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
            params.set("destinations", String(effectiveDest.id))
            params.delete("name")
        } else if (manualQuery || effectiveLocValue) {
            params.set("name", manualQuery || effectiveLocValue || "")
            params.delete("destinations")
        } else {
            params.delete("destinations")
            params.delete("name")
        }

        startTransition(() => {
            router.push(
                getHref({
                    pathname: "/[locale]/catalog",
                    query: Object.fromEntries(params),
                }),
            )
        })
    }

    return (
        <div className="w-full">
            {/* Desktop/Tablet */}
            <div className="hidden md:flex lg:min-w-full lg:w-[750px] flex-row items-stretch gap-0 bg-white rounded-2xl shadow-2xl p-2">
                <LocationSearch
                    value={effectiveLocValue ?? null}
                    onSelect={handleLocationSelect}
                    onQueryChange={handleQueryChange}
                    onEnter={handleSearch}
                    autoOpen={autoOpen}
                />

                <div className="w-px bg-gray-100 my-2 mx-1" />

                <div className="flex-1 min-w-0">
                    <DatePicker
                        defaultRange={dateRange}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="w-px bg-gray-100 my-2 mx-1" />

                <Button
                    onClick={handleSearch}
                    isLoading={isPending}
                    className="shrink-0 w-auto mt-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-auto px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-200 shadow-lg shadow-blue-200"
                >
                    <Search className="w-4 h-4" />
                    <ClientTranslate translationKey="findTours" />
                </Button>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden flex-col gap-3">
                <LocationSearch
                    value={effectiveLocValue ?? null}
                    onSelect={handleLocationSelect}
                    onQueryChange={handleQueryChange}
                    onEnter={handleSearch}
                    autoOpen={autoOpen}
                />

                <DatePicker
                    defaultRange={dateRange}
                    onChange={handleDateChange}
                />

                <Button
                    onClick={handleSearch}
                    isLoading={isPending}
                    className="shrink-0 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold h-10 px-6 rounded-2xl flex items-center justify-center gap-2 text-xs transition-all duration-200"
                >
                    <Search className="w-4 h-4" />
                    <ClientTranslate translationKey="findTours" />
                </Button>
            </div>
        </div>
    )
}
