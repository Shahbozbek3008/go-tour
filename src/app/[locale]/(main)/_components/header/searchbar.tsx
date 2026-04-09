"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/shadcn"
import { MapPin, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { DatePicker } from "./datepicker"

interface Location {
    id: number
    name: string
    region: string
}

const LOCATIONS: Location[] = [
    { id: 1, name: "Samarqand", region: "Samarqand viloyati" },
    { id: 2, name: "Buxoro", region: "Buxoro viloyati" },
    { id: 3, name: "Xiva", region: "Xorazm viloyati" },
    { id: 4, name: "Toshkent", region: "Toshkent shahri" },
    { id: 5, name: "Namangan", region: "Namangan viloyati" },
    { id: 6, name: "Andijon", region: "Andijon viloyati" },
    { id: 7, name: "Farg'ona", region: "Farg'ona viloyati" },
    { id: 8, name: "Shahrisabz", region: "Qashqadaryo viloyati" },
]

export function SearchBar() {
    const [locationOpen, setLocationOpen] = useState(false)
    const [locationQuery, setLocationQuery] = useState("")
    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        null,
    )
    const [dateValue, setDateValue] = useState<string | null>(null)

    const locationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                locationRef.current &&
                !locationRef.current.contains(e.target as Node)
            ) {
                setLocationOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const filtered = LOCATIONS.filter((l) =>
        l.name.toLowerCase().includes(locationQuery.toLowerCase()),
    )

    return (
        <div className="w-full">
            <div className="flex items-stretch gap-2 bg-white rounded-2xl shadow-2xl p-2">
                {/* Location */}
                <div ref={locationRef} className="relative flex-1">
                    <div
                        onClick={() => setLocationOpen((o) => !o)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border min-w-[250px] max-w-[250px]",
                            locationOpen ?
                                "border-blue-400 shadow-sm"
                            :   "border-transparent hover:border-gray-200",
                        )}
                    >
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                        {locationOpen ?
                            <input
                                autoFocus
                                value={locationQuery}
                                onChange={(e) =>
                                    setLocationQuery(e.target.value)
                                }
                                placeholder="Qidirish..."
                                width={250}
                                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 w-[250px] max-w-[250px]"
                                onClick={(e) => e.stopPropagation()}
                            />
                        :   <span
                                className={cn(
                                    "text-sm flex-1",
                                    selectedLocation ? "text-gray-800" : (
                                        "text-gray-400"
                                    ),
                                )}
                            >
                                {selectedLocation ?? "Manzil"}
                            </span>
                        }
                        <svg
                            className={cn(
                                "w-4 h-4 text-gray-400 transition-transform duration-200",
                                locationOpen && "rotate-180",
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
                    </div>

                    <div
                        className={cn(
                            "absolute top-[calc(100%+8px)] left-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 transition-all duration-200 origin-top overflow-hidden",
                            locationOpen ?
                                "opacity-100 scale-100 pointer-events-auto"
                            :   "opacity-0 scale-95 pointer-events-none",
                        )}
                    >
                        <div className="p-2 max-h-64 overflow-y-auto">
                            {filtered.length === 0 ?
                                <p className="text-sm text-gray-400 text-center py-4">
                                    Natija topilmadi
                                </p>
                            :   filtered.map((loc) => (
                                    <button
                                        key={loc.id}
                                        onClick={() => {
                                            setSelectedLocation(loc.name)
                                            setLocationQuery("")
                                            setLocationOpen(false)
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left",
                                            selectedLocation === loc.name ?
                                                "bg-blue-50 text-blue-600"
                                            :   "hover:bg-gray-50 text-gray-700",
                                        )}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {loc.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {loc.region}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="w-px bg-gray-200 my-2" />

                <div className="flex-1">
                    <DatePicker onChange={(v) => setDateValue(v)} />
                </div>
                <Button className="shrink-0 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold px-6 rounded-xl flex items-center gap-2 text-sm transition-all duration-200 shadow-lg shadow-blue-200">
                    <Search className="w-4 h-4" />
                    Qidirish
                </Button>
            </div>
        </div>
    )
}
