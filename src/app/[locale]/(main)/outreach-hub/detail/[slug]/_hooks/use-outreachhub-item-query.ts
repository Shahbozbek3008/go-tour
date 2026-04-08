import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { OutreachhubItemDetail } from "../../../_types"
import { useOutreachHubPersist } from "../../../post/_hooks/use-outreach-hub-persist"

export const useOutreachhubItemQuery = (
    args?: UseGetArgs<OutreachhubItemDetail>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const { previewData, formData } = useOutreachHubPersist()
    const isPreview = slug === "preview"
    const res = useGet<OutreachhubItemDetail>(
        API.OUT_REACH_HUB.LIST_SLUG.replace("{slug}", slug),
        {
            ...args,
            options: {
                enabled: !isPreview,
                ...args?.options,
            },
        },
    )

    return {
        ...res,
        data: isPreview ? previewData : res.data,
        formData,
        isPreview,
    }
}
