"use client"

import { TranslationKey } from "@/components/common/translation/types"
import CreatableSelectField from "@/components/form/creatable-select-field"
import ReadOnlyField from "@/components/form/read-only-field"
import SelectField from "@/components/form/select-field"
import TextEditorField from "@/components/form/text-editor-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { INVESTMENT_REQUEST_TYPES, InvestmentField } from "../../../_constants"
import { InvestmentItemDetail } from "../../../_types"
import { useInvestmentForm } from "../../_hooks/use-investment-form"
import PriceField from "./price-field"

export default function Main() {
    const t = useTranslations()
    const { methods, requestType } = useInvestmentForm()

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 rounded-b-xl md:rounded-xl bg-[#F7FAFC] py-6 clamp-[px,2,12] w-full">
            <SelectField
                aiGenerated
                wrapperClassName="col-span-full"
                methods={methods}
                name="request_type"
                options={INVESTMENT_REQUEST_TYPES}
                optionValueKey="key"
                label={t("selectYourPosition")}
                labelClassName="text-text-900 text-lg font-medium"
                getOptionLabel={(opt) => t(opt.name)}
            />
            <ReadOnlyField
                label={t("requestType")}
                value={requestType?.key ? t(requestType?.name) : ""}
                className="col-span-full"
            />
            {requestType &&
                Object.entries(requestType?.specific_fields || {}).map(
                    // @ts-expect-error asdf
                    ([key, field]: [
                        keyof InvestmentItemDetail,
                        InvestmentField,
                    ]) => {
                        if (field.fieldType === "creatable_select") {
                            return (
                                <CreatableSelectField
                                    key={key}
                                    methods={methods}
                                    name={key}
                                    label={t(field.label as TranslationKey)}
                                    labelClassName="text-text-900 text-lg font-medium"
                                    wrapperClassName={cn(field.className)}
                                    options={
                                        field.options?.map((o) => ({
                                            id: t(o.name),
                                            name: t(o.name),
                                        })) || []
                                    }
                                />
                            )
                        }
                        if (field.fieldType === "text_editor") {
                            return (
                                <TextEditorField
                                    key={key}
                                    methods={methods}
                                    className="border-gradient text-gradient-2"
                                    labelClassName="text-text-900 text-lg font-medium"
                                    name={key}
                                    label={t(field.label as TranslationKey)}
                                    wrapperClassName={field.className}
                                />
                            )
                        }
                        if (key === "start_price") {
                            return <PriceField key={key} />
                        }
                        return (
                            <UncontrolledInput
                                labelClassName="text-text-900 text-lg font-medium"
                                key={key}
                                methods={methods}
                                className="border-gradient text-gradient-2"
                                name={key}
                                label={t(field.label as TranslationKey)}
                                wrapperClassName={field.className}
                            />
                        )
                    },
                )}
        </div>
    )
}
