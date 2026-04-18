import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import React from "react"

export type SortKey =
    | "popular"
    | "price_asc"
    | "price_desc"
    | "rating"
    | "newest"

interface SortOption {
    key: SortKey
    label: string
}

interface SortDropdownProps {
    value: SortKey
    onChange: (key: SortKey) => void
}

const SORT_OPTIONS: SortOption[] = [
    { key: "popular", label: "Mashhurlar" },
    { key: "price_asc", label: "Arzon avval" },
    { key: "price_desc", label: "Qimmat avval" },
    { key: "rating", label: "Yuqori reyting" },
    { key: "newest", label: "Yangilar" },
]

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    const current = SORT_OPTIONS.find((o) => o.key === value)!

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((p) => !p)}
                className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl",
                    "text-[13px] font-medium text-zinc-700",
                    "bg-white border border-zinc-200/80",
                    "hover:border-zinc-300 hover:bg-zinc-50",
                    "transition-all duration-150 focus-visible:outline-none",
                    "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
                )}
            >
                <span className="text-zinc-400 text-[12px] font-normal">
                    Saralash:
                </span>
                <span>{current.label}</span>
                <ChevronDown
                    className={cn(
                        "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute right-0 top-full mt-2 z-50",
                            "w-48 rounded-xl bg-white",
                            "border border-zinc-200/80",
                            "shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]",
                            "overflow-hidden",
                        )}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => {
                                    onChange(opt.key)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "flex items-center justify-between w-full px-4 py-2.5",
                                    "text-[13px] transition-colors duration-100",
                                    "focus-visible:outline-none",
                                    opt.key === value ?
                                        "text-zinc-900 font-medium bg-zinc-50"
                                    :   "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800",
                                )}
                            >
                                {opt.label}
                                {opt.key === value && (
                                    <Check className="h-3.5 w-3.5 text-zinc-900" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
