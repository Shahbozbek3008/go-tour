"use client"

import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { motion, Variants } from "framer-motion"
import Image from "next/image"
import { memo } from "react"
import { NormalizedCategory } from "./categories.types"

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
}

type Props = {
    category: NormalizedCategory
    gridClass?: string
    className?: string
}

export const CategoryCard = memo(
    ({ category, gridClass, className = "" }: Props) => {
        const router = useRouter()

        return (
            <motion.div
                variants={cardVariants}
                className={cn(
                    "group relative overflow-hidden rounded-xl cursor-pointer w-full h-full min-h-[180px]",
                    gridClass,
                    className,
                )}
                onClick={() => {
                    router.push(
                        getHref({
                            pathname: "/[locale]/catalog",
                            query: {
                                category: String(
                                    category?.id,
                                )?.toLocaleUpperCase(),
                            },
                        }),
                    )
                }}
            >
                <div className="absolute inset-0 z-10 bg-[#0f172a]/30 group-hover:bg-[#0f172a]/50 transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none" />

                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Image
                        src={category.image}
                        alt={category.label}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>

                <div className="absolute bottom-0 left-0 z-20 p-4">
                    <motion.span
                        className="text-white text-[13px] font-medium tracking-wide drop-shadow-sm"
                        initial={{ opacity: 0.9, y: 2 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {category.label}
                    </motion.span>
                </div>
            </motion.div>
        )
    },
)

CategoryCard.displayName = "CategoryCard"
