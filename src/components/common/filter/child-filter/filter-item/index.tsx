"use client"

import { Divider } from "@/components/common/divider"
import ClientTranslate from "@/components/common/translation/client-translate"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useFilterValues } from "@/hooks/use-filter-values"
import { cn } from "@/lib/utils/shadcn"
import { AiChatType } from "../../../ai-chat/_hooks/use-ai-persist"
import { ChildFilterItem } from "../../types"
import { CheckboxFilterGroup } from "./checkbox-filter-group"
import { RadioFilterGroup } from "./radio-filter-group"

interface FilterItemProps {
    filter: ChildFilterItem
    isLast: boolean
    aiChatType: AiChatType
    triggerClassName?: string
}

export const FilterItem = ({
    filter,
    isLast,
    aiChatType,
    triggerClassName,
}: FilterItemProps) => {
    const { type, items, icon, name, translationKey } = filter
    const { updateFilters, values } = useFilterValues({ filter, aiChatType })
    const itemValues = items.map((i) => i.id)
    const filteredValues = values.filter((v) => itemValues.includes(v))

    return (
        <>
            <AccordionItem
                value={(name || translationKey) as string}
                className="border-b-0"
            >
                <AccordionTrigger
                    className={cn("flex items-center gap-3", triggerClassName)}
                >
                    <div className="flex items-center gap-3">
                        {icon}
                        <h5 className="font-medium">
                            {name || (
                                <ClientTranslate
                                    translationKey={translationKey}
                                />
                            )}
                        </h5>
                        {filteredValues.length > 0 && (
                            <Badge
                                variant="outline"
                                className="ml-2 !p-0 h-6 min-w-6 inline-flex items-center justify-center text-xs font-semibold bg-primary leading-none text-white rounded-full"
                            >
                                {filteredValues.length}
                            </Badge>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {type === "checkbox" && (
                        <CheckboxFilterGroup
                            items={items}
                            values={filteredValues}
                            onUpdate={(value, checked) =>
                                updateFilters(value, checked)
                            }
                        />
                    )}
                    {type === "radio" && (
                        <RadioFilterGroup
                            items={items}
                            value={filteredValues[0]}
                            onUpdate={(value) => updateFilters(value)}
                        />
                    )}
                </AccordionContent>
            </AccordionItem>
            {!isLast && <Divider />}
        </>
    )
}
