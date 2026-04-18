"use client"

import { cn } from "@/lib/utils/shadcn"
import { motion, Variants } from "framer-motion"
import Image from "next/image"

type Category = {
    id: string
    label: string
    image: string
    featured?: boolean
}

const categories: Category[] = [
    {
        id: "beach",
        label: "Beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    },
    {
        id: "adventure",
        label: "Adventure",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    },
    {
        id: "city",
        label: "City",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
        featured: true,
    },
    {
        id: "nature",
        label: "Nature",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    },
    {
        id: "hiking",
        label: "Hiking",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
        id: "ski",
        label: "Ski",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
}

function CategoryCard({
    category,
    className = "",
    gridClass,
}: {
    category: Category
    className?: string
    gridClass?: string
}) {
    return (
        <motion.div
            variants={cardVariants}
            className={cn(
                "group relative overflow-hidden rounded-xl cursor-pointer w-full h-full min-h-[160px] md:min-h-0 ",
                gridClass,
                className,
            )}
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
}

export const Categories = () => {
    return (
        <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
            <div className="w-full home-container">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-[40px] font-bold tracking-tight text-slate-900">
                        Kategoriyalar
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_2fr_1fr_1fr] lg:grid-rows-2 gap-3 w-full h-auto lg:h-[360px]"
                >
                    {categories.map((cat) => {
                        const gridClass =
                            cat.id === "beach" ? "lg:col-start-1 lg:row-start-1"
                            : cat.id === "city" ?
                                "col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2"
                            : cat.id === "nature" ?
                                "md:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-1"
                            : cat.id === "adventure" ?
                                "lg:col-start-1 lg:row-start-2"
                            : cat.id === "hiking" ?
                                "lg:col-start-3 lg:row-start-2"
                            : cat.id === "ski" ? "lg:col-start-4 lg:row-start-2"
                            : ""

                        return (
                            <CategoryCard
                                key={cat.id}
                                category={cat}
                                gridClass={gridClass}
                            />
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
