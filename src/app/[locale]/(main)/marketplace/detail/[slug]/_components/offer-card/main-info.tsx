"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import {
    MARKETPLACE_REQUEST_TYPES,
    MarketplaceProductField,
} from "../../../../_constants"
import { MarketplaceProductDetail } from "../../../../_types"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

export default function MainInfo() {
    const { data } = useMarketplaceProductQuery()
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (t) => t.key === data?.request_type,
    )

    return (
        <div className="flex flex-col gap-3.5 break-all">
            {data?.category?.id && (
                <p>
                    <span className="text-text-500">
                        <ClientTranslate translationKey="category" />:
                    </span>{" "}
                    <span className="font-medium">
                        {data.category?.full_name.replaceAll("|", " / ")}
                    </span>
                </p>
            )}
            {Object.entries(requestType?.specific_fields || {}).map(
                // @ts-expect-error sadf
                ([key, value]: [
                    keyof MarketplaceProductDetail,
                    MarketplaceProductField,
                ]) => {
                    if (value.hideOnDetailPage) return
                    return (
                        <p key={key}>
                            <span className="text-text-500">
                                <ClientTranslate
                                    translationKey={
                                        value.label as TranslationKey
                                    }
                                />
                                :
                            </span>{" "}
                            <span className="font-medium">
                                {/* <ClientTranslate translationKey={data?.[key]} /> */}
                                {String(data?.[key] ?? "")}{" "}
                                {(
                                    key === "quantity" &&
                                    data?.pricing_model?.measurement
                                ) ?
                                    `${data?.pricing_model?.measurement || ""}${data?.supply_requirement ? `/${data.supply_requirement_display}` : ""}`
                                :   ""}
                            </span>
                        </p>
                    )
                },
            )}
        </div>
    )
}
