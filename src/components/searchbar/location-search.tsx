"use client"

import { cn } from "@/lib/utils/shadcn"
import { ChevronRight, MapPin, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Location {
    id: number
    name: string
    region: string
    count: number
}

type FilterType = "all" | "foreign" | "uzbekistan"

const LOCATIONS: Location[] = [
    { id: 1, name: "Samarqand", region: "Samarqand viloyati", count: 108 },
    { id: 2, name: "Buxoro", region: "Buxoro viloyati", count: 42 },
    { id: 3, name: "Xiva", region: "Xorazm viloyati", count: 35 },
    { id: 4, name: "Toshkent", region: "Toshkent shahri", count: 89 },
    { id: 5, name: "Namangan", region: "Namangan viloyati", count: 21 },
    { id: 6, name: "Andijon", region: "Andijon viloyati", count: 15 },
    { id: 7, name: "Farg'ona", region: "Farg'ona viloyati", count: 28 },
    { id: 8, name: "Shahrisabz", region: "Qashqadaryo viloyati", count: 19 },
    { id: 9, name: "Termiz", region: "Surxondaryo viloyati", count: 12 },
    { id: 10, name: "Nukus", region: "Qoraqalpog'iston", count: 9 },
]

const FOREIGN_LOCATIONS: Location[] = [
    { id: 11, name: "Dubay", region: "BAA", count: 156 },
    { id: 12, name: "Istanbul", region: "Turkiya", count: 203 },
    { id: 13, name: "Moskva", region: "Rossiya", count: 88 },
    { id: 14, name: "Pekin", region: "Xitoy", count: 44 },
    { id: 15, name: "Bangkok", region: "Tailand", count: 67 },
]

const FILTERS = [
    { key: "all" as FilterType, label: "Barchasi" },
    { key: "foreign" as FilterType, label: "Xorijiy" },
]

interface LocationSearchProps {
    value: string | null
    onChange: (value: string | null) => void
}

export function LocationSearch({ value, onChange }: LocationSearchProps) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState<FilterType>("all")
    const [excludeMode, setExcludeMode] = useState(false)

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

    const allLocations =
        filter === "foreign" ? FOREIGN_LOCATIONS : (
            [...LOCATIONS, ...FOREIGN_LOCATIONS]
        )

    const filtered = allLocations.filter((l) =>
        l.name.toLowerCase().includes(query.toLowerCase()),
    )

    const handleOpen = () => {
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
    }

    const handleSelect = (name: string) => {
        onChange(name)
        setQuery("")
        setOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(null)
        setQuery("")
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
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Qidirish..."
                        className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                    />
                :   <span
                        className={cn(
                            "flex-1 text-left truncate",
                            value ? "text-gray-800" : "text-gray-400",
                        )}
                    >
                        {value ?? "Manzil"}
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
                    <div className="flex gap-1.5 mb-2 px-1">
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={cn(
                                    "flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-150 border",
                                    filter === f.key ?
                                        "bg-primary text-white"
                                    :   "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                                )}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setExcludeMode(!excludeMode)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors mb-1"
                    >
                        <span className="text-sm text-gray-700">
                            Joylarni istisno qilish
                        </span>
                        <ChevronRight
                            className={cn(
                                "w-4 h-4 text-gray-400 transition-transform duration-200",
                                excludeMode && "rotate-90",
                            )}
                        />
                    </button>

                    {filtered.length > 0 && (
                        <div className="pt-1 border-t border-gray-100">
                            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase px-3 py-1.5">
                                Eng yaxshi moslik
                            </p>
                            <div className="max-h-52 overflow-y-auto">
                                {filtered.map((loc) => (
                                    <button
                                        key={loc.id}
                                        onClick={() => handleSelect(loc.name)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left",
                                            value === loc.name ?
                                                "bg-blue-50 text-blue-600"
                                            :   "hover:bg-gray-50 text-gray-700",
                                        )}
                                    >
                                        <span className="text-sm font-medium">
                                            {loc.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {loc.count} tur
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {filtered.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">
                            Natija topilmadi
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
