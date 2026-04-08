"use client"

import parse from "html-react-parser"
import { useTranslations } from "next-intl"
import { TranslationComponentProps } from "./types"

export default function ClientTranslate({
    translationKey,
    values,
    formats,
    className,
    isParse,
}: TranslationComponentProps) {
    const t = useTranslations()

    if (!translationKey) return ""

    return (
        <span className={className}>
            {isParse ?
                parse(t(translationKey, values, formats))
            :   t(translationKey, values, formats)}
        </span>
    )
}
