"use client"

import { TranslationKey } from "@/components/common/translation/types"
import TextEditorField from "@/components/form/text-editor-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { useTranslations } from "next-intl"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"

const Description = () => {
    const t = useTranslations()
    const { methods, requestType } = useMarketplaceForm()

    return (
        <div className="flex flex-col md:rounded-xl bg-[#F7FAFC] py-6 clamp-[px,2,12] w-full gap-10">
            <UncontrolledInput
                methods={methods}
                name="name"
                label={
                    requestType?.nameField ?
                        t(requestType?.nameField as TranslationKey)
                    :   t("name")
                }
                className="border-gradient text-gradient-2"
                labelClassName="text-text-900 text-base"
            />
            <TextEditorField
                methods={methods}
                name="description"
                label={t("description")}
                className="border-gradient text-gradient-2"
                labelClassName="text-text-900 text-base"
            />
        </div>
    )
}

export default Description
