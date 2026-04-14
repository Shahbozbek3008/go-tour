"use client"

import { cn } from "@/lib/utils/shadcn"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

interface Slide {
    id: number
    image: string
    title: string
    description: string
}

const slides: Slide[] = [
    {
        id: 1,
        image: "https://uzbekistan.travel/storage/app/media/uploaded-files/samarkand-uzbekistan-kupol-mechet-ploshchad.png",
        title: "Sayohat agentlarini toping",
        description: "Ishonchli sayohat agentlarini toping",
    },
    {
        id: 2,
        image: "https://uzbekistan.travel/storage/app/media/Rasmlar/Samarqand/umumiy/cropped-images/shutterstock_1979665571-0-0-0-0-1738745770.jpg",
        title: "Eng yaxshi turlarni kashf eting",
        description:
            "Keyingi sayohatingiz uchun eng yaxshi agentliklarni kashf eting",
    },
    {
        id: 3,
        image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1185723641v2.jpg?c=original",
        title: "Ishonchli hamkorlar bilan sayohat",
        description: "Tasdiqlangan hamkorlardan turlar bron qiling",
    },
]

const AUTOPLAY_INTERVAL = 6000

export const AgentsHeader = () => {
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
            }, 500)
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
        <div className="relative w-full  md:mb-16">
            <div className="relative w-full h-[450px] lg:h-[60vh] overflow-hidden select-none group">
                <div
                    className={cn(
                        "absolute inset-0 transition-all duration-500 ease-[0.25,1,0.5,1]",
                        isAnimating ?
                            direction === "right" ?
                                "-translate-x-12 opacity-0"
                            :   "translate-x-12 opacity-0"
                        :   "translate-x-0 opacity-100",
                    )}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 100vw"
                            className="object-cover transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="absolute inset-0 bg-[#0F1B2D]/40 z-10 pointer-events-none" />

                <div
                    className={cn(
                        "absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-300 ease-out px-4 gap-3",
                        isAnimating ? "opacity-0 scale-95" : (
                            "opacity-100 scale-100"
                        ),
                    )}
                >
                    <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight drop-shadow-xl text-center">
                        {slide.title}
                    </h1>
                    <p className="text-white text-base sm:text-lg font-medium text-center max-w-xl drop-shadow">
                        {slide.description}
                    </p>
                </div>

                <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/40 transition-all duration-300 hover:scale-105"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/40 transition-all duration-300 hover:scale-105"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}
