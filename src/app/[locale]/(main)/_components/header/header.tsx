"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/shadcn"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { SearchBar } from "./searchbar"

interface Slide {
    id: number
    image: string
    badge?: string
    title: string
    subtitle: string
    cta: string
    href: string
}

const slides: Slide[] = [
    {
        id: 1,
        image: "https://uzbekistan.travel/storage/app/media/uploaded-files/samarkand-uzbekistan-kupol-mechet-ploshchad.png",
        badge: "POPULAR",
        title: "Cultural Tours",
        subtitle: "Explore the ancient cities of Uzbekistan",
        cta: "View Tours",
        href: "/tours/cultural",
    },
    {
        id: 2,
        image: "https://uzbekistan.travel/storage/app/media/Rasmlar/Samarqand/umumiy/cropped-images/shutterstock_1979665571-0-0-0-0-1738745770.jpg",
        badge: "NEW",
        title: "Historic Bukhara",
        subtitle: "Walk through 2,500 years of living history",
        cta: "Discover More",
        href: "/tours/bukhara",
    },
    {
        id: 3,
        image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1185723641v2.jpg?c=original",
        badge: "FEATURED",
        title: "Ancient Khiva",
        subtitle: "Step inside the world's greatest open-air museum",
        cta: "Explore Now",
        href: "/tours/khiva",
    },
]

const AUTOPLAY_INTERVAL = 5000

export const Header = () => {
    const [current, setCurrent] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState<"left" | "right">("right")
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goTo = useCallback(
        (index: number, dir: "left" | "right" = "right") => {
            if (isAnimating) return
            setDirection(dir)
            setIsAnimating(true)
            setTimeout(() => {
                setCurrent(index)
                setIsAnimating(false)
            }, 360)
        },
        [isAnimating],
    )

    const prev = useCallback(() => {
        const prevIndex = (current - 1 + slides.length) % slides.length
        goTo(prevIndex, "left")
    }, [current, goTo])

    const next = useCallback(() => {
        const nextIndex = (current + 1) % slides.length
        goTo(nextIndex, "right")
    }, [current, goTo])

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(next, AUTOPLAY_INTERVAL)
    }, [next])

    useEffect(() => {
        resetTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [resetTimer])

    const handlePrev = () => {
        prev()
        resetTimer()
    }

    const handleNext = () => {
        next()
        resetTimer()
    }

    const slide = slides[current]

    return (
        <div className="relative aspect-[16/6] max-h-[600px] w-full">
            <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/6] min-h-[320px] h-full  select-none group cursor-pointer">
                <div
                    className={cn(
                        "absolute inset-0 transition-all duration-700 ease-in-out rounded-2xl",
                        isAnimating ?
                            direction === "right" ?
                                "-translate-x-8 opacity-0"
                            :   "translate-x-8 opacity-0"
                        :   "translate-x-0 opacity-100",
                    )}
                >
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 100vw"
                            className="object-cover transition-transform duration-[8000ms] ease-linear group-hover:scale-105 scale-100 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10 rounded-2xl overflow-hidden" />

                {/* Content */}
                <div
                    className={cn(
                        "absolute inset-0 left-10 z-20 flex flex-col justify-end sm:justify-center px-6 sm:px-12 pb-12 sm:pb-0 transition-all duration-500",
                        isAnimating ?
                            "opacity-0 translate-y-4"
                        :   "opacity-100 translate-y-0",
                    )}
                >
                    {slide.badge && (
                        <Badge
                            variant="secondary"
                            className="w-fit mb-3 bg-amber-400/90 text-amber-900 font-bold tracking-widest text-[10px] sm:text-xs px-3 py-1 rounded-full border-0"
                        >
                            {slide.badge}
                        </Badge>
                    )}

                    <h1 className="text-white font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight drop-shadow-lg max-w-xl">
                        {slide.title}
                    </h1>

                    <p className="text-white/80 text-sm sm:text-base lg:text-lg mt-2 mb-5 max-w-md font-light tracking-wide">
                        {slide.subtitle}
                    </p>

                    <Button
                        variant="secondary"
                        className="w-fit bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-full px-6 py-2.5 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                        {slide.cta}
                        <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </div>

                {/* Prev / Next arrows */}
                <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-white/25 transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-white/25 transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <div className="absolute left-1/2 -bottom-[30px] -translate-x-1/2 z-100">
                <SearchBar />
            </div>
        </div>
    )
}
