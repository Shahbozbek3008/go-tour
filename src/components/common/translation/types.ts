import { Formats, MessageKeys, Messages, NestedKeyOf } from "next-intl"

export type TranslationKey = MessageKeys<Messages, NestedKeyOf<Messages>>

export interface TranslationComponentProps {
    translationKey: TranslationKey | undefined
    values?: Record<string, string | number | Date>
    formats?: Formats
    className?: string
    isParse?: boolean
}
