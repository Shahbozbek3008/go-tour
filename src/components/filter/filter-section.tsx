import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils/shadcn"
import { ChevronDown, ChevronUp } from "lucide-react"
import React from "react"

interface FilterSectionProps {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}

export const FilterSection = ({
    title,
    defaultOpen = true,
    children,
}: FilterSectionProps) => {
    const [open, setOpen] = React.useState(defaultOpen)

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <button
                    className={cn(
                        "flex w-full items-center justify-between py-3.5",
                        "text-[13px] font-semibold tracking-[0.01em] text-zinc-800",
                        "hover:text-zinc-500 transition-colors duration-150",
                        "focus-visible:outline-none",
                    )}
                >
                    {title}
                    {open ?
                        <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                    :   <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />}
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="pb-4">{children}</div>
            </CollapsibleContent>
        </Collapsible>
    )
}
