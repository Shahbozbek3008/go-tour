import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/shadcn"
import { OUTREACH_HUB_TYPES } from "../../_constants"
import { OutreachhubItem } from "../../_types"
import ShareAction from "./share-action"

interface Props {
    item: OutreachhubItem
    shared?: boolean
}

export default function Header({ item, shared }: Props) {
    const requestType = OUTREACH_HUB_TYPES.find(
        (o) => o.key === item.request_type,
    )
    return (
        <Group className="relative">
            <ClientImg
                fill
                priority
                src={item.main_image_url}
                alt={item.name || "item image"}
                wrapperClassName="aspect-video mb-2.5"
                className="rounded-2xl"
            />

            {shared && (
                <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-text-100 flex items-center justify-center">
                    <ShareAction />
                </div>
            )}
            <Badge className="absolute top-2 right-2 capitalize">
                <ClientTranslate translationKey={requestType?.name} />
            </Badge>

            <div className="absolute bottom-0 w-full h-3 overflow-hidden rounded-lg bg-gray-200">
                <div
                    className={cn(
                        "h-full rounded-lg transition-all",
                        item.status === "collected" ?
                            "bg-(--success-main)"
                        :   "bg-(--warning-main)",
                    )}
                    style={{
                        width: `${item.collected_amount_percentage}%`,
                    }}
                />
            </div>
        </Group>
    )
}
