"use client"

import { ChevronDown, Mail } from "lucide-react"
import { useState } from "react"
import { TourDay } from "../../../_types"
import { ProgramAccordion } from "./program-accordion"

interface ProgramProps {
    days: TourDay[]
    onEmailRequest?: () => void
}

export function Program({ days, onEmailRequest }: ProgramProps) {
    const allIds = days.map((d) => d.id)
    const [openItems, setOpenItems] = useState<string[]>([])
    const allExpanded = openItems.length === days.length

    const toggleAll = () => {
        setOpenItems(allExpanded ? [] : allIds)
    }

    return (
        <section className="w-full space-y-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Program
                </h2>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={onEmailRequest}
                    className="inline-flex items-center gap-2 text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors"
                >
                    Get it on email
                    <Mail className="size-4" />
                </button>
                <button
                    onClick={toggleAll}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors"
                >
                    {allExpanded ? "Hide all days" : "Show all days"}
                    <ChevronDown
                        className={`size-4 transition-transform duration-200 ${allExpanded ? "rotate-180" : ""}`}
                    />
                </button>
            </div>
            <ProgramAccordion
                days={days}
                openItems={openItems}
                setOpenItems={setOpenItems}
            />
        </section>
    )
}
