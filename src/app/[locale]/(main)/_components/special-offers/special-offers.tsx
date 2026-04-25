"use client"

import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { Tour } from "@/types/api/tour"
import { motion } from "framer-motion"
import Image from "next/image"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useTourRecommendedQuery } from "../tours/_hooks"

const AUTOPLAY_INTERVAL = 3500
const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
const FALLBACK_LOGO =
    "https://ui-avatars.com/api/?name=GT&background=0F1B2D&color=fff&size=80&bold=true"

const cardVariants = {
    active: {
        x: "0%",
        scale: 1,
        zIndex: 30,
        opacity: 1,
        filter: "blur(0px) brightness(100%)",
    },
    left1: {
        x: "-55%",
        scale: 0.85,
        zIndex: 20,
        opacity: 0.95,
        filter: "blur(1.5px) brightness(75%)",
    },
    right1: {
        x: "55%",
        scale: 0.85,
        zIndex: 20,
        opacity: 0.95,
        filter: "blur(1.5px) brightness(75%)",
    },
    left2: {
        x: "-100%",
        scale: 0.7,
        zIndex: 10,
        opacity: 0.7,
        filter: "blur(4px) brightness(50%)",
    },
    right2: {
        x: "100%",
        scale: 0.7,
        zIndex: 10,
        opacity: 0.7,
        filter: "blur(4px) brightness(50%)",
    },
    hiddenLeft: {
        x: "-120%",
        scale: 0.5,
        zIndex: 0,
        opacity: 0,
        filter: "blur(8px) brightness(20%)",
    },
    hiddenRight: {
        x: "120%",
        scale: 0.5,
        zIndex: 0,
        opacity: 0,
        filter: "blur(8px) brightness(20%)",
    },
}

const cardTransition = { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }

function getSlideVariant(offset: number) {
    const abs = Math.abs(offset)
    const left = offset < 0
    if (abs === 0) return "active"
    if (abs === 1) return left ? "left1" : "right1"
    if (abs === 2) return left ? "left2" : "right2"
    return left ? "hiddenLeft" : "hiddenRight"
}

interface TourCardProps {
    tour: Tour
    offset: number
    onActivate: (id: number) => void
    onNext: () => void
    onPrev: () => void
}

const TourCard = memo(function TourCard({
    tour,
    offset,
    onActivate,
    onNext,
    onPrev,
}: TourCardProps) {
    const router = useRouter()
    const variant = getSlideVariant(offset)
    const isActive = variant === "active"
    const agentName = "GoTour"
    const agentLogo = FALLBACK_LOGO
    const image = tour.imageUrl ?? FALLBACK_IMAGE
    const title = tour.nameUz
    const price = `$${tour.minPrice.toLocaleString()}`
    const discount = tour.hasDiscount ? `-${tour.discountPercent}%` : null

    return (
        <motion.div
            className="absolute w-[280px] md:w-[350px] lg:w-[420px] h-full rounded-[32px] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
            variants={cardVariants}
            initial={false}
            animate={variant}
            transition={cardTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
                const { offset: off, velocity } = info
                if (off.x < -40 || velocity.x < -500) onNext()
                else if (off.x > 40 || velocity.x > 500) onPrev()
                else if (!isActive) onActivate(tour.id)
            }}
            onClick={() => {
                if (!isActive) onActivate(tour.id)
            }}
        >
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    unoptimized
                    className="object-cover"
                    priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/90 via-[#0F1B2D]/20 to-transparent" />

                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 md:py-2 md:px-4 rounded-full flex items-center gap-2 shadow-lg">
                            <Image
                                src={agentLogo}
                                alt={agentName}
                                width={24}
                                height={24}
                                className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
                                unoptimized
                            />
                            <span className="text-xs md:text-sm font-bold text-gray-800">
                                {agentName}
                            </span>
                        </div>

                        {discount && (
                            <div className="bg-red-500 shadow-lg shadow-red-500/30 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
                                {discount}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-end gap-3 flex-wrap sm:flex-nowrap">
                        <div className="mb-1 w-full sm:w-auto flex-1">
                            <h3 className="text-2xl md:text-[28px] font-bold text-white leading-tight mb-1.5 drop-shadow-md">
                                {title}
                            </h3>
                            <p className="text-base md:text-lg font-semibold text-white drop-shadow-md">
                                {price}
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/tour/[slug]",
                                        query: {
                                            slug: String(tour.id),
                                        },
                                    }),
                                )
                            }
                            className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-[100px] px-6 py-2.5 text-sm font-bold whitespace-nowrap mb-1"
                        >
                            Batafsil
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})

export const SpecialOffers = () => {
    const { recommendedTours } = useTourRecommendedQuery()

    const tours: Tour[] = useMemo(
        () => recommendedTours ?? [],
        [recommendedTours],
    )

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const total = tours.length

    const next = useCallback(
        () => setCurrentIndex((p) => (p + 1) % total),
        [total],
    )
    const prev = useCallback(
        () => setCurrentIndex((p) => (p - 1 + total) % total),
        [total],
    )
    const activate = useCallback(
        (id: number) => {
            const idx = tours.findIndex((t) => t.id === id)
            if (idx !== -1) setCurrentIndex(idx)
        },
        [tours],
    )

    useEffect(() => {
        if (!isAutoPlaying || total === 0) return
        const timer = setInterval(next, AUTOPLAY_INTERVAL)
        return () => clearInterval(timer)
    }, [isAutoPlaying, next, total])

    if (!total) return null

    return (
        <section className="w-full py-16 overflow-hidden select-none">
            <div className="w-full home-container">
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 tracking-tight text-center mb-12 md:mb-16">
                    Maxsus takliflar
                </h2>
            </div>

            <div
                className="relative h-[420px] md:h-[550px] lg:h-[650px] w-full mx-auto flex items-center justify-center touch-pan-y perspective-[1000px]"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {tours.map((tour, index) => (
                    <TourCard
                        key={tour.id}
                        tour={tour}
                        offset={index - currentIndex}
                        onActivate={activate}
                        onNext={next}
                        onPrev={prev}
                    />
                ))}
            </div>
        </section>
    )
}
