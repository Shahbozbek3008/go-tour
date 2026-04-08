"use client"

import { TranslationKey } from "@/components/common/translation/types"
import NumberField from "@/components/form/number-field"
import SelectField from "@/components/form/select-field"
import Group from "@/components/semantic/group"
import { CURRENCIES } from "@/lib/constants/currency"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { useInvestmentForm } from "../../_hooks/use-investment-form"

export default function PriceField() {
    const t = useTranslations()
    const { methods, requestType } = useInvestmentForm()
    if (!requestType) return
    return (
        <div className="col-span-full flex gap-4">
            <Group className="grid grid-cols-2 gap-4 items-end w-full">
                <NumberField
                    methods={methods}
                    className="border-gradient text-gradient-2"
                    labelClassName="text-text-900 text-lg font-medium"
                    name="start_price"
                    label={t(requestType.priceField.label) as TranslationKey}
                    wrapperClassName={cn(
                        !requestType.priceField.end_price && "col-span-full",
                    )}
                />
                {requestType.priceField.end_price && (
                    <NumberField
                        labelClassName="text-text-900 text-lg font-medium"
                        className="border-gradient text-gradient-2"
                        methods={methods}
                        name="end_price"
                    />
                )}
            </Group>
            <SelectField
                methods={methods}
                labelClassName="text-text-900 text-lg font-medium"
                name="currency"
                label={t("currency")}
                options={CURRENCIES}
                optionLabelKey="iso"
                wrapperClassName="max-w-52"
                getOptionLabel={(opt) => t(opt.name)}
            />
        </div>
    )
}
