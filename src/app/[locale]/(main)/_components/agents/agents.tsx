"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useAllAgentsQuery } from "@/hooks/use-all-agents-query"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { TravelAgencyResponse } from "@/types/api/agents"
import { ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { useMultiplyCarousel } from "./_hooks"
import { AgentChip } from "./agent-chip"

export const Agents = () => {
    const router = useRouter()
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
                        <ClientTranslate translationKey="agents" />
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

                <div className="relative flex items-center justify-center mt-10">
                    <div className="flex gap-2">
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
                    {multiplied?.length > 8 && (
                        <button
                            onClick={() =>
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/agents",
                                    }),
                                )
                            }
                            className="absolute right-0 flex items-center cursor-pointer gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
                        >
                            <ClientTranslate translationKey="exploreAll" />
                            <ArrowRight
                                size={15}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}
