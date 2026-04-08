import { formatMln, getCurrencySign } from "@/lib/utils/money"
import { Currency } from "@/types/common/extra"
import NumberText, { NumberTextProps } from "./number-text"

type Props = NumberTextProps & {
    currency?: Currency | null
}

export default function MoneyText({ currency, value, ...props }: Props) {
    const currencyIso = currency ? getCurrencySign(currency).iso : ""
    const { mlnSuffix, value: val } = formatMln(value)

    return (
        <NumberText
            prefix={`${currencyIso} `}
            suffix={` ${mlnSuffix}`}
            value={val}
            {...props}
        />
    )
}
