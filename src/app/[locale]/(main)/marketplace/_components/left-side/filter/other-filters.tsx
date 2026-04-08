"use client"

import { IconBox } from "@/assets/icons/box"
import { IconBusinessPlan } from "@/assets/icons/business-plan"
import { IconTrust } from "@/assets/icons/trust"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import Filter from "@/components/common/filter/child-filter"
import { ChildFilterItem } from "@/components/common/filter/types"
import { MARKETPLACE_REQUEST_TYPES } from "../../../_constants"
import { useProductCategoriesQuery } from "../../../_hooks/use-product-categories-query"
import { useServiceCategoriesQuery } from "../../../_hooks/use-service-categories-query"

interface Props {
    className?: string
}

export default function OtherFilters({ className }: Props) {
    const {
        chats: {
            marketplace_filter: {
                requestTypes: requestTypesFromAi,
                categories,
            },
        },
    } = useAiPersist()
    const { productCategories } = useProductCategoriesQuery()
    const { serviceCategories } = useServiceCategoriesQuery()

    const filters: ChildFilterItem[] = [
        {
            translationKey: "requestType",
            icon: <IconBusinessPlan />,
            items: MARKETPLACE_REQUEST_TYPES.map((item) => ({
                id: item.key,
                translationKey: item.name,
            })),
            filterKey: "request_type",
            type: "checkbox",
            valuesFromAi: requestTypesFromAi,
        },
        {
            translationKey: "productCategory",
            icon: <IconBox />,
            items: productCategories,
            filterKey: "category",
            type: "checkbox",
            valuesFromAi: categories,
        },
        {
            translationKey: "serviceCategory",
            icon: <IconTrust />,
            items: serviceCategories,
            filterKey: "category",
            type: "checkbox",
            valuesFromAi: categories,
        },
    ]

    return (
        <Filter
            aiChatType="marketplace_filter"
            filterItems={filters}
            className={className}
        />
    )
}
