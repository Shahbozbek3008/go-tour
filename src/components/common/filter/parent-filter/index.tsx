import { Accordion } from "@/components/ui/accordion"
import { ParentFilterItem } from "../types"
import FilterItem from "./filter-item"

interface Props {
    items: ParentFilterItem[]
    defaultValue?: string
}

export default function ParentFilter({ items, defaultValue }: Props) {
    return (
        <Accordion
            type="single"
            className="w-full"
            collapsible
            defaultValue={defaultValue}
        >
            {items.map((item) => {
                return <FilterItem key={item.filterKey} item={item} />
            })}
        </Accordion>
    )
}
