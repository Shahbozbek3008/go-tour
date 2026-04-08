import { TranslationKey } from "@/components/common/translation/types"
import { InvestmentRequestType } from "../../../_types"

type FilterKey = "request_type"

export interface FilterConfig {
    title: TranslationKey
    icon: React.ReactNode
    categories: { key: InvestmentRequestType; name: TranslationKey }[]
    key: FilterKey
    values: string[]
    valuesFromAi: string[]
}
