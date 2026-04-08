"use client"

import NumberText from "@/components/common/number-text"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { getCurrencySign } from "@/lib/utils/money"
import { MARKETPLACE_REQUEST_TYPES } from "../../../../_constants"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

export default function PriceInfo() {
    const { data } = useMarketplaceProductQuery()
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (t) => t.key === data?.request_type,
    )
    const pricingType = data?.pricing_model?.type
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
        <div className="rounded-lg bg-primary/5 px-3 py-2.5">
            {/* Mobile: faqat value'lar, bitta qatorda */}
            {/* <div className="flex items-center gap-5 md:hidden whitespace-nowrap">
                        <h3 className="text-2xl font-semibold text-primary">
                            $ 1,200
                        </h3>
                        <p className="text-lg text-primary min-w-0 truncate">
                            LC or 30% advance / 70% delivery
                        </p>
                    </div> */}
            <hgroup>
                {pricingType && (
                    <div>
                        <span className="text-sm text-primary">
                            <ClientTranslate translationKey="pricingModel" />:
                        </span>{" "}
                        &nbsp;
                        <span className="font-semibold text-primary">
                            {pricingType}
                        </span>
                    </div>
                )}
                {priceLabel && (
                    <div>
                        <span className="text-sm text-primary">
                            <ClientTranslate
                                translationKey={priceLabel as TranslationKey}
                            />
                            :
                        </span>{" "}
                        &nbsp;
                        {pricingType === "Fixed Price" && (
                            <>
                                <NumberText
                                    className="font-semibold text-primary"
                                    value={
                                        data?.pricing_model
                                            ?.converted_start_amount
                                    }
                                    prefix={`${getCurrencySign(data?.pricing_model?.converted_currency).symbol} `}
                                    suffix={
                                        (
                                            !data?.pricing_model
                                                ?.converted_end_amount
                                        ) ?
                                            `${data?.pricing_model?.measurement ? `/${data?.pricing_model?.measurement}` : ""}`
                                        :   "-"
                                    }
                                />
                                <NumberText
                                    className="font-semibold text-primary"
                                    value={
                                        data?.pricing_model
                                            ?.converted_end_amount
                                    }
                                    suffix={`${data?.pricing_model?.measurement ? `/${data?.pricing_model?.measurement}` : ""}`}
                                />
                            </>
                        )}
                        {pricingType === "Tender-Based" && (
                            <NumberText
                                className="font-semibold text-primary"
                                value={
                                    data?.pricing_model?.converted_start_amount
                                }
                                prefix={`${getCurrencySign(data?.pricing_model?.converted_currency).symbol} `}
                                suffix={`${data?.pricing_model?.measurement ? `/${data?.pricing_model?.measurement}` : ""}`}
                            />
                        )}
                    </div>
                )}
                {percentageLabel && (
                    <div>
                        <span className="text-sm text-primary">
                            {percentageLabel}:
                        </span>{" "}
                        &nbsp;
                        <NumberText
                            className="font-semibold text-primary"
                            value={data?.pricing_model?.start_percentage}
                            suffix={
                                data?.pricing_model?.end_percentage ? "-" : "%"
                            }
                        />
                        <NumberText
                            className="font-semibold text-primary"
                            value={data?.pricing_model?.end_percentage}
                            suffix="%"
                        />
                    </div>
                )}
                {data?.commercial_terms && (
                    <div>
                        <span className="text-sm text-primary">
                            <ClientTranslate translationKey="commercialTerms" />
                            :
                        </span>{" "}
                        &nbsp;
                        <span className="font-semibold text-primary">
                            {data?.commercial_terms}
                        </span>
                    </div>
                )}
            </hgroup>
        </div>
    )
}
