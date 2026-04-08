"use client"

import IconBuilding from "@/assets/icons/building-icon"
import { Divider } from "@/components/common/divider"
import { TranslationKey } from "@/components/common/translation/types"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import useSearch from "@/hooks/use-search"
import { useRouter } from "@/i18n/navigation"
import { getArray } from "@/lib/utils/get-array"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useTranslations } from "next-intl"
import { COMPANY_BUSINESS_TYPES } from "../../../_constants"

type FilterKey = "business_type"

interface FilterConfig {
    title: string
    icon: React.ReactNode
    categories: Array<{ key: string; name: string }>
    key: FilterKey
}

interface Props {
    className?: string
}

export default function CategoryFilter({ className }: Props) {
    const t = useTranslations()
    const filters: FilterConfig[] = [
        {
            title: t("businessType"),
            icon: <IconBuilding />,
            categories: COMPANY_BUSINESS_TYPES,
            key: "business_type",
        },
    ]
    const params = useSearch()
    const jsonParams = useSearch({ jsonParse: false })
    const businessTypes = getArray<string>(params.business_type)
    const router = useRouter()

    const updatedFilters = (
        filterKey: FilterKey,
        categoryKey: string,
        checked?: CheckedState,
    ) => {
        const currentValues = filterKey === "business_type" ? businessTypes : []

        const nextValues =
            checked === true ?
                Array.from(new Set([...currentValues, categoryKey]))
            :   currentValues.filter((id) => id !== categoryKey)

        router.replace(
            getHref({
                pathname: "/[locale]/companies",
                query: {
                    ...jsonParams,
                    [filterKey]:
                        nextValues.length ?
                            JSON.stringify(nextValues)
                        :   undefined,
                },
            }),
            { scroll: false },
        )
    }

    interface FilterItemProps {
        filter: FilterConfig
        selectedItems: string[]
        isLast: boolean
    }

    const FilterItem = ({ filter, selectedItems, isLast }: FilterItemProps) => {
        const selectedCount = selectedItems.length

        return (
            <>
                <AccordionItem
                    key={filter.title}
                    value={filter.title}
                    className="border-b-0"
                >
                    <AccordionTrigger className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                            {filter.icon}
                            <h5 className="font-medium">{filter.title}</h5>
                            {selectedCount > 0 && (
                                <Badge
                                    variant="outline"
                                    className="ml-2 !p-0 h-6 min-w-6 inline-flex items-center justify-center text-xs font-semibold bg-primary leading-none text-white rounded-full"
                                >
                                    {selectedCount}
                                </Badge>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-3">
                            {filter.categories.map((category) => (
                                <label
                                    key={category.key}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <Checkbox
                                        className="w-4.5 h-4.5"
                                        checked={selectedItems.includes(
                                            category.key,
                                        )}
                                        onCheckedChange={(checked) =>
                                            updatedFilters(
                                                filter.key,
                                                category.key,
                                                checked,
                                            )
                                        }
                                    />
                                    {t(category.name as TranslationKey)}
                                </label>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                {!isLast && <Divider />}
            </>
        )
    }

    return (
        <Accordion
            type="single"
            collapsible
            className={cn("flex flex-col gap-4", className)}
        >
            {filters.map((filter, index) => (
                <FilterItem
                    key={filter.title}
                    filter={filter}
                    selectedItems={businessTypes}
                    isLast={index === filters.length - 1}
                />
            ))}
        </Accordion>
    )
}
