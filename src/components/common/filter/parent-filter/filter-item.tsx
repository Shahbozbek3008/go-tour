"use client"

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import useSearch from "@/hooks/use-search"
import { getArray } from "@/lib/utils/get-array"
import ClientTranslate from "../../translation/client-translate"
import ChildFilter from "../child-filter"
import { ParentFilterItem } from "../types"

interface Props {
    item: ParentFilterItem
}

export default function FilterItem({ item }: Props) {
    const { filterKey, childFilterProps, value, icon, name, translationKey } =
        item
    const params = useSearch()
    const values = getArray<string>(params[filterKey])

    return (
        <AccordionItem value={value}>
            <AccordionTrigger className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-medium">
                    {icon}
                    <span>
                        {name || (
                            <ClientTranslate translationKey={translationKey} />
                        )}
                    </span>
                    {values.length > 0 && (
                        <Badge
                            variant="outline"
                            className="ml-2 !p-0 h-6 min-w-6 inline-flex items-center justify-center text-xs font-semibold bg-primary leading-none text-white rounded-full"
                        >
                            {values.length}
                        </Badge>
                    )}
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <ChildFilter {...childFilterProps} />
            </AccordionContent>
        </AccordionItem>
    )
}
