import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { MarketplaceProduct } from "../../../_types"

export const useMarketplaceSimilarSlugQuery = (
    args?: UseGetArgs<IPaginatedResponse<MarketplaceProduct>>,
) => {
    const slug = useSlug()
    const isPreview = slug === "preview"
    const res = useGet<IPaginatedResponse<MarketplaceProduct>>(
        API.MARKETPLACE.SIMILAR_SLUG.replace("{slug}", slug),
        {
            ...args,
            options: {
                enabled: !isPreview,
                ...args?.options,
            },
        },
    )
    const similarList = getArray(res.data?.results)

    return { ...res, similarList }
}
