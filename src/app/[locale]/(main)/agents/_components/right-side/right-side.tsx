"use client"

import { ProductCard } from "@/components/card"
import { SortDropdown } from "@/components/common/sort-dropdown"
import { Badge } from "@/components/ui/badge"
import { MOCK_TOURS } from "@/lib/constants/mockdata"
import { motion } from "framer-motion"

export const AgentsRightSide = () => {
    return (
        <div className="flex flex-col gap-6 min-w-0 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-semibold">Tanlangan:</h5>
                    <Badge
                        variant="destructive"
                        className="px-2 py-1 font-medium bg-white text-black text-xs"
                    >
                        Asia Travel Group
                    </Badge>
                </div>
                <SortDropdown />
            </div>
            <motion.div
                layout
                className="grid gap-5"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                }}
            >
                {MOCK_TOURS.map((tour, i) => (
                    <motion.div
                        key={tour.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: i * 0.04,
                        }}
                    >
                        <ProductCard tour={tour} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
