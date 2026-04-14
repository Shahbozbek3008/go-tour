// components/sections/TourSection.tsx
"use client"

import { Card } from "@/components/card"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRouter } from "@/i18n/navigation"
import { TOURS } from "@/lib/constants/tours"
import { getHref } from "@/lib/utils/get-href"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useState } from "react"

type Tab = {
    id: string
    label: string
    highlight?: boolean
}

const tabs: Tab[] = [
    { id: "all", label: "Barchasi" },
    { id: "bestseller", label: "Eng ko'p sotiladigan" },
    { id: "discount", label: "Chegirmali turlar" },
    { id: "best", label: "Eng yaxshi turlar" },
    { id: "new", label: "Yangi turlar" },
    { id: "special", label: "Maxsus takliflar" },
]

export const TourSection = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("all")
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const filtered =
        activeTab === "all" ? TOURS : (
            TOURS.filter((t) => t.category === activeTab)
        )

    return (
        <section className="w-full bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-15">
                <div className="flex flex-col items-center justify-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-[40px] font-bold text-center text-slate-900 mb-8 tracking-tight"
                    >
                        Toping mukammal sarguzashtni
                    </motion.h2>

                    <div className="flex items-center justify-start md:justify-center gap-1 p-1.5 bg-slate-200/50 rounded-full overflow-x-auto whitespace-nowrap w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex-shrink-0 px-5 py-2 cursor-pointer rounded-full text-[14px] font-medium transition-all duration-300 ${
                                    activeTab === tab.id ?
                                        "bg-white text-slate-900 shadow-sm"
                                    :   "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                                }`}
                            >
                                {tab.label}
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
                            {filtered.map((tour) => (
                                <Card
                                    key={`${activeTab}-${tour.id}`}
                                    tour={tour}
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

                    <Button
                        variant="ghost"
                        onClick={() =>
                            router.push(
                                getHref({
                                    pathname: "/[locale]/catalog",
                                }),
                            )
                        }
                        className="px-6 py-2.5 rounded-full font-semibold hover:bg-transparent hover:text-black active:scale-95 flex items-center gap-2"
                    >
                        <ClientTranslate translationKey="allView" />
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </section>
    )
}
