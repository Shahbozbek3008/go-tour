import { UploadTagsControl } from "@/components/common/tags-upload"
import MultiFileUploadField from "@/components/form/multi-file-upload-field"
import MultiImgUploadField from "@/components/form/multi-img-upload-field"
import MultiVideoUploadField from "@/components/form/multi-video-upload-field.tsx"
import { useTranslations } from "next-intl"
import { useOutreachHubItemForm } from "../_hooks/use-outreach-hub-item-form"

export default function Uploads() {
    const t = useTranslations()
    const { methods } = useOutreachHubItemForm()
    const suggestions = methods.watch("offered_tags")
    return (
        <>
            <MultiFileUploadField methods={methods} name="documents" required />
            <MultiImgUploadField
                methods={methods}
                name="images"
                alt="outreach hub image"
            />
            <MultiVideoUploadField methods={methods} name="videos" />
            <UploadTagsControl
                control={methods.control}
                name="tags"
                label={t("tags")}
                placeholder={"#" + t("agriTech")}
                suggestions={suggestions}
                maxTags={12}
            />
        </>
    )
}
