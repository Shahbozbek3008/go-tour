"use client"

import { ProductCard } from "@/components/card"
import ClientTranslate from "@/components/common/translation/client-translate"
import { useTourSearch } from "@/hooks/react-query/use-tour-search-query"
import { useRouter } from "@/i18n/navigation"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { getHref } from "@/lib/utils/get-href"
import { keepPreviousData } from "@tanstack/react-query"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import {
    useTourDiscountsQuery,
    useTourRecommendedQuery,
    useTourTopSellingQuery,
} from "./_hooks"

type Tab = {
    id: string
    label: string
}

const TABS: Tab[] = [
    { id: "all", label: "all2" },
    { id: "bestseller", label: "bestseller" },
    { id: "discount", label: "discount" },
    { id: "best", label: "best" },
    { id: "new", label: "newTours" },
    { id: "special", label: "specialOffers" },
]

export const TourSection = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("all")
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    })
    const { tours: rawTours } = useTourSearch({
        data: {
            sortBy:
                activeTab === "new" ? "NEWEST"
                : activeTab === "best" ? "RATING_DESC"
                : undefined,
        },
        options: {
            placeholderData: keepPreviousData,
        },
    })
    const { topSellingTours } = useTourTopSellingQuery({
        options: {
            enabled: activeTab === "bestseller",
            placeholderData: keepPreviousData,
        },
    })
    const { recommendedTours } = useTourRecommendedQuery()
    const { discountTours } = useTourDiscountsQuery({
        options: {
            enabled: activeTab === "discount",
            placeholderData: keepPreviousData,
        },
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const tours = useMemo(() => {
        if (activeTab === "bestseller") {
            return adaptTours(topSellingTours ?? [])
        }
        if (activeTab === "special") {
            return adaptTours(recommendedTours ?? [])
        }
        if (activeTab === "discount") {
            return adaptTours(discountTours ?? [])
        }
        return adaptTours(rawTours ?? [])
    }, [rawTours, topSellingTours, recommendedTours, discountTours, activeTab])

    return (
        <section className="w-full bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">
            <div className="w-full home-container">
                <div className="flex flex-col items-center justify-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-[40px] font-bold text-center text-slate-900 mb-8 tracking-tight"
                    >
                        <ClientTranslate translationKey="findThePerfectAdventure" />
                    </motion.h2>

                    <div className="flex items-center justify-start md:justify-center gap-1 p-1.5 bg-slate-200/50 rounded-full overflow-x-auto whitespace-nowrap w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex-shrink-0 px-5 py-2 cursor-pointer rounded-full text-[14px] font-medium transition-all duration-300 ${
                                    activeTab === tab.id ?
                                        "bg-white text-slate-900 shadow-sm"
                                    :   "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                                }`}
                            >
                                <ClientTranslate translationKey={tab?.label} /> 
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    ref={emblaRef}
                    className="overflow-hidden cursor-grab active:cursor-grabbing"
                >
                    <AnimatePresence mode="popLayout">
                        <motion.div className="flex gap-4 pl-0.5 pb-2">
                            {tours?.map((tour) => (
                                <ProductCard
                                    tour={tour}
                                    key={`${activeTab}-${tour.id}`}
                                    wrapperClassName="w-full md:w-[320px]"
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center justify-between mt-8 border-t border-slate-200/60 pt-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollPrev}
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200 active:scale-95"
                        >
                            <ChevronLeft size={18} className="text-slate-600" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200 active:scale-95"
                        >
                            <ChevronRight
                                size={18}
                                className="text-slate-600"
                            />
                        </button>
                    </div>
                    <button
                        onClick={() =>
                            router.push(
                                getHref({
                                    pathname: "/[locale]/catalog",
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
            </div>
        </section>
    )
}
