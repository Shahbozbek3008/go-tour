"use client"

import { INCLUSIONS } from "@/app/[locale]/(main)/tour/[slug]/_constants/mockdata"
import { IconCheck } from "@/assets/icons/check"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export const InclusionList = () => {
    const [showAll, setShowAll] = useState(false)

    const toggleAll = () => {
        setShowAll((prev) => !prev)
    }

    const visibleItems = INCLUSIONS.slice(0, 6)
    const hiddenItems = INCLUSIONS.slice(6)

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">Included</p>
            <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-4">
                    {visibleItems.map((inclusion) => (
                        <li
                            key={inclusion.id}
                            className="flex items-center gap-2.5 text-sm"
                        >
                            <IconCheck />
                            {inclusion.label}
                        </li>
                    ))}
                </ul>
                <AnimatePresence initial={false}>
                    {showAll && (
                        <motion.ul
                            key="extra-inclusions"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col gap-4 overflow-hidden"
                        >
                            {hiddenItems.map((inclusion) => (
                                <li
                                    key={inclusion.id}
                                    className="flex items-center gap-2.5 text-sm"
                                >
                                    <IconCheck />
                                    {inclusion.label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
                {INCLUSIONS.length > 6 && (
                    <Button
                        size="sm"
                        variant="link"
                        onClick={toggleAll}
                        className="w-fit text-[13px] p-0!"
                    >
                        {showAll ? "Show less" : "Show all"}
                        <ChevronDown
                            className={`size-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
                        />
                    </Button>
                )}
            </div>
        </div>
    )
}
