import { MarketplaceProduct } from "@/app/[locale]/(main)/marketplace/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useProfileMarketplaceItemArchiveQuery = (
    args?: UseGetArgs<IPaginatedResponse<MarketplaceProduct>>,
) => {
    const res = useGet<IPaginatedResponse<MarketplaceProduct>>(
        API.PROFILE.MARKETPLACE.ARCHIVE,
        {
            ...args,
        },
    )

    const marketplaceItemArchive = getArray(res.data?.results)

    return { ...res, marketplaceItemArchive }
}
