import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { MARKETPLACE_REQUEST_TYPES } from "../../_constants"
import { MarketplaceProduct } from "../../_types"
import Price from "./price"

interface Props {
    item: MarketplaceProduct
}

export default function Main({ item }: Props) {
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (t) => t.key === item.request_type,
    )

    return (
        <Group>
            {item.main_image_url !== null && (
                <ClientImg
                    src={item.main_image_url}
                    alt={item.name}
                    wrapperClassName="aspect-video h-auto mb-2"
                    className="rounded-2xl"
                />
            )}

            <div className="mb-2">
                <span
                    className={cn(
                        "text-xs px-2.5 py-0.5 leading-0 rounded-4xl capitalize",
                        requestType?.className,
                    )}
                >
                    <ClientTranslate translationKey={requestType?.name} />
                </span>
            </div>

            <Group className="flex flex-col gap-1">
                <h3 className="font-semibold">{item.name}</h3>
                <Price item={item} />
                <div
                    className={cn(
                        "text-xs text-card-info",
                        item.main_image_url !== null ?
                            "line-clamp-3"
                        :   "line-clamp-11",
                    )}
                >
                    {parse(item.description)}
                </div>
            </Group>
        </Group>
    )
}
