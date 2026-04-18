// components/sections/UnforgettableCities.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"

type City = {
    id: number
    name: string
    country: string
    region: string
    tours: string
    rating: number
    image: string
    description: string
    featured?: boolean
}

const cities: City[] = [
    {
        id: 1,
        name: "Parij",
        country: "Fransiya",
        region: "Evropa",
        tours: "100+",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80",
        description:
            "Sevgi shahri — Eyfel minorasi, Luvr muzeyi va frantsuz oshxonasining bebaho ta'mi.",
        featured: true,
    },
    {
        id: 2,
        name: "Tokio",
        country: "Yaponiya",
        region: "Osiyo",
        tours: "700+",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
        description:
            "Kelajak va an'ananing uyg'unligi — neon chiroqlar va qadimiy ibodatxonalar.",
    },
    {
        id: 3,
        name: "Dubai",
        country: "BAA",
        region: "Yaqin Sharq",
        tours: "500+",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
        description:
            "Cho'l qo'ynidagi oltin shahar — hashamat va innovatsiyaning markazi.",
    },
    {
        id: 4,
        name: "Bali",
        country: "Indoneziya",
        region: "Osiyo",
        tours: "600+",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
        description:
            "Jannat oroli — guruch dalalar, ibodatxonalar va moviy okean.",
    },
    {
        id: 5,
        name: "Santorini",
        country: "Gretsiya",
        region: "Evropa",
        tours: "300+",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
        description:
            "Oq uylar va ko'k gumbazlar — Egey dengizining eng go'zal shahri.",
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
    },
}

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
}

function CityCard({ city }: { city: City }) {
    return (
        <motion.div
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                city.featured ? "row-span-2" : ""
            }`}
            transition={{ duration: 0.3 }}
        >
            {city.featured && (
                <div className="absolute top-4 left-4 z-30 bg-amber-400 text-[#0a0f1e] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    ✦ Tanlangan
                </div>
            )}

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/5 transition-all duration-400 group-hover:from-black/90 group-hover:via-black/40" />

            <div className="relative w-full h-full overflow-hidden">
                <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Image
                        src={city.image}
                        alt={city.name}
                        fill
                        className="object-cover"
                        sizes={
                            city.featured ?
                                "(max-width: 768px) 100vw, 50vw"
                            :   "(max-width: 768px) 100vw, 25vw"
                        }
                    />
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-350">
                <div className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 border border-amber-400/25 rounded-full px-2 py-1 md:px-3 md:py-1 mb-2 md:mb-3">
                    {city.region} · {city.country}
                </div>

                <h3
                    className={`font-bold text-white leading-tight md:mb-2 ${
                        city.featured ?
                            "text-2xl md:text-4xl"
                        :   "text-xl md:text-2xl"
                    }`}
                >
                    {city.name}
                </h3>

                <div className="flex items-center gap-3 mb-0">
                    <div className="flex items-center gap-1 text-amber-400 text-[13px] font-medium">
                        <Star size={12} fill="currentColor" />
                        {city.rating.toFixed(1)}
                    </div>
                    <span className="text-white/45 text-[13px]">
                        {city.tours} turlar
                    </span>
                </div>

                <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-400 ease-in-out mt-2">
                    <p className="text-white/55 text-[13px] leading-relaxed">
                        {city.description}
                    </p>
                </div>

                <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 transition-all duration-400 delay-75 ease-in-out mt-3">
                    <span className="inline-flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold uppercase tracking-wider">
                        Kashf etish
                        <ArrowRight
                            size={13}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export function UnforgettableCities() {
    return (
        <section className="w-full bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">
            <div className="w-full home-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 w-full">
                    <motion.h2
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl md:text-[40px] font-bold text-slate-900 text-center leading-[1.05] tracking-tight w-full"
                    >
                        Unutilmas shaharlar
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] grid-rows-auto md:grid-rows-[340px_240px] gap-4"
                    style={{ gridAutoRows: "200px" }}
                >
                    {cities.map((city) => (
                        <CityCard key={city.id} city={city} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
