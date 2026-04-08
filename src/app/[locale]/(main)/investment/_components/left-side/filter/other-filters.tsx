"use client"

import { IconBusinessPlan } from "@/assets/icons/business-plan"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import Filter from "@/components/common/filter/child-filter"
import { ChildFilterItem } from "@/components/common/filter/types"
import { INVESTMENT_REQUEST_TYPES } from "../../../_constants"

interface Props {
    className?: string
}

export default function OtherFilters({ className }: Props) {
    const {
        chats: {
            investment_filter: { requestTypes: requestTypesFromAi },
        },
    } = useAiPersist()

    const filters: ChildFilterItem[] = [
        {
            translationKey: "requestType",
            icon: <IconBusinessPlan />,
            items: INVESTMENT_REQUEST_TYPES.map((item) => ({
                id: item.key,
                translationKey: item.name,
            })),
            filterKey: "request_type",
            type: "checkbox",
            valuesFromAi: requestTypesFromAi,
        },
    ]

    return (
        <Filter
            aiChatType="investment_filter"
            filterItems={filters}
            className={className}
        />
    )
}
