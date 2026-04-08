"use client"

import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ParentFilter from "@/components/common/filter/parent-filter"
import { ParentFilterItem } from "@/components/common/filter/types"
import { useCountriesQuery } from "@/hooks/react-query/use-countries-query"
import { GlobeIcon } from "lucide-react"

export const RegionFilter = () => {
    const {
        chats: {
            outreach_hub_filter: { countries },
        },
    } = useAiPersist()
    const { continents } = useCountriesQuery()

    const items: ParentFilterItem[] = [
        {
            value: "region",
            filterKey: "countries",
            childFilterProps: {
                aiChatType: "outreach_hub_filter",
                filterItems: continents.map((c) => {
                    return {
                        filterKey: "countries",
                        items: c.countries,
                        translationKey: c.continent,
                        type: "checkbox",
                        valuesFromAi: countries,
                    }
                }),
                triggerClassName: "capitalize",
            },
            icon: <GlobeIcon className="w-4 h-4" />,
            translationKey: "region",
        },
    ]

    return <ParentFilter defaultValue="region" items={items} />
}
