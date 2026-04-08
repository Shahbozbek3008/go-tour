import { Divider } from "@/components/common/divider"
import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"
import FilterFooter from "./footer"
import OtherFilters from "./other-filters"
import { RegionFilter } from "./region-filter"

interface Props {
    className?: string
}

const Filter = ({ className }: Props) => {
    return (
        <hgroup
            className={cn(
                "md:border pt-4 md:p-4 flex flex-col gap-6 rounded-lg",
                className,
            )}
        >
            <h2 className="clamp-[text,base,2xl] font-medium max-md:text-center">
                <ClientTranslate translationKey="filter" />
            </h2>
            <Divider />
            <RegionFilter />
            <Divider />
            <OtherFilters />
            <FilterFooter />
        </hgroup>
    )
}

export default Filter
