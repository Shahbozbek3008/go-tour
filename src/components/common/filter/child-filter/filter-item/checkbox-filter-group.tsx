"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { ChildFilterItem } from "../../types"

interface CheckboxFilterGroupProps {
    items: ChildFilterItem["items"]
    values: string[]
    onUpdate: (itemKey: string, checked: CheckedState) => void
}

export const CheckboxFilterGroup = ({
    items,
    values,
    onUpdate,
}: CheckboxFilterGroupProps) => {
    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => (
                <label
                    key={item.id}
                    className="flex items-center gap-2 text-sm"
                >
                    <Checkbox
                        className="w-4.5 h-4.5"
                        checked={values.includes(item.id)}
                        onCheckedChange={(checked) =>
                            onUpdate(item.id, checked)
                        }
                    />
                    {item.name || (
                        <ClientTranslate translationKey={item.translationKey} />
                    )}
                </label>
            ))}
        </div>
    )
}
