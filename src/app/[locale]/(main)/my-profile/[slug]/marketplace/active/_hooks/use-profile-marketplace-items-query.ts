import { MarketplaceProduct } from "@/app/[locale]/(main)/marketplace/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useProfileMarketplaceItemsQuery = (
    args?: UseGetArgs<IPaginatedResponse<MarketplaceProduct>>,
) => {
    const res = useGet<IPaginatedResponse<MarketplaceProduct>>(
        API.PROFILE.MARKETPLACE.ITEMS,
        {
            ...args,
        },
    )

    const marketplaceItems = getArray(res.data?.results)

    return { ...res, marketplaceItems }
}
