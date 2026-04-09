"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

type SpecialOffer = {
    id: number
    agentName: string
    agentLogo: string
    discount: string
    title: string
    price: string
    image: string
}

const offers: SpecialOffer[] = [
    {
        id: 1,
        agentName: "Samarkand Tours",
        agentLogo:
            "https://ui-avatars.com/api/?name=ST&background=C9873A&color=fff&size=80&bold=true",
        discount: "-5%",
        title: "Maldives Luxury Resort",
        price: "$1619",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        agentName: "Asia Travel Group",
        agentLogo:
            "https://ui-avatars.com/api/?name=AT&background=1B4F8A&color=fff&size=80&bold=true",
        discount: "-10%",
        title: "Dubai Luxury Escape",
        price: "$1517",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        agentName: "Golden Bukhara",
        agentLogo:
            "https://ui-avatars.com/api/?name=GB&background=2D6A4F&color=fff&size=80&bold=true",
        discount: "-15%",
        title: "Antalya All Inclusive",
        price: "$1200",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        agentName: "Silk Road Travel",
        agentLogo:
            "https://ui-avatars.com/api/?name=SR&background=7B2D8B&color=fff&size=80&bold=true",
        discount: "-8%",
        title: "Umrah Pilgrimage",
        price: "$1400",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 5,
        agentName: "Tashkent Express",
        agentLogo:
            "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true",
        discount: "-20%",
        title: "Bali Tropical Paradise",
        price: "$1800",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 6,
        agentName: "Tashkent Express",
        agentLogo:
            "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true",
        discount: "-20%",
        title: "Bali Tropical Paradise",
        price: "$1800",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 7,
        agentName: "Tashkent Express",
        agentLogo:
            "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true",
        discount: "-20%",
        title: "Bali Tropical Paradise",
        price: "$1800",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 8,
        agentName: "Tashkent Express",
        agentLogo:
            "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true",
        discount: "-20%",
        title: "Bali Tropical Paradise",
        price: "$1800",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 9,
        agentName: "Tashkent Express",
        agentLogo:
            "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true",
        discount: "-20%",
        title: "Bali Tropical Paradise",
        price: "$1800",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 10,
        agentName: "Tashkent Express",
        agentLogo:
            "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true",
        discount: "-20%",
        title: "Bali Tropical Paradise",
        price: "$1800",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
]

export const SpecialOffers = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, [])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length)
    }, [])

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(nextSlide, 3500)
        return () => clearInterval(timer)
    }, [isAutoPlaying, nextSlide])

    const getVariant = (offset: number) => {
        const absOffset = Math.abs(offset)
        const isLeft = offset < 0
        const isRight = offset > 0

        if (absOffset === 0) return "active"
        if (absOffset === 1) return isLeft ? "left1" : "right1"
        if (absOffset === 2) return isLeft ? "left2" : "right2"
        return isLeft ? "hiddenLeft" : "hiddenRight"
    }

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

    return (
        <section className="w-full py-16 md:py-24 overflow-hidden select-none">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 tracking-tight text-center mb-12 md:mb-16">
                    Maxsus takliflar
                </h2>
            </div>

            <div
                className="relative h-[420px] md:h-[550px] lg:h-[650px] w-full  mx-auto flex items-center justify-center touch-pan-y perspective-[1000px]"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {offers.map((offer, index) => {
                    const offset = index - currentIndex

                    const state = getVariant(offset)
                    const isActive = state === "active"

                    return (
                        <motion.div
                            key={offer.id}
                            className="absolute w-[280px] md:w-[350px] lg:w-[420px] h-full rounded-[32px] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
                            variants={cardVariants}
                            initial={false}
                            animate={state}
                            transition={{
                                duration: 0.6,
                                ease: [0.32, 0.72, 0, 1], // Custom snappy spring-like cubic bezier
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.4}
                            onDragEnd={(_, info) => {
                                const swipe = info.offset.x
                                const velocity = info.velocity.x
                                if (swipe < -40 || velocity < -500) {
                                    nextSlide()
                                } else if (swipe > 40 || velocity > 500) {
                                    prevSlide()
                                } else if (!isActive) {
                                    // If clicked without dragging, make it active
                                    setCurrentIndex(index)
                                }
                            }}
                            onClick={() => {
                                if (!isActive) setCurrentIndex(index)
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={offer.image}
                                    alt={offer.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    priority={isActive}
                                />
                                {/* Gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/90 via-[#0F1B2D]/20 to-transparent" />

                                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                                    {/* Top Area */}
                                    <div className="flex justify-between items-start">
                                        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 md:py-2 md:px-4 rounded-full flex items-center gap-2 shadow-lg">
                                            <Image
                                                src={offer.agentLogo}
                                                alt={offer.agentName}
                                                width={24}
                                                height={24}
                                                className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
                                                unoptimized
                                            />
                                            <span className="text-xs md:text-sm font-bold text-gray-800">
                                                {offer.agentName}
                                            </span>
                                        </div>
                                        <div className="bg-red-500 shadow-lg shadow-red-500/30 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
                                            {offer.discount}
                                        </div>
                                    </div>

                                    {/* Bottom Area */}
                                    <div className="flex justify-between items-end gap-3 flex-wrap sm:flex-nowrap">
                                        <div className="mb-1 w-full sm:w-auto flex-1">
                                            <h3 className="text-2xl md:text-[28px] font-bold text-white leading-tight mb-1.5 drop-shadow-md">
                                                {offer.title}
                                            </h3>
                                            <p className="text-base md:text-lg font-semibold text-white drop-shadow-md">
                                                {offer.price}
                                            </p>
                                        </div>
                                        <button className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-[100px] px-6 py-2.5 text-sm font-bold whitespace-nowrap mb-1">
                                            Batafsil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
