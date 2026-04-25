"use client"

import { cn } from "@/lib/utils/shadcn"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import { memo } from "react"
import { Destination } from "./_hooks"

export const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

const RegionBadge = memo(function RegionBadge({
    region,
    country,
}: {
    region: string
    country: string
}) {
    return (
        <div className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 border border-amber-400/25 rounded-full px-2 py-1 md:px-3 md:py-1 mb-2 md:mb-3">
            {region} · {country}
        </div>
    )
})

const RatingRow = memo(function RatingRow({
    rating,
    toursCount,
}: {
    rating: number
    toursCount: number
}) {
    return (
        <div className="flex items-center gap-3 mb-0">
            <div className="flex items-center gap-1 text-amber-400 text-[13px] font-medium">
                <Star size={12} fill="currentColor" aria-hidden />
                {rating > 0 ? rating.toFixed(1) : "Yangi"}
            </div>
            <span className="text-white/45 text-[13px]">
                {toursCount}+ turlar
            </span>
        </div>
    )
})

interface CityCardProps {
    destination: Destination
}

export const CityCard = memo(function CityCard({ destination }: CityCardProps) {
    const {
        name,
        country,
        region = "",
        image,
        rating,
        toursCount,
        description,
        featured,
    } = destination
    const imageSizes =
        featured ?
            "(max-width: 768px) 100vw, 50vw"
        :   "(max-width: 768px) 100vw, 25vw"

    return (
        <motion.article
            variants={cardVariants}
            className={[
                "group absolute inset-0 overflow-hidden rounded-2xl cursor-pointer",
                featured ? "row-span-2" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            role="article"
            aria-label={`${name}, ${country}`}
        >
            {featured && (
                <div
                    className="absolute top-4 left-4 z-30 bg-amber-400 text-[#0a0f1e] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    aria-label="Tanlangan"
                >
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
                        src={image!}
                        alt={`${name} shahri`}
                        fill
                        className="object-cover"
                        sizes={imageSizes}
                        loading={featured ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjI4MzYiLz48L3N2Zz4="
                    />
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-350">
                <RegionBadge region={region} country={country} />

                <h3
                    className={cn(
                        "font-bold text-white leading-tight md:mb-2",
                        "text-xl md:text-2xl",
                    )}
                >
                    {name}
                </h3>

                <RatingRow rating={rating} toursCount={toursCount} />

                {description && (
                    <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-400 ease-in-out mt-2">
                        <p className="text-white/55 text-[13px] leading-relaxed line-clamp-3">
                            {description}
                        </p>
                    </div>
                )}

                <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 transition-all duration-400 delay-75 ease-in-out mt-3">
                    <span className="inline-flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold uppercase tracking-wider">
                        Kashf etish
                        <ArrowRight
                            size={13}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                            aria-hidden
                        />
                    </span>
                </div>
            </div>
        </motion.article>
    )
})
