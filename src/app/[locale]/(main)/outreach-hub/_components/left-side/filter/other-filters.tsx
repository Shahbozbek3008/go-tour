"use client"

import { IconBusinessPlan } from "@/assets/icons/business-plan"
import IconClock2 from "@/assets/icons/clock-icon"
import IconStatus2 from "@/assets/icons/status-icon2"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import Filter from "@/components/common/filter/child-filter"
import { ChildFilterItem } from "@/components/common/filter/types"
import {
    OUTREACH_HUB_STATUS_TYPES,
    OUTREACH_HUB_TIME_TYPES,
    OUTREACH_HUB_TYPES,
} from "../../../_constants"

interface Props {
    className?: string
}

export default function OtherFilters({ className }: Props) {
    const {
        chats: {
            outreach_hub_filter: { requestTypes: requestTypesFromAi },
        },
    } = useAiPersist()

    const filters: ChildFilterItem[] = [
        {
            translationKey: "requestType",
            icon: <IconBusinessPlan />,
            items: OUTREACH_HUB_TYPES.map((item) => ({
                id: item.key,
                translationKey: item.name,
            })),
            filterKey: "request_type",
            type: "checkbox",
            valuesFromAi: requestTypesFromAi,
        },
        {
            translationKey: "statusType",
            icon: (
                <IconStatus2 className="[&_path]:stroke-foreground [&_rect]:stroke-foreground" />
            ),
            items: OUTREACH_HUB_STATUS_TYPES.map((item) => ({
                id: item.key,
                translationKey: item.name,
            })),
            filterKey: "status",
            type: "radio",
            valuesFromAi: [],
        },
        {
            translationKey: "timeFrame",
            icon: (
                <IconClock2
                    width={18}
                    height={18}
                    className="[&_path]:stroke-foreground [&_rect]:stroke-foreground"
                />
            ),
            items: OUTREACH_HUB_TIME_TYPES.map((item) => ({
                id: item.key,
                translationKey: item.name,
            })),
            filterKey: "created_at",
            type: "radio",
            valuesFromAi: [],
        },
    ]

    return (
        <Filter
            aiChatType="outreach_hub_filter"
            filterItems={filters}
            className={className}
        />
    )
}
