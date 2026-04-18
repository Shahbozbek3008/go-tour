"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NAV_TABS = [
    { value: "overview", label: "Overview" },
    { value: "itinerary", label: "Itinerary" },
    { value: "includes", label: "Includes" },
    { value: "accommodation", label: "Accommodation" },
    { value: "important", label: "Important" },
    { value: "reviews", label: "Reviews" },
]

export function TourNavTabs() {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full h-auto bg-transparent border-b border-border/60 rounded-none p-0 justify-start gap-0 overflow-x-auto flex-nowrap">
                {NAV_TABS.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="relative rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none shrink-0"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
