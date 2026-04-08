import { ReactNode } from "react"
import { AiChatType } from "../ai-chat/_hooks/use-ai-persist"
import { TranslationKey } from "../translation/types"

type FilterKey =
    | "request_type"
    | "status"
    | "created_at"
    | "countries"
    | "countries"
    | "category"

export interface ChildFilterItem {
    name?: string
    translationKey?: TranslationKey
    items: { id: string; name?: string; translationKey?: TranslationKey }[]
    filterKey: FilterKey
    valuesFromAi: string[]
    type: "checkbox" | "radio"
    icon?: React.ReactNode
}
export interface ChildFilterProps {
    filterItems: ChildFilterItem[]
    aiChatType: AiChatType
    className?: string
    triggerClassName?: string
}

export interface ParentFilterItem {
    value: string
    childFilterProps: ChildFilterProps
    filterKey: FilterKey
    icon?: ReactNode
    name?: string
    translationKey?: TranslationKey
}
