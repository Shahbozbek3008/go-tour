"use client"

import { UploadTagsControl } from "@/components/common/tags-upload"
import MultiFileUploadField from "@/components/form/multi-file-upload-field"
import MultiImgUploadField from "@/components/form/multi-img-upload-field"
import MultiVideoUploadField from "@/components/form/multi-video-upload-field.tsx"
import { useTranslations } from "next-intl"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"

export const Upload = () => {
    const t = useTranslations()
    const { methods } = useMarketplaceForm()
    const { control, watch } = methods
    const suggestions = watch("offered_tags")

    return (
        <div className="px-0 flex flex-col clamp-[mt,4,10] clamp-[gap,4,10]">
            <UploadTagsControl
                control={control}
                name="tags"
                label={t("tags")}
                placeholder={"#" + t("agriTech")}
                suggestions={suggestions}
                maxTags={12}
            />
            <MultiImgUploadField
                methods={methods}
                name="images"
                alt="marketplace product image"
            />
            <MultiVideoUploadField methods={methods} name="videos" />
            <MultiFileUploadField methods={methods} name="documents" />
        </div>
    )
}
