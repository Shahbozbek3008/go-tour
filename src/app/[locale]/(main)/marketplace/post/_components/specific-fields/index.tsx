"use client"

import { TranslationKey } from "@/components/common/translation/types"
import ControlledDatePicker from "@/components/form/controlled-datepicker"
import SelectField from "@/components/form/select-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { useTranslations } from "next-intl"
import { MarketplaceProductField } from "../../../_constants"
import { MarketplaceProductDetail } from "../../../_types"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"
import PriceFields from "./price-fields"

export default function SpecificFields() {
    const t = useTranslations()
    const { methods, requestType } = useMarketplaceForm()

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 rounded-b-xl md:rounded-xl bg-[#F7FAFC] py-6 clamp-[px,2,12] w-full">
            <PriceFields />
            {Object.entries(requestType?.specific_fields || {}).map(
                // @ts-expect-error sdf
                ([key, field]: [
                    keyof MarketplaceProductDetail,
                    MarketplaceProductField,
                ]) => {
                    if (field.fieldType === "select") {
                        return (
                            <SelectField
                                key={key}
                                methods={methods}
                                name={key}
                                label={t(field.label as TranslationKey)}
                                wrapperClassName={field.className}
                                options={field.options}
                                getOptionLabel={(opt) =>
                                    t(opt.name as TranslationKey)
                                }
                                labelClassName="text-base text-text-900"
                            />
                        )
                    }
                    if (field.fieldType === "date") {
                        return (
                            <ControlledDatePicker
                                key={key}
                                methods={methods}
                                name={key}
                                label={t(field.label as TranslationKey)}
                                wrapperClassName={field.className}
                            />
                        )
                    }
                    return (
                        <UncontrolledInput
                            key={key}
                            methods={methods}
                            name={key}
                            label={t(field.label as TranslationKey)}
                            wrapperClassName={field.className}
                            labelClassName="text-base text-text-900"
                            className="border-gradient text-gradient-2"
                        />
                    )
                },
            )}
        </div>
    )
}
