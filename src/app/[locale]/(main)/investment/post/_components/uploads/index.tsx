"use client"

import { UploadTagsControl } from "@/components/common/tags-upload"
import MultiFileUploadField from "@/components/form/multi-file-upload-field"
import MultiImgUploadField from "@/components/form/multi-img-upload-field"
import { useTranslations } from "next-intl"
import { useInvestmentForm } from "../../_hooks/use-investment-form"

export const Uploads = () => {
    const t = useTranslations()
    const { methods } = useInvestmentForm()
    const suggestions = methods.watch("offered_tags")

    return (
        <>
            <MultiFileUploadField
                methods={methods}
                name="documents"
                ndaAccess
            />
            <MultiImgUploadField
                methods={methods}
                name="images"
                alt="investment"
            />
            <UploadTagsControl
                labelClass="text-lg text-text-900 font-medium"
                label={t("tags")}
                control={methods.control}
                name="tags"
                suggestions={suggestions}
            />
        </>
    )
}
