import { NumericFormatProps, numericFormatter } from "react-number-format"

export function formatNumber(
    val: unknown,
    {
        isShowZero,
        ...props
    }: NumericFormatProps & {
        isShowZero?: boolean
    } = {},
) {
    const num = Number(val)
    const numStr = String(num)

    return (
        num ?
            numericFormatter(numStr, {
                thousandSeparator: " ",

                ...props,
            })
        : isShowZero ? 0
        : ""
    )
}

export const formatAmount = (
    value: string | number | null | undefined,
): string => {
    if (value == null) return "0"
    const num = Number(value)

    if (num === 0) return "0"

    return num.toString()
}
