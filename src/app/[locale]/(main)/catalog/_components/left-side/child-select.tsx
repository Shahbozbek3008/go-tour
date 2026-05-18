import { cn } from "@/lib/utils/shadcn"
import { Check, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"

interface ChildAgeSelectProps {
    value: number | null
    onChange: (val: number | null) => void
}

const AGE_OPTIONS: { value: number; label: string }[] = [
    { value: -1, label: "catalogFilterChildAgeAll" },
    { value: 0, label: "catalogFilterChildAgeUnder1" },
    ...Array.from({ length: 17 }, (_, i) => ({
        value: i + 1,
        label: "catalogFilterChildAgeYears",
    })),
]

export const ChildAgeSelect = ({ value, onChange }: ChildAgeSelectProps) => {
    const t = useTranslations()
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setOpen(false)
        }
    }

    const getLabel = () => {
        if (value === null || value === -1)
            return t("catalogFilterChildAgeNotSelected")
        if (value === 0) return t("catalogFilterChildAgeUnder1")
        return t("catalogFilterChildAgeYears", { age: value })
    }

    const handleSelect = (optValue: number) => {
        onChange(optValue === -1 ? null : optValue)
        setOpen(false)
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            onBlur={handleBlur}
            tabIndex={-1}
        >
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-3",
                    "border border-zinc-200 rounded-lg bg-white text-[14px]",
                    "text-zinc-500 transition-colors duration-150",
                    "hover:border-zinc-300 focus-visible:outline-none",
                    open && "border-zinc-400",
                )}
            >
                <span
                    className={cn(
                        value === null ? "text-zinc-400" : (
                            "text-zinc-800 font-medium"
                        ),
                    )}
                >
                    {getLabel()}
                </span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-zinc-400 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <div
                    className={cn(
                        "absolute z-50 top-[calc(100%+4px)] left-0 right-0",
                        "bg-white border border-zinc-200 rounded-xl shadow-lg",
                        "max-h-[220px] overflow-y-auto",
                        "scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent",
                    )}
                >
                    {AGE_OPTIONS.map((opt) => {
                        const isSelected =
                            opt.value === -1 ?
                                value === null
                            :   value === opt.value

                        const label =
                            opt.value === -1 ? t("catalogFilterChildAgeAll")
                            : opt.value === 0 ? t("catalogFilterChildAgeUnder1")
                            : t("catalogFilterChildAgeYears", {
                                    age: opt.value,
                                })

                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleSelect(opt.value)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-2.5",
                                    "text-[14px] text-left transition-colors duration-100",
                                    "hover:bg-zinc-50 focus-visible:outline-none",
                                    isSelected ?
                                        "bg-zinc-50 text-zinc-900 font-medium"
                                    :   "text-zinc-700",
                                )}
                            >
                                <span>{label}</span>
                                {isSelected && (
                                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
