"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React from "react"

export type SortKey =
    | "POPULARITY"
    | "MOST_REVIEWED"
    | "PRICE_ASC"
    | "PRICE_DESC"
    | "RATING_DESC"
    | "NEWEST"

interface SortOption {
    key: SortKey
    label: string
}

const SORT_QUERY_KEY = "sortBy"

const SORT_OPTIONS: SortOption[] = [
    { key: "POPULARITY", label: "Mashhurlar" },
    { key: "MOST_REVIEWED", label: "Otzivlar soni bo'yicha" },
    { key: "PRICE_ASC", label: "Arzon avval" },
    { key: "PRICE_DESC", label: "Qimmat avval" },
    { key: "RATING_DESC", label: "Yuqori reyting" },
    { key: "NEWEST", label: "Yangilar" },
]

const VALID_SORT_KEYS = new Set(SORT_OPTIONS.map((o) => o.key))

const DEFAULT_LABEL = "Saralash"

export const SortDropdown = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    const rawParam = searchParams.get(SORT_QUERY_KEY)
    const value: SortKey | null =
        rawParam && VALID_SORT_KEYS.has(rawParam as SortKey) ?
            (rawParam as SortKey)
        :   null

    const current = SORT_OPTIONS.find((o) => o.key === value) ?? null

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    function handleChange(key: SortKey) {
        const existingParams = Object.fromEntries(searchParams.entries())
        if (pathname === "/favourites") {
            router.push(
                getHref({
                    pathname: "/[locale]/favourites",
                    query: { ...existingParams, [SORT_QUERY_KEY]: key },
                }),
                { scroll: false },
            )
        } else {
            router.push(
                getHref({
                    pathname: "/[locale]/catalog",
                    query: { ...existingParams, [SORT_QUERY_KEY]: key },
                }),
                { scroll: false },
            )
        }
        setOpen(false)
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((p) => !p)}
                className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl",
                    "text-[13px] font-medium",
                    "border transition-all duration-150 focus-visible:outline-none",
                    "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
                    current ?
                        "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                    :   "bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
                )}
            >
                <span
                    className={cn(
                        "text-[12px] font-normal",
                        current ? "text-blue-400" : "text-zinc-400",
                    )}
                >
                    {DEFAULT_LABEL}:
                </span>

                <span className="text-primary">{current?.label}</span>

                <ChevronDown
                    className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        current ? "text-blue-400" : "text-zinc-400",
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
                                onClick={() => handleChange(opt.key)}
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
