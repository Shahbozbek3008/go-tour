import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { useGet, UseGetArgs } from "../../../../../hooks/react-query/use-get"
import { MarketplaceProduct } from "../_types"

export const useMarketplaceListQuery = (
    args?: UseGetArgs<IPaginatedResponse<MarketplaceProduct>>,
) => {
    const params = useSearch()
    const res = useGet<IPaginatedResponse<MarketplaceProduct>>(
        API.MARKETPLACE.LIST,
        {
            params: {
                page_size: 12,
                ...params,
            },
            ...args,
        },
    )
    const marketplaceList = getArray(res.data?.results)

    return { ...res, marketplaceList }
}
