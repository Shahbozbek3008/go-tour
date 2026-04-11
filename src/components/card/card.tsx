import { cn } from "@/lib/utils/shadcn"
import { motion } from "framer-motion"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

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
    hasLike?: boolean
}

export const Card = ({
    tour,
    wrapperClassName,
    hasLike = true,
}: {
    tour: Tour
    wrapperClassName?: string
    hasLike?: boolean
}) => {
    const [liked, setLiked] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
                "group bg-white rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300 flex-shrink-0 w-full",
                wrapperClassName,
            )}
        >
            <div className="relative overflow-hidden h-[200px]">
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <span className="bg-blue-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {tour.badge}
                    </span>
                </div>

                {hasLike && (
                    <button
                        onClick={() => setLiked((p) => !p)}
                        className="absolute top-3 right-3 z-20 w-8 h-8  bg-transparent flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
                    >
                        <Heart
                            size={28}
                            className={
                                liked ?
                                    "fill-red-500 stroke-red-500"
                                :   "stroke-white"
                            }
                        />
                    </button>
                )}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                            src={tour.authorAvatar}
                            alt={tour.author}
                            fill
                            className="object-cover"
                            sizes="28px"
                        />
                    </div>
                    <span className="text-white text-[12px] font-medium drop-shadow-sm">
                        {tour.author}
                    </span>
                </div>

                {tour.discount && (
                    <div className="absolute bottom-3 right-3 z-20 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full">
                        -{tour.discount}%
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

                <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-1.5 mb-2">
                    <Star
                        size={13}
                        className="fill-amber-400 stroke-amber-400"
                    />
                    <span className="text-[12px] font-semibold text-slate-700">
                        {tour.rating.toFixed(1)}
                    </span>
                    <span className="text-[12px] text-slate-400">
                        ({tour.reviews} ta sharh)
                    </span>
                    <span className="text-slate-300 mx-1">·</span>
                    <span className="text-[12px] text-slate-400">
                        {tour.location}
                    </span>
                </div>

                <h3 className="text-[15px] font-bold text-slate-800 leading-snug mb-1 line-clamp-2">
                    {tour.title}
                </h3>

                <p className="text-[12px] text-slate-400 mb-3 line-clamp-2">
                    {tour.subtitle}
                </p>

                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-[18px] font-bold text-slate-800">
                                ${tour.price.toLocaleString()}
                            </span>
                            {tour.originalPrice &&
                                tour.originalPrice !== tour.price && (
                                    <span className="text-[13px] text-slate-400 line-through">
                                        ${tour.originalPrice.toLocaleString()}
                                    </span>
                                )}
                        </div>
                        <span className="text-[11px] text-slate-400">
                            {tour.days} kun
                        </span>
                    </div>
                    <span className="text-[12px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                        {tour.dates}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
