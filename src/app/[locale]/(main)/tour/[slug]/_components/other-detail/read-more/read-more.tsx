"use client"

import { cn } from "@/lib/utils/shadcn"
import { ChevronDown } from "lucide-react"
import { useLayoutEffect, useRef, useState } from "react"

interface ReadMoreProps {
    children: string
    lines?: number
    className?: string
}

export function ReadMore({ children, lines = 4, className }: ReadMoreProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const el = ref.current
        if (!el) return

        const checkClamping = () =>
            setIsClamped(el.scrollHeight > el.clientHeight)

        checkClamping()

        const observer = new ResizeObserver(checkClamping)
        observer.observe(el)

        return () => observer.disconnect()
    }, [children, lines])

    return (
        <div className={className}>
            <div
                ref={ref}
                className={cn(
                    "text-[15px] leading-[1.6] text-foreground transition-all duration-300",
                    !isExpanded && `line-clamp-${lines}`,
                )}
            >
                {children}
            </div>

            {(isClamped || isExpanded) && (
                <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="mt-2.5 flex items-center gap-1.5 text-[15px] font-medium text-[#ADC227] transition-colors"
                >
                    <span>{isExpanded ? "Hide" : "Read more"}</span>
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            isExpanded && "rotate-180",
                        )}
                    />
                </button>
            )}
        </div>
    )
}
