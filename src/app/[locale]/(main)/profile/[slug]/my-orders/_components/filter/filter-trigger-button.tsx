"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/shadcn"
import { SlidersHorizontal } from "lucide-react"

interface FilterTriggerButtonProps {
    activeCount: number
    onClick: () => void
    className?: string
}

export const FilterTriggerButton = ({
    activeCount,
    onClick,
    className,
}: FilterTriggerButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative flex items-center gap-2 h-10 px-4 rounded-xl",
                "bg-white border border-zinc-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]",
                "text-[13px] font-medium text-zinc-700",
                "hover:border-zinc-300 hover:bg-zinc-50",
                "transition-all duration-150 focus-visible:outline-none",
                className,
            )}
        >
            <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
            {activeCount > 0 && (
                <Badge className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    {activeCount}
                </Badge>
            )}
        </button>
    )
}
