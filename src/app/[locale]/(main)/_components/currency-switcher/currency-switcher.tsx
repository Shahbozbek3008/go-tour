import { CURRENCIES } from "@/lib/constants/currency"
import { getStoredCurrency, setStoredCurrency } from "@/lib/cookies/currency"
import { cn } from "@/lib/utils/shadcn"
import { Currency } from "@/types/common/extra"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface CurrencySwitcherProps {
    isTransparent?: boolean
}

export const CurrencySwitcher = ({ isTransparent }: CurrencySwitcherProps) => {
    const [open, setOpen] = useState(false)
    const [activeCurrency, setActiveCurrency] = useState<Currency>(
        CURRENCIES[0].id,
    )
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setActiveCurrency(getStoredCurrency())
    }, [])

    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleOutside)
        return () => document.removeEventListener("mousedown", handleOutside)
    }, [])

    const handleSelect = (id: Currency) => {
        setStoredCurrency(id)
        setActiveCurrency(id)
        setOpen(false)
    }

    const active =
        CURRENCIES.find((c) => c.id === activeCurrency) ?? CURRENCIES[0]
    const others = CURRENCIES.filter((c) => c.id !== activeCurrency)

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((p) => !p)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={cn(
                    "flex items-center gap-1.5 px-2.5 rounded-[10px]  h-10",
                    "text-[13px] font-medium transition-colors duration-150",
                    "focus-visible:outline-none",
                    isTransparent ?
                        "text-white/80 hover:text-white"
                    :   "text-slate-800",
                    open && (isTransparent ? " text-white" : " text-slate-800"),
                )}
            >
                {/* <span className="text-[14px] font-medium opacity-60">
                    {active.symbol}
                </span> */}
                <span>{active.iso}</span>
                <ChevronDown
                    className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    className={cn(
                        "absolute right-0 top-[calc(100%+6px)] z-50",
                        "rounded-xl overflow-hidden",
                        "bg-white border border-zinc-200/80",
                        "shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]",
                    )}
                >
                    {CURRENCIES.map((currency) => (
                        <button
                            key={currency.id}
                            role="option"
                            aria-selected={false}
                            onClick={() => handleSelect(currency.id)}
                            className={cn(
                                "w-full flex items-center gap-2.5 px-3 py-2.5",
                                "text-[13px] font-medium text-zinc-700",
                                "hover:bg-zinc-50 transition-colors duration-100",
                                "focus-visible:outline-none",
                            )}
                        >
                            {/* <span className="text-[14px] font-medium opacity-60">
                                {currency.symbol}
                            </span> */}
                            <span>{currency.iso}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
