"use client"

import { motion } from "framer-motion"
import { ChevronDown, LayoutGrid } from "lucide-react"
import { memo } from "react"

interface LoadMoreButtonProps {
    onToggle: () => void
    isExpanded: boolean
    remaining: number
    isLoading?: boolean
}

export const LoadMoreButton = memo(function LoadMoreButton({
    onToggle,
    isExpanded,
    remaining,
    isLoading = false,
}: LoadMoreButtonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center mt-10"
        >
            <button
                onClick={onToggle}
                disabled={isLoading}
                aria-label={isExpanded ? "Yopish" : "Barcha manzillarni ko'rsatish"}
                className="
                    inline-flex items-center gap-2
                    bg-slate-900 hover:bg-slate-800 active:scale-95
                    text-white text-[13px] font-semibold uppercase tracking-wider
                    px-8 py-3.5 rounded-full
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-slate-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
                "
            >
                {isExpanded ?
                    <>
                        <ChevronDown
                            size={15}
                            className="rotate-180 transition-transform duration-300"
                        />
                        Yopish
                    </>
                :   <>
                        <LayoutGrid size={15} />
                        Barchasini yuklash
                        <span className="text-slate-400 text-[11px] ml-1">
                            ({remaining})
                        </span>
                    </>
                }
            </button>
        </motion.div>
    )
})
