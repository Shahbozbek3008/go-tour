import { TranslationKey } from "@/components/common/translation/types"

type FilterKey = "request_type" | "status" | "created_at"

export interface FilterConfig {
    title: TranslationKey
    icon: React.ReactNode
    categories: { key: string; name: TranslationKey }[]
    key: FilterKey
    values: string[]
    valuesFromAi: string[]
    type: "checkbox" | "radio"
}
