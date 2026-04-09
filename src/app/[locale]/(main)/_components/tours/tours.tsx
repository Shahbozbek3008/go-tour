// components/sections/TourSection.tsx
"use client"

import { Card } from "@/components/card"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useState } from "react"

type Tab = {
    id: string
    label: string
    highlight?: boolean
}

type Tour = {
    id: number
    title: string
    subtitle: string
    image: string
    price: number
    originalPrice?: number
    discount?: number
    days: number
    rating: number
    reviews: number
    location: string
    dates: string
    author: string
    authorAvatar: string
    badge: string
    badgeColor: string
    isNew?: boolean
    category: string
}

const tabs: Tab[] = [
    { id: "all", label: "Barchasini ko'rish" },
    { id: "bestseller", label: "Eng ko'p sotiladigan" },
    { id: "discount", label: "Chegirmali turlar" },
    { id: "best", label: "Eng yaxshi turlar" },
    { id: "new", label: "Yangi turlar" },
    { id: "special", label: "Maxsus takliflar" },
]

const tours: Tour[] = [
    {
        id: 1,
        title: "Astana City Tour",
        subtitle: "Zamonaviy Shahar",
        image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
        price: 1637,
        originalPrice: 2046,
        discount: 20,
        days: 2,
        rating: 5.0,
        reviews: 24,
        location: "Qozog'iston, Astana",
        dates: "15 – 17 iyun",
        author: "Silk Road Travel",
        authorAvatar: "https://i.pravatar.cc/40?img=1",
        badge: "Maxsus takliflar",
        badgeColor: "blue",
        category: "special",
    },
    {
        id: 2,
        title: "Paris Romantic Escape",
        subtitle: "Sevishganlar Uchun Parij",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
        price: 1565,
        originalPrice: 1956,
        discount: 20,
        days: 4,
        rating: 5.0,
        reviews: 180,
        location: "Fransiya, Parij",
        dates: "23 – 27 iyun",
        author: "Silk Road Travel",
        authorAvatar: "https://i.pravatar.cc/40?img=2",
        badge: "Maxsus takliflar",
        badgeColor: "blue",
        category: "special",
    },
    {
        id: 3,
        title: "Maldives Luxury Resort",
        subtitle: "Orollarda Premium Dam Olish",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        price: 1619,
        originalPrice: 1704,
        discount: 5,
        days: 6,
        rating: 5.0,
        reviews: 360,
        location: "Maldivlar",
        dates: "1 – 7 iyul",
        author: "Samarkand Tours",
        authorAvatar: "https://i.pravatar.cc/40?img=3",
        badge: "Maxsus takliflar",
        badgeColor: "blue",
        category: "special",
    },
    {
        id: 4,
        title: "Dubai Luxury Escape",
        subtitle: "Dubayda Hashamatli Mehmonxonalar",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        price: 1517,
        originalPrice: 1596,
        discount: 5,
        days: 4,
        rating: 4.9,
        reviews: 92,
        location: "BAA, Dubai",
        dates: "20 – 24 iyun",
        author: "Silk Road Travel",
        authorAvatar: "https://i.pravatar.cc/40?img=4",
        badge: "Maxsus takliflar",
        badgeColor: "blue",
        category: "special",
    },
    {
        id: 5,
        title: "Tokyo Explorer",
        subtitle: "Yaponiya Madaniyati Va Texnologiyasi",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        price: 2100,
        originalPrice: 2310,
        discount: 10,
        days: 7,
        rating: 5.0,
        reviews: 145,
        location: "Yaponiya, Tokio",
        dates: "10 – 17 iyul",
        author: "Asia Travel",
        authorAvatar: "https://i.pravatar.cc/40?img=5",
        badge: "Yangi",
        badgeColor: "green",
        isNew: true,
        category: "new",
    },
    {
        id: 6,
        title: "Bali Retreat",
        subtitle: "Ruhiy Tinchlik Va Tabiat",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        price: 980,
        originalPrice: 1300,
        discount: 25,
        days: 5,
        rating: 4.8,
        reviews: 210,
        location: "Indoneziya, Bali",
        dates: "5 – 10 avgust",
        author: "Island Tours",
        authorAvatar: "https://i.pravatar.cc/40?img=6",
        badge: "Chegirma",
        badgeColor: "blue",
        category: "discount",
    },
    {
        id: 7,
        title: "Istanbul Discovery",
        subtitle: "Tarix Va Zamonaviylik",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
        price: 750,
        originalPrice: 830,
        discount: 10,
        days: 4,
        rating: 4.9,
        reviews: 88,
        location: "Turkiya, Istanbul",
        dates: "12 – 16 iyul",
        author: "Euro Travel",
        authorAvatar: "https://i.pravatar.cc/40?img=7",
        badge: "Bestseller",
        badgeColor: "blue",
        category: "bestseller",
    },
    {
        id: 8,
        title: "Santorini Dream",
        subtitle: "Oq Uylar Va Ko'k Dengiz",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        price: 1850,
        originalPrice: 1850,
        days: 6,
        rating: 5.0,
        reviews: 312,
        location: "Gretsiya, Santorini",
        dates: "20 – 26 iyul",
        author: "Med Travel",
        authorAvatar: "https://i.pravatar.cc/40?img=8",
        badge: "Eng Yaxshi",
        badgeColor: "blue",
        category: "best",
    },
]

export const TourSection = () => {
    const [activeTab, setActiveTab] = useState("all")
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const filtered =
        activeTab === "all" ? tours : (
            tours.filter((t) => t.category === activeTab)
        )

    return (
        <section className="w-full bg-[#f0f4ff] my-10 px-15 py-15  overflow-hidden">
            <div className="">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <span className="text-[13px] font-medium text-slate-500 hidden md:block whitespace-nowrap">
                        Barchasini ko'rish
                    </span>

                    <div className="flex items-center gap-2 pb-1">
                        {tabs.slice(1).map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`relative flex-shrink-0 px-4 py-2 cursor-pointer rounded-full text-[13px] font-medium transition-colors duration-200 ${
                                    activeTab === tab.id ?
                                        "bg-amber-500 text-white"
                                    :   "bg-white text-black"
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="tab-indicator"
                                        className="absolute inset-0 rounded-full bg-amber-500-z-10"
                                        transition={{
                                            duration: 0.25,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={scrollPrev}
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200 active:scale-95"
                        >
                            <ChevronLeft size={16} className="text-slate-600" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200 active:scale-95"
                        >
                            <ChevronRight
                                size={16}
                                className="text-slate-600"
                            />
                        </button>
                    </div>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-semibold text-center text-slate-800 mb-10"
                >
                    Toping mukammal sarguzashtni
                </motion.h2>

                <div ref={emblaRef} className="overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.div className="flex gap-4 pl-0.5 pb-2">
                            {filtered.map((tour) => (
                                <Card
                                    key={`${activeTab}-${tour.id}`}
                                    tour={tour}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex md:hidden items-center justify-center gap-3 mt-6">
                    <button
                        onClick={scrollPrev}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm active:scale-95"
                    >
                        <ChevronLeft size={18} className="text-slate-600" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm active:scale-95"
                    >
                        <ChevronRight size={18} className="text-slate-600" />
                    </button>
                </div>
            </div>
        </section>
    )
}
