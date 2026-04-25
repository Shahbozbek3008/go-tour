import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface ActiveFilterBadgeProps {
    activeFilterBadges: { key: string; label: string }[]
    removeFilterBadge: (key: string) => void
}

export const ActiveFilterBadge = ({
    activeFilterBadges,
    removeFilterBadge,
}: ActiveFilterBadgeProps) => {
    return (
        <AnimatePresence>
            {activeFilterBadges.length > 0 ?
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-semibold text-zinc-700 shrink-0">
                            Faol filtrlar:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <AnimatePresence mode="popLayout">
                                {activeFilterBadges.map((badge) => (
                                    <motion.button
                                        key={badge.key}
                                        layout
                                        initial={{
                                            opacity: 0,
                                            scale: 0.85,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.85,
                                        }}
                                        transition={{ duration: 0.15 }}
                                        onClick={() =>
                                            removeFilterBadge(badge.key)
                                        }
                                        className={cn(
                                            "inline-flex items-center gap-1.5 rounded-full",
                                            "px-3 py-1 bg-zinc-100 hover:bg-zinc-200",
                                            "text-[12px] font-medium text-zinc-600",
                                            "transition-colors duration-150 select-none",
                                        )}
                                    >
                                        <span>{badge.label}</span>
                                        <X
                                            className="w-3 h-3 text-zinc-400"
                                            strokeWidth={2.5}
                                        />
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            :   <div />}
        </AnimatePresence>
    )
}
