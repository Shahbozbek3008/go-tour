"use client"

import { IconClose } from "@/assets/icons/close"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { LocalizedItem } from "../../../_types"

interface ExclusionListProps {
    items: LocalizedItem[]
}

export const ExclusionList = ({ items }: ExclusionListProps) => {
    const { isRussian } = useLanguage()
    const [showAll, setShowAll] = useState(false)

    const toggleAll = () => {
        setShowAll((prev) => !prev)
    }

    const visibleItems = items.slice(0, 6)
    const hiddenItems = items.slice(6)

    return (
        <div className="flex flex-col gap-4 mt-4">
            <p className="text-sm font-semibold text-foreground">
                {isRussian ? "Не включено" : "Kiritilmagan"}
            </p>
            <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-4">
                    {visibleItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2.5 text-sm"
                        >
                            <IconClose stroke="red" />
                            {isRussian ? item?.ru : item?.uz}
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
                            {hiddenItems.map((item, index) => (
                                <li
                                    key={index + 6}
                                    className="flex items-center gap-2.5 text-sm"
                                >
                                    <IconClose stroke="red" />
                                    {isRussian ? item?.ru : item?.uz}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
                {items.length > 6 && (
                    <Button
                        size="sm"
                        variant="link"
                        onClick={toggleAll}
                        className="w-fit text-[13px] p-0!"
                    >
                        {showAll ?
                            isRussian ?
                                "Скрыть"
                            :   "Kamroq ko'rish"
                        : isRussian ?
                            "Показать все"
                        :   "Barchasini ko'rish"}
                        <ChevronDown
                            className={`size-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
                        />
                    </Button>
                )}
            </div>
        </div>
    )
}
