"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import type { Destination } from "./_hooks"
import { useDestinationsQuery } from "./_hooks"
import { useDestinations } from "./_hooks/use-destinations"
import { CityCard } from "./city-card"
import { INITIAL_VISIBLE_COUNT } from "./constants"
import { LoadMoreButton } from "./load-more"

interface DestinationsPayload {
    featured: Destination | null | undefined
    popular: Destination[] | null | undefined
}

interface DestinationsData {
    featured: Destination | null
    popular: Destination[]
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
}

const headerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

function SkeletonCard() {
    return (
        <div className="rounded-2xl bg-slate-200 animate-pulse w-full h-full" />
    )
}

interface DestinationsSectionProps {
    data: DestinationsData
    isLoading?: boolean
}

function DestinationsSection({
    data,
    isLoading = false,
}: DestinationsSectionProps) {
    const { visibleDestinations, totalCount, visibleCount, showAll, showLess } =
        useDestinations(data)

    const isExpanded = visibleCount > INITIAL_VISIBLE_COUNT
    const remaining = totalCount - visibleCount

    const handleToggle = () => {
        if (isExpanded) {
            showLess()
        } else {
            showAll()
        }
    }

    return (
        <section
            className="w-full bg-[#F8FAFC] py-16 md:py-24 overflow-hidden"
            aria-labelledby="destinations-heading"
        >
            <div className="w-full home-container">
                <div className="mb-12 w-full">
                    <motion.h2
                        id="destinations-heading"
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl md:text-[40px] font-bold text-slate-900 text-center leading-[1.05] tracking-tight"
                    >
                        Unutilmas shaharlar
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
                >
                    {isLoading ?
                        Array.from({ length: INITIAL_VISIBLE_COUNT }).map(
                            (_, i) => (
                                <div
                                    key={`skeleton-${i}`}
                                    className="relative h-[200px] md:h-[240px]"
                                >
                                    <SkeletonCard />
                                </div>
                            ),
                        )
                    :   visibleDestinations.map((destination) => (
                            <div
                                key={destination.id}
                                className="relative h-[200px] md:h-[240px]"
                            >
                                <CityCard destination={destination} />
                            </div>
                        ))
                    }
                </motion.div>

                {!isLoading && visibleDestinations.length === 0 && (
                    <p className="text-center text-slate-400 py-16">
                        Manzillar topilmadi
                    </p>
                )}

                {!isLoading && totalCount > INITIAL_VISIBLE_COUNT && (
                    <LoadMoreButton
                        onToggle={handleToggle}
                        isExpanded={isExpanded}
                        remaining={remaining}
                    />
                )}
            </div>
        </section>
    )
}

export function UnforgettableCities() {
    const queryResult = useDestinationsQuery()

    const isLoading =
        (queryResult as any).isLoading ||
        (queryResult as any).isPending ||
        (queryResult as any).isValidating ||
        false

    const raw = queryResult as any
    const payload: DestinationsPayload =
        raw.data?.featured !== undefined || raw.data?.popular !== undefined ?
            raw.data
        :   raw

    const data: DestinationsData = useMemo(
        () => ({
            featured: payload.featured ?? null,
            popular: Array.isArray(payload.popular) ? payload.popular : [],
        }),
        [payload.featured, payload.popular],
    )

    return <DestinationsSection data={data} isLoading={isLoading} />
}
