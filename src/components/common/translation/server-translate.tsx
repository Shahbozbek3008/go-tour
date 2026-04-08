import parse from "html-react-parser"
import { getTranslations } from "next-intl/server"
import { TranslationComponentProps } from "./types"

export default async function ServerTranslate({
    translationKey,
    values,
    formats,
    className,
    isParse,
}: TranslationComponentProps) {
    const t = await getTranslations()

    if (!translationKey) return ""

    return (
        <span className={className}>
            {isParse ?
                parse(t(translationKey, values, formats))
            :   t(translationKey, values, formats)}
        </span>
    )
}
