import { IconClock } from "@/assets/icons/clock"
import MoneyText from "@/components/common/money-text"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { OUTREACH_HUB_STATUS_TYPES } from "../../_constants"
import { OutreachhubItem } from "../../_types"

interface Props {
    item: OutreachhubItem
}

export default function Body({ item }: Props) {
    const itemStatusType = OUTREACH_HUB_STATUS_TYPES.find(
        (s) => s.key === item.status,
    )

    return (
        <>
            <div className="flex items-center mb-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <IconClock />
                    <p>{formatRelativeDate(item.created_at)}</p>
                </div>
            </div>

            <Group className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                        <MoneyText
                            value={item.collected_amount}
                            currency={item.converted_currency}
                            isShowZero
                        />
                    </h3>
                    <h3 className="text-sm text-(--text-400)">
                        <ClientTranslate translationKey="plan" />:{" "}
                        <MoneyText
                            value={item.plan_price_amount}
                            currency={item.converted_currency}
                            isShowZero
                        />
                    </h3>
                </div>
                <Badge className="bg-(--success-100) text-success">
                    <ClientTranslate translationKey={itemStatusType?.name} />
                </Badge>
            </Group>
        </>
    )
}
