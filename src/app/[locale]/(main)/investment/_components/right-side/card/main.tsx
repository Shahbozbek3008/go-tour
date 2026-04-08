import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { useTranslations } from "next-intl"
import { INVESTMENT_REQUEST_TYPES } from "../../../_constants"
import { InvestmentItem } from "../../../_types"

interface Props {
    item: InvestmentItem
}

export default function Main({ item }: Props) {
    const t = useTranslations()
    const requestType = INVESTMENT_REQUEST_TYPES.find(
        (t) => t.key === item.request_type,
    )
    return (
        <Group>
            {item.main_image_url && (
                <ClientImg
                    src={item.main_image_url}
                    alt={item.name || "investment image"}
                    wrapperClassName="aspect-video h-auto mb-2.5"
                    className="rounded-2xl"
                />
            )}

            <div className="flex items-center justify-between mb-1.5">
                <Badge
                    className={cn("capitalize text-xs", requestType?.className)}
                >
                    <ClientTranslate translationKey={requestType?.name} />
                </Badge>
                {/* <IconFlagCanada /> */}
            </div>

            <h3 className="font-bold line-clamp-2 mb-1.5">{item.name}</h3>

            <div className="flex items-center gap-x-6">
                <h5 className="inline-flex items-center gap-1 text-sm font-semibold">
                    {item.profile ?
                        `${item.profile?.first_name || ""} ${item.profile?.last_name || ""}`
                    :   t("anonymous")}
                </h5>
                {/* <ul className="text-sm text-text-500 list-disc">
                        <li>Urgent 20days </li>
                    </ul> */}
            </div>

            <Separator className="my-2.5" />

            <div
                className={cn(
                    "text-sm prose break-words",
                    item.main_image_url ? "line-clamp-4" : "line-clamp-4",
                )}
            >
                {parse(item.description)}
            </div>
        </Group>
    )
}
