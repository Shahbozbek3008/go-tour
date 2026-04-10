"use client"

import { Card } from "@/components/card"
import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

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

type SortKey = "popular" | "price_asc" | "price_desc" | "rating" | "newest"

interface SortOption {
    key: SortKey
    label: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_OPTIONS: SortOption[] = [
    { key: "popular", label: "Mashhurlar" },
    { key: "price_asc", label: "Arzon avval" },
    { key: "price_desc", label: "Qimmat avval" },
    { key: "rating", label: "Yuqori reyting" },
    { key: "newest", label: "Yangilar" },
]

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

// ─── Sort helper ──────────────────────────────────────────────────────────────

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

// ─── SortDropdown ─────────────────────────────────────────────────────────────

interface SortDropdownProps {
    value: SortKey
    onChange: (key: SortKey) => void
}

function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    const current = SORT_OPTIONS.find((o) => o.key === value)!

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((p) => !p)}
                className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl",
                    "text-[13px] font-medium text-zinc-700",
                    "bg-white border border-zinc-200/80",
                    "hover:border-zinc-300 hover:bg-zinc-50",
                    "transition-all duration-150 focus-visible:outline-none",
                    "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
                )}
            >
                <span className="text-zinc-400 text-[12px] font-normal">
                    Saralash:
                </span>
                <span>{current.label}</span>
                <ChevronDown
                    className={cn(
                        "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute right-0 top-full mt-2 z-50",
                            "w-48 rounded-xl bg-white",
                            "border border-zinc-200/80",
                            "shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]",
                            "overflow-hidden",
                        )}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => {
                                    onChange(opt.key)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "flex items-center justify-between w-full px-4 py-2.5",
                                    "text-[13px] transition-colors duration-100",
                                    "focus-visible:outline-none",
                                    opt.key === value ?
                                        "text-zinc-900 font-medium bg-zinc-50"
                                    :   "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800",
                                )}
                            >
                                {opt.label}
                                {opt.key === value && (
                                    <Check className="h-3.5 w-3.5 text-zinc-900" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const CatalogRightSide = () => {
    const [sortKey, setSortKey] = React.useState<SortKey>("popular")

    const sorted = React.useMemo(
        () => sortTours(MOCK_TOURS, sortKey),
        [sortKey],
    )

    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-end mb-6">
                <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>
            <motion.div
                layout
                className="grid gap-5"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
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
