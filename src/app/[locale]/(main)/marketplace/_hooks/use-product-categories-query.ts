import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { useGet, UseGetArgs } from "../../../../../hooks/react-query/use-get"
import { MarketplaceCategory } from "../_types"

export const useProductCategoriesQuery = (
    args?: UseGetArgs<IPaginatedResponse<MarketplaceCategory>>,
) => {
    const res = useGet<IPaginatedResponse<MarketplaceCategory>>(
        API.MARKETPLACE.HOME_PAGE_PRODUCT_CATEGORIES,
        {
            params: {
                page_size: 100,
            },
            ...args,
        },
    )
    const productCategories = getArray(res.data?.results)

    return { ...res, productCategories }
}
