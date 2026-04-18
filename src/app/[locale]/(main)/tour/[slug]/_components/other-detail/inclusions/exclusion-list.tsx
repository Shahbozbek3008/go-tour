"use client"

import { IconClose } from "@/assets/icons/close"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { EXCLUSIONS } from "../../../_constants/mockdata"

export const ExclusionList = () => {
    const [showAll, setShowAll] = useState(false)

    const toggleAll = () => {
        setShowAll((prev) => !prev)
    }

    const visibleItems = EXCLUSIONS.slice(0, 6)
    const hiddenItems = EXCLUSIONS.slice(6)

    return (
        <div className="flex flex-col gap-4 mt-4">
            <p className="text-sm font-semibold text-foreground">
                Not included
            </p>
            <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-4">
                    {visibleItems.map((exclusion) => (
                        <li
                            key={exclusion.id}
                            className="flex items-center gap-2.5 text-sm"
                        >
                            <IconClose stroke="red" />
                            {exclusion.label}
                        </li>
                    ))}
                </ul>
                <AnimatePresence initial={false}>
                    {showAll && (
                        <motion.ul
                            key="extra-exclusions"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col gap-4 overflow-hidden"
                        >
                            {hiddenItems.map((exclusion) => (
                                <li
                                    key={exclusion.id}
                                    className="flex items-center gap-2.5 text-sm"
                                >
                                    <IconClose stroke="red" />
                                    {exclusion.label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
                {EXCLUSIONS.length > 6 && (
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
