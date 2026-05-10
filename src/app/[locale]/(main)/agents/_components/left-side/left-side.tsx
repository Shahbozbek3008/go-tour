"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAllAgentsQuery } from "@/hooks/use-all-agents-query"
import { usePathname, useRouter } from "@/i18n/navigation"
import { TravelAgencyResponse } from "@/types/api/agents"
import { useSearchParams } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { AgentCard } from "./agent-card"

interface AgentsLeftSideProps {
    onSelect?: (id: number) => void
}

// Kard balandligi (88px) + gap (10px) = 98px
const ITEM_HEIGHT = 98
const VISIBLE_HEIGHT = 700
const OVERSCAN = 3

export const AgentsLeftSide = ({ onSelect }: AgentsLeftSideProps) => {
    const { allAgents, isLoading } = useAllAgentsQuery()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const selectedId = Number(searchParams.get("agentId")) || 0
    const [scrollTop, setScrollTop] = useState(0)
    const viewportRef = useRef<HTMLElement | null>(null)

    const handleSelect = useCallback(
        (id: number) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set("agentId", id.toString())
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
            onSelect?.(id)
        },
        [searchParams, router, pathname, onSelect],
    )

    const scrollAreaRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return
        const viewport = node.querySelector(
            "[data-radix-scroll-area-viewport]",
        ) as HTMLElement | null
        if (!viewport) return
        viewportRef.current = viewport
        const onScroll = () => setScrollTop(viewport.scrollTop)
        viewport.addEventListener("scroll", onScroll, { passive: true })
        return () => viewport.removeEventListener("scroll", onScroll)
    }, [])

    const agentsList = allAgents || []
    const totalHeight = agentsList.length * ITEM_HEIGHT

    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN,
    )
    const endIndex = Math.min(
        agentsList.length,
        Math.ceil((scrollTop + VISIBLE_HEIGHT) / ITEM_HEIGHT) + OVERSCAN,
    )

    const visibleAgents = agentsList.slice(startIndex, endIndex)

    return (
        <aside className="w-full md:w-[280px] md:shrink-0 sticky top-24 z-20">
            <h5 className="text-[14px] font-bold text-zinc-900 uppercase tracking-tight mb-4 px-1">
                <ClientTranslate translationKey="agents" />
            </h5>

            <div
                ref={scrollAreaRef}
                className="hidden md:block overflow-hidden"
            >
                <ScrollArea className="h-[700px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {isLoading ?
                        <div className="space-y-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-[88px] rounded-xl bg-zinc-50 animate-pulse border border-zinc-100"
                                />
                            ))}
                        </div>
                    :   <div
                            style={{
                                height: `${totalHeight}px`,
                                position: "relative",
                            }}
                            className="w-full"
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    transform: `translateY(${startIndex * ITEM_HEIGHT}px)`,
                                }}
                                className="flex flex-col gap-[10px]"
                            >
                                {visibleAgents.map((agent) => (
                                    <AgentCard
                                        key={agent.id}
                                        agent={agent as TravelAgencyResponse}
                                        selected={selectedId === agent.id}
                                        onSelect={handleSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    }
                </ScrollArea>
            </div>

            {/* Mobile View: Horizontal Scroll */}
            <div className="md:hidden">
                <div className="flex flex-row gap-3 overflow-x-auto pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {isLoading ?
                        Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="min-w-[280px] h-[88px] rounded-xl bg-zinc-50 animate-pulse border border-zinc-100"
                            />
                        ))
                    :   agentsList.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent as TravelAgencyResponse}
                                selected={selectedId === agent.id}
                                onSelect={handleSelect}
                            />
                        ))
                    }
                </div>
            </div>
        </aside>
    )
}
