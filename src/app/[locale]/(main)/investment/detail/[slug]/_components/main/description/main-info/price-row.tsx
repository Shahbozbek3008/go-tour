"use client"

import { INVESTMENT_REQUEST_TYPES } from "@/app/[locale]/(main)/investment/_constants"
import NumberText from "@/components/common/number-text"
import { formatMln, getCurrencySign } from "@/lib/utils/money"
import { useTranslations } from "next-intl"
import { useInvestmentItemQuery } from "../../../../_hooks/use-investment-item-query"
import InfoRow from "./info-row"

export default function PriceRow() {
    const t = useTranslations()
    const { data } = useInvestmentItemQuery()
    const requestType = INVESTMENT_REQUEST_TYPES.find(
        (t) => t.key === data?.request_type,
    )

    return (
        <InfoRow
            label={
                requestType?.priceField.label ?
                    t(requestType?.priceField.label)
                :   ""
            }
            value={
                requestType?.priceField.end_price ?
                    data?.converted_start_price ?
                        <>
                            <NumberText
                                value={
                                    formatMln(data?.converted_start_price).value
                                }
                                prefix={`${getCurrencySign(data?.converted_currency).symbol} `}
                                suffix={
                                    !data?.converted_end_price ?
                                        ` ${formatMln(data?.converted_start_price).mlnSuffix}`
                                    :   ` ${formatMln(data?.converted_start_price).mlnSuffix} - `
                                }
                            />
                            {data?.converted_end_price && (
                                <NumberText
                                    value={
                                        formatMln(data?.converted_end_price)
                                            .value
                                    }
                                    suffix={` ${formatMln(data?.converted_end_price).mlnSuffix}`}
                                />
                            )}
                        </>
                    :   ""
                :   <NumberText
                        value={formatMln(data?.converted_start_price).value}
                        prefix={`${getCurrencySign(data?.converted_currency).symbol} `}
                        suffix={` ${formatMln(data?.converted_start_price).mlnSuffix}`}
                    />
            }
        />
    )
}
