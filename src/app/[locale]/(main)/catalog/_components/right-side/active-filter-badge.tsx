import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

interface ActiveFilterBadgeProps {
    activeFiltersCount: number
    resetFilters: () => void
}

export const ActiveFilterBadge = ({
    activeFiltersCount,
    resetFilters,
}: ActiveFilterBadgeProps) => {
    const t = useTranslations()

    return (
        <AnimatePresence>
            {activeFiltersCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                >
                    <div className="flex items-center">
                        <button
                            onClick={resetFilters}
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full",
                                "px-3.5 py-1.5 bg-primary hover:bg-primary/80",
                                "text-[13px] font-bold text-white",
                                "transition-all duration-200 select-none shadow-sm",
                            )}
                        >
                            <span>
                                <ClientTranslate translationKey="resetAllFilters" />{" "}
                                ({activeFiltersCount})
                            </span>
                            <div className="bg-white rounded-full p-0.5">
                                <X
                                    className="w-3.5 h-3.5 text-primary"
                                    strokeWidth={3}
                                />
                            </div>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
