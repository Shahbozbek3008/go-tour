import { UseGetArgs, useGet } from "@/hooks/react-query/use-get"
import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { NewsCategories } from "../_types"

export const useNewsCategoriesQuery = (
    args?: UseGetArgs<IPaginatedResponse<NewsCategories>>,
) => {
    const params = useSearch()
    const res = useGet<IPaginatedResponse<NewsCategories>>(
        API.BLOG.CATEGORIES,
        {
            params,
            ...args,
        },
    )
    const newsCategories = getArray(res.data?.results)

    return { ...res, newsCategories }
}
