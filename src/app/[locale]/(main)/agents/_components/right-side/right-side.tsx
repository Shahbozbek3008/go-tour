"use client"

import { ProductCard, ProductGridSkeleton } from "@/components/card"
import { SortDropdown, SortKey } from "@/components/common/sort-dropdown"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { useInfiniteTourSearch } from "@/hooks/react-query/use-tour-search-query"
import { useAllAgentsQuery } from "@/hooks/use-all-agents-query"
import { usePathname, useRouter } from "@/i18n/navigation"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { keepPreviousData } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { SearchX, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"
import { useInView } from "react-intersection-observer"

export const AgentsRightSide = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const { allAgents } = useAllAgentsQuery()
    const agentRef = useRef<HTMLDivElement>(null)
    const agentId = Number(searchParams.get("agentId")) || 0

    const selectedAgent = useMemo(
        () => allAgents.find((agent) => agent.id === agentId),
        [allAgents, agentId],
    )

    const handleClear = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("agentId")
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.1,
        rootMargin: "200px",
    })

    const {
        data: toursData,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteTourSearch({
        deps: [searchParams],
        data: {
            sortBy: searchParams.get("sortBy") as SortKey,
            agentId: agentId ? agentId.toString() : undefined,
        },
        options: { placeholderData: keepPreviousData },
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            const originalRestoration = window.history.scrollRestoration
            window.history.scrollRestoration = "manual"
            window.scrollTo({ top: 0, behavior: "instant" })
            return () => {
                window.history.scrollRestoration = originalRestoration
            }
        }
    }, [])

    useEffect(() => {
        if (!agentRef.current) return
        const rect = agentRef.current.getBoundingClientRect()
        if (rect.top < 0) {
            window.scrollTo({
                top: window.scrollY + rect.top - 100,
                behavior: "smooth",
            })
        }
    }, [agentId])

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

    const adaptedTours = useMemo(() => adaptTours(toursData ?? []), [toursData])
    const showSkeleton = isLoading && toursData.length === 0
    const isEmpty = !isLoading && !isFetching && toursData.length === 0

    return (
        <div ref={agentRef} className="flex flex-col gap-6 min-w-0 w-full">
            {/*
             * HEADER
             * ──────────────────────────────────────────────────────
             * Layout (doim 1 qator, hech qachon siqilmaydi):
             *
             *   [Title]  [Badge · flex-1]  [Sort-mobile]  [Sort-desktop]
             *
             * Mobil  (<sm): SortDropdown iconOnly=true  → 32×32px kvadrat
             *                Badge to'liq ko'rinadi, truncate yo'q
             * Desktop (≥sm): SortDropdown oddiy rejim   → matnli tugma
             *
             * Nima uchun bu eng professional yechim:
             *  ✦ Agent nomi HECH QACHON truncate bo'lmaydi
             *  ✦ Sort tugmasi HECH QACHON siqilmaydi
             *  ✦ Bitta komponent — ikki xil prop, ikki xil ko'rinish
             *  ✦ Active sort tanlangan bo'lsa icon ustida ko'k nuqta (badge)
             *  ✦ AnimatePresence bilan badge paydo/yo'qolish animatsiyasi
             * ──────────────────────────────────────────────────────
             */}
            <div className="flex items-center gap-2 min-w-0">
                {/* Title — shrink-0, hech qachon siqilmaydi */}
                <h5 className="text-base font-semibold shrink-0">
                    <ClientTranslate
                        translationKey={
                            selectedAgent ? "selected" : "agents_label"
                        }
                    />
                </h5>

                {/* Badge — flex-1 bilan o'rtadagi joyni egallaydi */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {selectedAgent ?
                            <motion.div
                                key="selected-badge"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Badge
                                    variant="destructive"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 font-medium text-xs bg-[#f5f9ff] text-black border border-zinc-200 rounded-full"
                                >
                                    {/* To'liq matn — truncate yo'q */}
                                    {selectedAgent.name}
                                    <button
                                        onClick={handleClear}
                                        aria-label="Agentni o'chirish"
                                        className="shrink-0 hover:bg-zinc-100 rounded-full p-0.5 transition-colors"
                                    >
                                        <X className="w-3 h-3 text-zinc-400" />
                                    </button>
                                </Badge>
                            </motion.div>
                        :   <motion.div
                                key="all-badge"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Badge
                                    variant="outline"
                                    className="px-2.5 py-1 font-medium bg-white text-black text-xs border-zinc-200 rounded-full"
                                >
                                    <ClientTranslate translationKey="all2" />
                                </Badge>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>

                {/*
                 * Sort — mobilda icon-only (shrink-0, 32px),
                 * desktopda to'liq matnli tugma
                 */}
                <div className="shrink-0 sm:hidden">
                    <SortDropdown iconOnly />
                </div>
                <div className="shrink-0 hidden sm:block">
                    <SortDropdown />
                </div>
            </div>

            <div className="relative flex-1">
                <motion.div
                    layout
                    initial={false}
                    transition={{ duration: 0.3 }}
                    className="grid gap-5"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                    }}
                >
                    {showSkeleton ?
                        <ProductGridSkeleton count={6} />
                    :   adaptedTours?.map((tour, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                            >
                                <ProductCard tour={tour} />
                            </motion.div>
                        ))
                    }
                </motion.div>

                {isEmpty && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center"
                    >
                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                            <SearchX className="w-8 h-8 text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                            <ClientTranslate translationKey="noToursFound" />
                        </h3>
                        <p className="text-zinc-500 max-w-[280px]">
                            <ClientTranslate translationKey="tryChangingFilters" />
                        </p>
                    </motion.div>
                )}
            </div>

            {!isLoading && toursData.length > 0 && hasNextPage && (
                <div className="mt-5">
                    {isFetchingNextPage && (
                        <div
                            className="grid gap-5 mb-10"
                            style={{
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(250px, 1fr))",
                            }}
                        >
                            <ProductGridSkeleton count={4} />
                        </div>
                    )}
                    <div ref={loadMoreRef} className="h-10 w-full" />
                </div>
            )}
        </div>
    )
}
