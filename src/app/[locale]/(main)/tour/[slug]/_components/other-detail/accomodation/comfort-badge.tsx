import { cn } from "@/lib/utils/shadcn"
import type { ComfortLevel } from "../../../_types"

interface ComfortBadgeProps {
    level: ComfortLevel
    rating: number
    maxRating: number
    className?: string
}

export function ComfortBadge({
    level,
    rating,
    maxRating,
    className,
}: ComfortBadgeProps) {
    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                Comfort
            </span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                    {level}
                </span>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: maxRating }).map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                i < rating ? "bg-emerald-500" : (
                                    "bg-emerald-200"
                                ),
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
