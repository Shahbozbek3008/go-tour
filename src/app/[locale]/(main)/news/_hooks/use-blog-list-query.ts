import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { useGet, UseGetArgs } from "../../../../../hooks/react-query/use-get"
import { NewsItem } from "../_types"

export const useBlogListQuery = (
    args?: UseGetArgs<IPaginatedResponse<NewsItem>>,
) => {
    const params = useSearch()
    const res = useGet<IPaginatedResponse<NewsItem>>(API.BLOG.LIST, {
        params: {
            page_size: 12,
            ...params,
        },
        ...args,
    })
    const newsList = getArray(res.data?.results)

    return { ...res, newsList }
}
