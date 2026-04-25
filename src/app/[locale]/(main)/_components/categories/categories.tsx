"use client"

import { cn } from "@/lib/utils/shadcn"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useAllCategoriesQuery } from "./_hooks"
import { CategoriesSkeleton } from "./categories-skeleton"
import { CATEGORIES_DEFAULT_VISIBLE_COUNT } from "./categories.constants"
import { getCategoryGridClass, normalizeCategory } from "./categories.utils"
import { CategoryCard } from "./category-card"

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

export const Categories = () => {
    const { allCategories, isLoading } = useAllCategoriesQuery()
    const [showAll, setShowAll] = useState(false)

    const normalized = useMemo(() => {
        return (allCategories ?? [])
            .slice()
            .sort((a, b) => a.order - b.order)
            .map(normalizeCategory)
    }, [allCategories])

    const visible = useMemo(() => {
        return showAll ? normalized : (
                normalized.slice(0, CATEGORIES_DEFAULT_VISIBLE_COUNT)
            )
    }, [normalized, showAll])

    const hasMore = normalized.length > CATEGORIES_DEFAULT_VISIBLE_COUNT

    return (
        <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
            <div className="w-full home-container">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-[40px] font-bold tracking-tight text-slate-900">
                        Kategoriyalar
                    </h2>
                </motion.div>

                {isLoading ?
                    <CategoriesSkeleton />
                :   <>
                        <motion.div
                            key={showAll ? "all" : "default"}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={cn(
                                "grid grid-cols-2 md:grid-cols-3 gap-3 w-full h-auto",
                                showAll ?
                                    "lg:grid-cols-4 lg:h-auto"
                                :   "lg:grid-cols-[1fr_2fr_1fr_1fr] lg:grid-rows-2 lg:h-[360px]",
                            )}
                        >
                            {visible.map((cat) => (
                                <CategoryCard
                                    key={cat.id}
                                    category={cat}
                                    gridClass={
                                        !showAll ?
                                            getCategoryGridClass(cat.id)
                                        :   ""
                                    }
                                />
                            ))}
                        </motion.div>

                        {/* {hasMore && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="flex justify-center mt-8"
                            >
                                <Button
                                    size="lg"
                                    className="rounded-2xl"
                                    onClick={() => setShowAll((prev) => !prev)}
                                >
                                    {showAll ?
                                        <ClientTranslate translationKey="showLess" />
                                    :   <ClientTranslate translationKey="exploreAll" />
                                    }
                                </Button>
                            </motion.div>
                        )} */}
                    </>
                }
            </div>
        </section>
    )
}
