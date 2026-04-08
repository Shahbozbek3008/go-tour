import NumberText from "@/components/common/number-text"
import ClientTranslate from "@/components/common/translation/client-translate"
import { formatMln, getCurrencySign } from "@/lib/utils/money"
import { cn } from "@/lib/utils/shadcn"
import { INVESTMENT_REQUEST_TYPES } from "../../../_constants"
import { InvestmentItem } from "../../../_types"

interface Props {
    item: InvestmentItem
    className?: string
}
export default function PriceInfo({ item, className }: Props) {
    const requestType = INVESTMENT_REQUEST_TYPES.find(
        (t) => t.key === item.request_type,
    )
    return (
        <div className={cn("my-4 flex flex-col gap-1", className)}>
            <span className="text-sm font-semibold">
                <ClientTranslate
                    translationKey={requestType?.priceField.label}
                />
            </span>
            <span className="font-bold text-primary">
                {requestType?.priceField.end_price ?
                    item?.converted_start_price ?
                        <>
                            <NumberText
                                value={
                                    formatMln(item?.converted_start_price).value
                                }
                                prefix={`${getCurrencySign(item?.converted_currency).symbol} `}
                                suffix={
                                    !item?.converted_end_price ?
                                        ` ${formatMln(item?.converted_start_price).mlnSuffix}`
                                    :   ` ${formatMln(item?.converted_start_price).mlnSuffix} - `
                                }
                            />
                            {item?.converted_end_price && (
                                <NumberText
                                    value={
                                        formatMln(item?.converted_end_price)
                                            .value
                                    }
                                    suffix={` ${formatMln(item?.converted_end_price).mlnSuffix}`}
                                />
                            )}
                        </>
                    :   ""
                :   <NumberText
                        value={formatMln(item?.converted_start_price).value}
                        prefix={`${getCurrencySign(item?.converted_currency).symbol} `}
                        suffix={` ${formatMln(item?.converted_start_price).mlnSuffix}`}
                    />
                }
            </span>
        </div>
    )
}
