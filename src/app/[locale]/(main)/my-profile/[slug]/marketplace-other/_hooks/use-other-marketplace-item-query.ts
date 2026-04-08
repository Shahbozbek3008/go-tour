import { MarketplaceProduct } from "@/app/[locale]/(main)/marketplace/_types"
import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useOtherMarketplaceItemQuery = (
    args?: UseGetArgs<IPaginatedResponse<MarketplaceProduct>>,
) => {
    const slug = useSlug()
    const res = useGet<IPaginatedResponse<MarketplaceProduct>>(
        API.PROFILE.MARKETPLACE.OTHER_USER_ID.replace("{user_id}", slug),
        {
            ...args,
        },
    )

    const otherMarketplaceItems = getArray(res.data?.results)

    return { ...res, otherMarketplaceItems }
}
