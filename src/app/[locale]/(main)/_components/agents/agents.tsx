"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useAllAgentsQuery } from "@/hooks/use-all-agents-query"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { TravelAgencyResponse } from "@/types/api/agents"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useMultiplyCarousel } from "./_hooks"
import { AgentChip } from "./agent-chip"

export const Agents = () => {
    const t = useTranslations()
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
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <p className="text-[12px] uppercase tracking-widest font-semibold text-blue-600 mb-3">
                        <ClientTranslate translationKey="agents_subtitle" />
                    </p>
                    <h2 className="text-3xl md:text-[40px] tracking-tight font-bold text-slate-900">
                        <ClientTranslate translationKey="agents_title" />
                    </h2>
                </div>

                {/* Mobile: Explore All tugmasi cardlar tepasida o'ngda */}
                {multiplied?.length > 8 && (
                    <div className="flex justify-end mb-3 sm:hidden">
                        <button
                            onClick={() =>
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/agents",
                                    }),
                                )
                            }
                            className="flex items-center cursor-pointer gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
                        >
                            <ClientTranslate translationKey="exploreAll" />
                            <ArrowRight
                                size={15}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </button>
                    </div>
                )}

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
                                aria-label={t("goToSlide", { slide: i + 1 })}
                            />
                        ))}
                    </div>

                    {/* Desktop: o'zgarishsiz */}
                    {multiplied?.length > 8 && (
                        <button
                            onClick={() =>
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/agents",
                                    }),
                                )
                            }
                            className="hidden sm:flex absolute right-0 items-center cursor-pointer gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
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
