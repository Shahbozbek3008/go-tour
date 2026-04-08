import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { MarketplaceProductDetail } from "../../../_types"
import { useMarketplacePersist } from "../../../post/_hooks/use-marketplace-persist"

export const useMarketplaceProductQuery = (
    args?: UseGetArgs<MarketplaceProductDetail>,
    slugId?: string, // for using outside SlugProvider
) => {
    const slug = useSlug(slugId)
    const { previewData, formData } = useMarketplacePersist()
    const isPreview = slug === "preview"
    const res = useGet<MarketplaceProductDetail>(
        API.MARKETPLACE.LIST_SLUG.replace("{slug}", slug),
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
