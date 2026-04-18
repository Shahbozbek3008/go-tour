"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { DatePicker } from "./datepicker"
import { LocationSearch } from "./location-search"

export function SearchBar() {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        null,
    )
    const [_dateValue, setDateValue] = useState<string | null>(null)

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 bg-white rounded-3xl md:rounded-2xl shadow-xl md:shadow-2xl p-4 md:p-2">
                <LocationSearch
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                />

                <div className="hidden md:block w-px bg-gray-100 my-2 mx-1" />

                <div className="flex-1 min-w-0">
                    <DatePicker onChange={(v) => setDateValue(v)} />
                </div>

                <div className="hidden md:block w-px bg-gray-100 my-2 mx-1" />

                <Button className="shrink-0 w-full md:w-auto mt-1 md:mt-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-6 md:py-auto px-6 rounded-2xl md:rounded-xl flex items-center justify-center gap-2 text-base md:text-sm transition-all duration-200 shadow-lg shadow-blue-200">
                    <Search className="w-5 h-5 md:w-4 md:h-4" />
                    Qidirish
                </Button>
            </div>
        </div>
    )
}
