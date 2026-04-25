"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils/shadcn"
import { MapPin, X } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ClientTranslate from "../common/translation/client-translate"
import { Destination, useTourShortListQuery } from "./_hooks"

interface LocationSearchProps {
    value: string | null
    onSelect: (item: Destination | null) => void
    onQueryChange?: (query: string) => void
}

export function LocationSearch({
    value,
    onSelect,
    onQueryChange,
}: LocationSearchProps) {
    const { locale } = useParams() as { locale: string }
    const { tourShortList, isLoading } = useTourShortListQuery()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const filtered = tourShortList.filter((item) => {
        const name =
            locale === "ru" ? item.destination.nameRu : item.destination.nameUz
        return name?.toLowerCase().includes(query.toLowerCase())
    })

    const handleOpen = () => {
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
    }

    const handleSelect = (item: Destination) => {
        onSelect(item)
        setQuery("")
        onQueryChange?.("")
        setOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSelect(null)
        setQuery("")
        onQueryChange?.("")
    }

    return (
        <div ref={wrapperRef} className="relative flex-1">
            <button
                onClick={handleOpen}
                className={cn(
                    "group flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 border",
                    open ?
                        "border-blue-400 shadow-sm bg-blue-50/30"
                    :   "border-gray-100 hover:border-gray-200 bg-white",
                )}
            >
                <MapPin
                    className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        open ? "text-blue-500" : "text-gray-400",
                    )}
                />
                {open ?
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            const val = e.target.value
                            setQuery(val)
                            onQueryChange?.(val)
                        }}
                        placeholder="Qidirish"
                        className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                    />
                :   <span
                        className={cn(
                            "flex-1 text-left truncate",
                            value ? "text-gray-800" : "text-gray-400",
                        )}
                    >
                        {value ?? (locale === "ru" ? "Адрес" : "Manzil")}
                    </span>
                }
                {value && !open && (
                    <X
                        className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={handleClear}
                    />
                )}
                {!value && (
                    <svg
                        className={cn(
                            "w-4 h-4 text-gray-300 transition-transform duration-200",
                            open && "rotate-180",
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                )}
            </button>

            <div
                className={cn(
                    "absolute top-[calc(100%+8px)] left-0 w-full sm:w-80 rounded-2xl shadow-2xl border bg-white border-gray-100 z-50 transition-all duration-200 origin-top",
                    open ?
                        "opacity-100 scale-100 pointer-events-auto"
                    :   "opacity-0 scale-95 pointer-events-none",
                )}
            >
                <div className="p-2">
                    {isLoading ?
                        <LocationSkeleton />
                    : filtered.length > 0 ?
                        <div className="max-h-52 overflow-y-auto">
                            {filtered.map((item) => {
                                const name =
                                    locale === "ru" ?
                                        item.destination.nameRu
                                    :   item.destination.nameUz
                                return (
                                    <button
                                        key={item.destination.id}
                                        onClick={() =>
                                            handleSelect(item.destination)
                                        }
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left",
                                            value === name ?
                                                "bg-blue-50 text-blue-600"
                                            :   "hover:bg-gray-50 text-gray-700",
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">
                                                {name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {item?.tourCount}{" "}
                                            <ClientTranslate translationKey="tour" />
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    :   <p className="text-sm text-gray-400 text-center py-4">
                            <ClientTranslate translationKey="noResultsFound" />
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

const LocationSkeleton = () => {
    return (
        <div className="space-y-1">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2.5"
                >
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-3/4 rounded" />
                        <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}
