import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils/shadcn"
import { ChildFilterProps } from "../types"
import { FilterItem } from "./filter-item"

export default function ChildFilter({
    filterItems,
    aiChatType,
    className,
    triggerClassName,
}: ChildFilterProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className={cn("flex flex-col gap-4", className)}
        >
            {filterItems.map((filter, index) => (
                <FilterItem
                    key={index}
                    filter={filter}
                    isLast={index === filterItems.length - 1}
                    aiChatType={aiChatType}
                    triggerClassName={triggerClassName}
                />
            ))}
        </Accordion>
    )
}
