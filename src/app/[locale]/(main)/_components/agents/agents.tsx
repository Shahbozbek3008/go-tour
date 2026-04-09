"use client"

import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

type Agent = {
    id: number
    name: string
    location: string
    logo: string
    color: string
}

const agents: Agent[] = [
    {
        id: 1,
        name: "Samarkand Tours",
        location: "Samarkand, Registon",
        logo: "https://ui-avatars.com/api/?name=ST&background=C9873A&color=fff&size=80&bold=true&font-size=0.4",
        color: "#C9873A",
    },
    {
        id: 2,
        name: "Golden Bukhara",
        location: "Buxoro Markazi",
        logo: "https://ui-avatars.com/api/?name=GB&background=2D6A4F&color=fff&size=80&bold=true&font-size=0.4",
        color: "#2D6A4F",
    },
    {
        id: 3,
        name: "Asia Travel Group",
        location: "Toshkent, Yunusobod",
        logo: "https://ui-avatars.com/api/?name=AT&background=1B4F8A&color=fff&size=80&bold=true&font-size=0.4",
        color: "#1B4F8A",
    },
    {
        id: 4,
        name: "Silk Road Travels",
        location: "Namangan",
        logo: "https://ui-avatars.com/api/?name=SR&background=7B2D8B&color=fff&size=80&bold=true&font-size=0.4",
        color: "#7B2D8B",
    },
    {
        id: 5,
        name: "Fergana Valley Tours",
        location: "Farg'ona",
        logo: "https://ui-avatars.com/api/?name=FV&background=1A6B3C&color=fff&size=80&bold=true&font-size=0.4",
        color: "#1A6B3C",
    },
    {
        id: 6,
        name: "Khiva Heritage",
        location: "Xiva",
        logo: "https://ui-avatars.com/api/?name=KH&background=B5451B&color=fff&size=80&bold=true&font-size=0.4",
        color: "#B5451B",
    },
    {
        id: 7,
        name: "Tashkent Express",
        location: "Toshkent, Chilonzor",
        logo: "https://ui-avatars.com/api/?name=TE&background=0F1B2D&color=fff&size=80&bold=true&font-size=0.4",
        color: "#0F1B2D",
    },
    {
        id: 8,
        name: "Aral Sea Tours",
        location: "Nukus",
        logo: "https://ui-avatars.com/api/?name=AS&background=006D8F&color=fff&size=80&bold=true&font-size=0.4",
        color: "#006D8F",
    },
]

export const Agents = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", slidesToScroll: 1 },
        [Autoplay({ delay: 3000, stopOnInteraction: false })],
    )

    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-15">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <h2 className="w-full text-3xl md:text-[40px] tracking-tight font-bold text-slate-900 text-center">
                        Agentlar
                    </h2>
                </div>

                <div className="overflow-hidden py-4 -my-4" ref={emblaRef}>
                    <div className="flex touch-pan-y -ml-4 sm:-ml-6">
                        {agents.map((agent, i) => (
                            <div
                                key={`${agent.id}-${i}`}
                                className="min-w-0 pl-4 sm:pl-6 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                            >
                                <AgentChip agent={agent} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-10">
                    {agents.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === selectedIndex ?
                                    "w-8 h-1.5 bg-[#0F1B2D]"
                                :   "w-2 h-1.5 bg-gray-200 hover:bg-gray-300"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

const AgentChip = ({ agent }: { agent: Agent }) => (
    <div className="group flex items-center gap-4 rounded-2xl p-4 border border-gray-100 bg-white hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative overflow-hidden select-none">
        <div
            className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-0 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none"
            style={{ backgroundColor: agent.color }}
        />
        <div className="relative z-10 flex items-center gap-4 w-full">
            <div
                className="w-14 h-14 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-sm border border-black/5"
                style={{ backgroundColor: `${agent.color}15` }}
            >
                <Image
                    src={agent.logo}
                    alt={agent.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover"
                    draggable={false}
                    unoptimized
                />
            </div>
            <div className="min-w-0 flex-1">
                <h3
                    className="text-base font-bold text-gray-900 truncate transition-colors duration-300"
                    style={
                        { "--hover-color": agent.color } as React.CSSProperties
                    }
                >
                    <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300">
                        {agent.name}
                    </span>
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-500 font-medium truncate">
                        {agent.location}
                    </span>
                </div>
            </div>
        </div>
    </div>
)
