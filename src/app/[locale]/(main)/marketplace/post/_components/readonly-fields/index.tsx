"use client"

import ReadOnlyField from "@/components/form/read-only-field"
import SelectField from "@/components/form/select-field"
import { useTranslations } from "next-intl"
import { MARKETPLACE_REQUEST_TYPES } from "../../../_constants"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"

const ReadOnlyFields = () => {
    const t = useTranslations()
    const { methods, requestType } = useMarketplaceForm()
    const { watch } = methods

    const fields = [
        {
            label: t("requestType"),
            value: requestType?.title ? t(requestType?.title) : "",
        },
        {
            label: t("category"),
            value: watch("category.full_name"),
        },
    ]

    return (
        <div className="flex flex-col tounded-t-xl md:rounded-xl bg-[#F7FAFC] py-6 clamp-[px,2,12] w-full gap-10">
            <SelectField
                aiGenerated
                methods={methods}
                name="request_type"
                label={t("selectYourPosition")}
                options={MARKETPLACE_REQUEST_TYPES}
                optionLabelKey="title"
                optionValueKey="key"
                getOptionLabel={(opt) => t(opt.title)}
                labelClassName="text-text-900 text-base"
            />

            {requestType && (
                <>
                    {fields.map((v, i) => (
                        <ReadOnlyField
                            key={i}
                            label={v.label}
                            value={v.value}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default ReadOnlyFields
