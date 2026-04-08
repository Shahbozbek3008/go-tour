import { NumericFormat, NumericFormatProps } from "react-number-format"

export interface NumberTextProps extends NumericFormatProps {
    isShowZero?: boolean
}

export default function NumberText({
    value,
    isShowZero,
    ...props
}: NumberTextProps) {
    const num = Number(value)
    const val =
        num ? num.toPrecision()
        : isShowZero ? 0
        : ""

    return (
        <NumericFormat
            thousandSeparator={","}
            readOnly
            decimalScale={2}
            value={val}
            {...props}
            displayType="text"
        />
    )
}
