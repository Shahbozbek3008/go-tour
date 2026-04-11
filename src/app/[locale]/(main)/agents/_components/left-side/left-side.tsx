"use client"

import { useState } from "react"
import { AgentCard } from "./agent-card"

interface Agent {
    id: number
    name: string
    location: string
    district: string
    logo: string
    rating: number
    reviews: number
    tourCount: number
}

const AGENTS: Agent[] = [
    {
        id: 1,
        name: "Silk Road Travel",
        location: "Toshkent",
        district: "Chilonzor",
        logo: "",
        rating: 4.8,
        reviews: 120,
        tourCount: 34,
    },
    {
        id: 2,
        name: "Samarkand Tours",
        location: "Samarqand",
        district: "Registon",
        logo: "",
        rating: 4.7,
        reviews: 98,
        tourCount: 27,
    },
    {
        id: 3,
        name: "Golden Bukhara",
        location: "Buxoro",
        district: "Buxoro Markazi",
        logo: "",
        rating: 4.9,
        reviews: 214,
        tourCount: 41,
    },
    {
        id: 4,
        name: "Asia Travel Group",
        location: "Toshkent",
        district: "Yunusobod",
        logo: "",
        rating: 4.6,
        reviews: 176,
        tourCount: 19,
    },
    {
        id: 5,
        name: "Fergana Valley Tours",
        location: "Farg'ona",
        district: "Markaziy",
        logo: "",
        rating: 4.5,
        reviews: 63,
        tourCount: 15,
    },
]

interface AgentsLeftSideProps {
    defaultSelectedId?: number
    onSelect?: (id: number) => void
}

export const AgentsLeftSide = ({
    defaultSelectedId = 1,
    onSelect,
}: AgentsLeftSideProps) => {
    const [selectedId, setSelectedId] = useState<number>(defaultSelectedId)

    const handleSelect = (id: number) => {
        setSelectedId(id)
        onSelect?.(id)
    }

    return (
        <aside className="w-full md:w-[272px] md:shrink-0 mt-10 lg:mt-0">
            <h5 className="text-base font-semibold mb-3 px-1 uppercase hidden md:block">
                Agentlar
            </h5>

            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {AGENTS.map((agent) => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        selected={selectedId === agent.id}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </aside>
    )
}
