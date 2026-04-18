"use client"

import { Card } from "@/components/card"
import { SortDropdown, SortKey } from "@/components/common/sort-dropdown"
import { motion } from "framer-motion"
import * as React from "react"
import { useFilter } from "../../_hooks"
import { FilterTriggerButton } from "../left-side/filter-trigger-button"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tour {
    id: number
    title: string
    subtitle: string
    image: string
    author: string
    authorAvatar: string
    rating: number
    reviews: number
    location: string
    price: number
    originalPrice?: number
    days: number
    dates: string
    badge: string
    isNew?: boolean
    discount?: number
}

const MOCK_TOURS: Tour[] = [
    {
        id: 1,
        title: "Phuket Adventure Tour",
        subtitle: "Orollar, Dengiz Va Ekstremal Faoliyat",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80",
        author: "Samarkand Tours",
        authorAvatar: "https://i.pravatar.cc/48?img=11",
        rating: 4.8,
        reviews: 124,
        location: "Tailand",
        price: 1547,
        days: 7,
        dates: "Iyun 12–19",
        badge: "Ko'p sotiladigan",
    },
    {
        id: 2,
        title: "Paris Romantic Escape",
        subtitle: "Sevishganlar Uchun Parij",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=640&q=80",
        author: "Silk Road Travel",
        authorAvatar: "https://i.pravatar.cc/48?img=22",
        rating: 4.9,
        reviews: 210,
        location: "Fransiya",
        price: 1565,
        originalPrice: 1956,
        days: 4,
        dates: "May 20–24",
        badge: "Ko'p sotiladigan",
        discount: 20,
    },
    {
        id: 3,
        title: "Kemer Relax Tour",
        subtitle: "Spa Va Dengiz Bilan Dam Olish",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=640&q=80",
        author: "Golden Bukhara",
        authorAvatar: "https://i.pravatar.cc/48?img=33",
        rating: 4.7,
        reviews: 98,
        location: "Turkiya",
        price: 1505,
        days: 5,
        dates: "Iyul 1–6",
        badge: "Ko'p sotiladigan",
    },
    {
        id: 4,
        title: "Bali Spiritual Journey",
        subtitle: "Ma'bad Va Tropik O'rmonlar",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=640&q=80",
        author: "Tashkent Explore",
        authorAvatar: "https://i.pravatar.cc/48?img=44",
        rating: 4.6,
        reviews: 76,
        location: "Indoneziya",
        price: 1320,
        days: 8,
        dates: "Avg 5–13",
        badge: "Yangi",
        isNew: true,
    },
    {
        id: 5,
        title: "Santorini Sunset Tour",
        subtitle: "Oq Uylar Va Ko'k Gumbazlar",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=640&q=80",
        author: "Aegean Voyages",
        authorAvatar: "https://i.pravatar.cc/48?img=55",
        rating: 5.0,
        reviews: 312,
        location: "Gretsiya",
        price: 2100,
        originalPrice: 2450,
        days: 6,
        dates: "Sen 3–9",
        badge: "Top tanlov",
        discount: 14,
    },
    {
        id: 6,
        title: "Tokyo City Explorer",
        subtitle: "Zamonaviy Va An'anaviy Yaponiya",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&q=80",
        author: "East Asia Tours",
        authorAvatar: "https://i.pravatar.cc/48?img=66",
        rating: 4.8,
        reviews: 187,
        location: "Yaponiya",
        price: 2890,
        days: 10,
        dates: "Okt 10–20",
        badge: "Ko'p sotiladigan",
    },
    {
        id: 7,
        title: "Dubai Luxury Escape",
        subtitle: "Burj Khalifa Va Cho'l Safari",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=640&q=80",
        author: "Arabian Nights",
        authorAvatar: "https://i.pravatar.cc/48?img=77",
        rating: 4.7,
        reviews: 143,
        location: "BAA",
        price: 1980,
        days: 5,
        dates: "Noy 15–20",
        badge: "Lyuks",
    },
    {
        id: 8,
        title: "Maldives Overwater Villa",
        subtitle: "Shaffof Suv Va Marjon Riflari",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=640&q=80",
        author: "Ocean Dreamers",
        authorAvatar: "https://i.pravatar.cc/48?img=88",
        rating: 4.9,
        reviews: 264,
        location: "Maldiv",
        price: 3450,
        originalPrice: 3900,
        days: 7,
        dates: "Dek 1–8",
        badge: "Top tanlov",
        discount: 12,
    },
    {
        id: 9,
        title: "Cappadocia Balloon Ride",
        subtitle: "Toshdan Yasalgan Shaharlar Ustida",
        image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=640&q=80",
        author: "Anatolia Tours",
        authorAvatar: "https://i.pravatar.cc/48?img=12",
        rating: 4.8,
        reviews: 91,
        location: "Turkiya",
        price: 1150,
        days: 4,
        dates: "May 5–9",
        badge: "Yangi",
        isNew: true,
    },
]

function sortTours(tours: Tour[], key: SortKey): Tour[] {
    return [...tours].sort((a, b) => {
        switch (key) {
            case "price_asc":
                return a.price - b.price
            case "price_desc":
                return b.price - a.price
            case "rating":
                return b.rating - a.rating
            case "newest":
                return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
            default:
                return b.reviews - a.reviews
        }
    })
}

interface CatalogRightSideProps {
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CatalogRightSide = ({ setSheetOpen }: CatalogRightSideProps) => {
    const [sortKey, setSortKey] = React.useState<SortKey>("popular")
    const { activeFiltersCount } = useFilter()

    const sorted = React.useMemo(
        () => sortTours(MOCK_TOURS, sortKey),
        [sortKey],
    )

    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center lg:justify-end justify-between  mb-6">
                <div className="flex items-center justify-between lg:hidden">
                    <FilterTriggerButton
                        activeCount={activeFiltersCount}
                        onClick={() => setSheetOpen(true)}
                    />
                </div>
                <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>
            <motion.div
                layout
                className="grid gap-5"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                }}
            >
                {sorted.map((tour, i) => (
                    <motion.div
                        key={tour.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: i * 0.04,
                        }}
                    >
                        <Card tour={tour} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default CatalogRightSide
