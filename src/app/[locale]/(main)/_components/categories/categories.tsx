"use client"

import { cn } from "@/lib/utils/shadcn"
import { motion } from "framer-motion"
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

const cardVariants = {
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
    style,
}: {
    category: Category
    className?: string
    style?: React.CSSProperties
}) {
    return (
        <motion.div
            variants={cardVariants as any}
            style={style}
            className={cn(
                "group relative overflow-hidden rounded-xl cursor-pointer",
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
        <section className="w-full bg-transparent pb-15 px-15">
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center mb-6"
            >
                <h2 className="text-5xl my-10 font-medium tracking-tight text-[#222757]">
                    Kategoriyalar
                </h2>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-3 w-full h-[360px]"
                style={{
                    gridTemplateColumns: "1fr 2fr 1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    gridTemplateAreas: `
                        "beach city nature nature"
                        "adventure city hiking ski"
                    `,
                }}
            >
                {categories.map((cat) => (
                    <CategoryCard
                        key={cat.id}
                        category={cat}
                        style={{ gridArea: cat.id }}
                    />
                ))}
            </motion.div>
        </section>
    )
}
