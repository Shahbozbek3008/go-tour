"use client"

import { useMemo } from "react"
import {
    TravelAgencyResponse,
    useAllAgentsQuery,
    useMultiplyCarousel,
} from "./_hooks"
import { AgentChip } from "./agent-chip"

export const Agents = () => {
    const { allAgents } = useAllAgentsQuery()

    const agents: TravelAgencyResponse[] = useMemo(
        () => allAgents ?? [],
        [allAgents],
    )

    const { emblaRef, multiplied, activeDot, dotCount, scrollTo } =
        useMultiplyCarousel(agents)

    if (!agents.length) return null

    return (
        <section className="w-full bg-white py-16 overflow-hidden">
            <div className="w-full home-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <h2 className="w-full text-3xl md:text-[40px] tracking-tight font-bold text-slate-900 text-center">
                        Agentlar
                    </h2>
                </div>

                <div className="overflow-hidden py-4 -my-4" ref={emblaRef}>
                    <div className="flex touch-pan-y -ml-4 sm:-ml-6">
                        {multiplied.map((agent) => (
                            <div
                                key={agent._key}
                                className="min-w-0 pl-4 sm:pl-6 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                            >
                                <AgentChip agent={agent} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === activeDot ?
                                    "w-8 h-1.5 bg-[#0F1B2D]"
                                :   "w-2 h-1.5 bg-gray-200 hover:bg-gray-300"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
