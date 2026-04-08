"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"
import { ChildFilterItem } from "../../types"

interface RadioFilterGroupProps {
    items: ChildFilterItem["items"]
    value?: string
    onUpdate: (value: string) => void
}

export const RadioFilterGroup = ({
    items,
    value,
    onUpdate,
}: RadioFilterGroupProps) => {
    const { isArabic } = useLanguage()

    return (
        <RadioGroup
            value={value ?? ""}
            onValueChange={onUpdate}
            className="flex flex-col gap-3"
        >
            {items.map((item) => (
                <label
                    key={item.id}
                    className={cn(
                        "flex items-center gap-2 text-sm",
                        isArabic && "flex-row-reverse",
                    )}
                >
                    <RadioGroupItem
                        value={item.id}
                        id={item.id}
                        className="w-4.5 h-4.5"
                    />
                    {item.name || (
                        <ClientTranslate translationKey={item.translationKey} />
                    )}
                </label>
            ))}
        </RadioGroup>
    )
}
