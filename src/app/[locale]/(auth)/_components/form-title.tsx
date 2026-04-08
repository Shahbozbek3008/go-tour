"use client"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/shadcn"

interface Props {
    text: TranslationKey
    className?: string
}

export default function FormTitle({ text, className }: Props) {
    return (
        <CardTitle className={cn("text-2xl text-center", className)}>
            <ClientTranslate translationKey={text} />
        </CardTitle>
    )
}
