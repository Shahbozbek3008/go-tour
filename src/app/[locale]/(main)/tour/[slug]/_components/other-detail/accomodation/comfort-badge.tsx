"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"

interface ComfortBadgeProps {
    level: number
    className?: string
}

export function ComfortBadge({
    level,
    className,
}: ComfortBadgeProps) {
    const { isRussian } = useLanguage()

    const getComfortLabel = (l: number) => {
        if (l >= 5) return "luxury"
        if (l >= 4) return "premium"
        if (l >= 3) return "comfort"
        return "economy"
    }

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                <ClientTranslate translationKey="comfortLevel" />
            </span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                    <ClientTranslate translationKey={getComfortLabel(level)} />
                </span>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                i < level ? "bg-emerald-500" : (
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
