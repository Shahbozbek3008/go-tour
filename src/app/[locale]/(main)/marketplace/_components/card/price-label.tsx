import ClientTranslate from "@/components/common/translation/client-translate"
import { MARKETPLACE_REQUEST_TYPES } from "../../_constants"
import { MarketplaceProduct } from "../../_types"

interface Props {
    item: MarketplaceProduct
}

export default function PriceLabel({ item }: Props) {
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (t) => t.key === item?.request_type,
    )
    const pricingType = item?.pricing_model?.type

    if (requestType?.key === "partnership") return

    return (
        pricingType && (
            <div className="text-xs">
                <span className="">
                    <ClientTranslate translationKey="priceModel" />:
                </span>{" "}
                &nbsp;
                <span className="font-semibold text-primary">
                    {item?.pricing_model?.type_display}
                </span>
            </div>
        )
    )
}
