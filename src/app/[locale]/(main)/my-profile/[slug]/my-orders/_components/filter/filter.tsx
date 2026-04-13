"use client"

import { RadioItem } from "@/components/radio-item"
import { RadioGroup } from "@/components/ui/radio-group"
import { useState } from "react"
import { FILTER_OPTIONS } from "../../_constants"

export const MyOrdersFilter = () => {
    const [filters, setFilters] = useState({
        category: "all",
    })

    return (
        <div className="w-full">
            <aside className="w-full min-w-[250px] max-w-[300px] border border-zinc-200 rounded-xl p-3 shrink-0 sticky top-24">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[15px] font-bold text-zinc-900 tracking-tight">
                        Filterlar
                    </span>
                </div>
                <div className="divide-y divide-zinc-100">
                    <RadioGroup
                        value={filters.category}
                        onValueChange={(val) =>
                            setFilters((p) => ({ ...p, category: val }))
                        }
                        className="gap-0"
                    >
                        {FILTER_OPTIONS.map(({ value, label }) => (
                            <RadioItem
                                key={value}
                                id={`cat-${value}`}
                                value={value}
                                label={label}
                                isActive={filters.category === value}
                            />
                        ))}
                    </RadioGroup>
                </div>
            </aside>
        </div>
    )
}
