import NumberText from "@/components/common/number-text"
import { getCurrencySign } from "@/lib/utils/money"
import { MARKETPLACE_REQUEST_TYPES } from "../../_constants"
import { MarketplaceProduct } from "../../_types"

interface Props {
    item: MarketplaceProduct
}

export default function Price({ item }: Props) {
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (t) => t.key === item?.request_type,
    )
    const pricingType = item?.pricing_model?.type
    const priceLabel =
        (
            pricingType &&
            pricingType in (requestType?.priceModel?.priceLabels ?? {})
        ) ?
            requestType?.priceModel?.priceLabels?.[
                pricingType as keyof typeof requestType.priceModel.priceLabels
            ]
        :   undefined
    const percentageLabel =
        (
            pricingType &&
            pricingType in (requestType?.priceModel?.percentageLabels ?? {})
        ) ?
            requestType?.priceModel?.percentageLabels?.[
                pricingType as keyof typeof requestType.priceModel.percentageLabels
            ]
        :   undefined

    return (
        <div className="text-primary font-semibold">
            {priceLabel && (
                <>
                    {pricingType === "Fixed Price" && (
                        <>
                            <NumberText
                                className="font-semibold text-primary"
                                value={
                                    item?.pricing_model?.converted_start_amount
                                }
                                prefix={`${getCurrencySign(item?.pricing_model?.converted_currency).symbol} `}
                                suffix={
                                    !item?.pricing_model?.converted_end_amount ?
                                        `${item?.pricing_model?.measurement ? `/${item?.pricing_model?.measurement}` : ""}`
                                    :   " - "
                                }
                            />
                            {item?.pricing_model?.converted_end_amount && (
                                <NumberText
                                    className="font-semibold text-primary"
                                    value={
                                        item?.pricing_model
                                            ?.converted_end_amount
                                    }
                                    suffix={`${item?.pricing_model?.measurement ? `/${item?.pricing_model?.measurement}` : ""}`}
                                />
                            )}
                        </>
                    )}
                    {pricingType === "Tender-Based" && (
                        <NumberText
                            className="font-semibold text-primary"
                            value={item?.pricing_model?.converted_start_amount}
                            prefix={`Starting from ${getCurrencySign(item?.pricing_model?.converted_currency).symbol} `}
                            suffix={`${item?.pricing_model?.measurement ? `/${item?.pricing_model?.measurement}` : ""}`}
                        />
                    )}
                </>
            )}
            {percentageLabel && (
                <>
                    <NumberText
                        className="font-semibold text-primary"
                        value={item?.pricing_model?.start_percentage}
                        suffix={
                            item?.pricing_model?.end_percentage ?
                                " - "
                            :   "% fee"
                        }
                    />
                    <NumberText
                        className="font-semibold text-primary"
                        value={item?.pricing_model?.end_percentage}
                        suffix="% fee"
                    />
                </>
            )}
        </div>
    )
}
