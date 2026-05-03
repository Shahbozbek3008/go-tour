"use client"

import { cn } from "@/lib/utils/shadcn"
import { useEffect, useRef, useState } from "react"

export const SECTION_IDS = {
    overview: "section-overview",
    itinerary: "section-itinerary",
    includes: "section-includes",
    accommodation: "section-accommodation",
    important: "section-important",
    reviews: "section-reviews",
} as const

type SectionKey = keyof typeof SECTION_IDS

const NAV_TABS: { value: SectionKey; label: string }[] = [
    { value: "overview", label: "Overview" },
    { value: "itinerary", label: "Itinerary" },
    { value: "includes", label: "Includes" },
    { value: "accommodation", label: "Accommodation" },
    { value: "important", label: "Important" },
    { value: "reviews", label: "Reviews" },
]

export function TourNavTabs() {
    const [activeTab, setActiveTab] = useState<SectionKey>("overview")
    const isClickScrolling = useRef(false)

    useEffect(() => {
        const sectionEls = NAV_TABS.map(({ value }) =>
            document.getElementById(SECTION_IDS[value]),
        ).filter(Boolean) as HTMLElement[]

        if (sectionEls.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (isClickScrolling.current) return
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    )

                if (visible.length > 0) {
                    const id = visible[0].target.id
                    const key = (Object.keys(SECTION_IDS) as SectionKey[]).find(
                        (k) => SECTION_IDS[k] === id,
                    )
                    if (key) setActiveTab(key)
                }
            },
            {
                rootMargin: "-10% 0px -75% 0px",
                threshold: 0,
            },
        )

        sectionEls.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const scrollToSection = (key: SectionKey) => {
        const el = document.getElementById(SECTION_IDS[key])
        if (!el) return

        setActiveTab(key)
        isClickScrolling.current = true

        el.scrollIntoView({ behavior: "smooth", block: "start" })

        setTimeout(() => {
            isClickScrolling.current = false
        }, 800)
    }

    return (
        <div className="w-full border-b border-border/60 overflow-x-auto">
            <div className="flex gap-0 flex-nowrap">
                {NAV_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => scrollToSection(tab.value)}
                        className={cn(
                            "relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors duration-200",
                            "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:transition-transform after:duration-300",
                            activeTab === tab.value ?
                                "text-primary after:bg-primary after:scale-x-100"
                            :   "text-muted-foreground after:scale-x-0 hover:text-foreground",
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
