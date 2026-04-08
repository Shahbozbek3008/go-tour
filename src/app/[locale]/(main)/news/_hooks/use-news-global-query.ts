import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { NewsGlobal } from "../_types"

export const useNewsGlobalQuery = (
    args?: UseGetArgs<IPaginatedResponse<NewsGlobal>>,
) => {
    const params = useSearch()
    const res = useGet<IPaginatedResponse<NewsGlobal>>(API.BLOG.NEWS, {
        params: {
            page_size: 13,
            ...params,
        },
        ...args,
    })

    const newsGlobal = getArray(res.data?.results)

    return { ...res, newsGlobal }
}
