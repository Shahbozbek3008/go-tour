import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { IBlog } from "../types"

export const useProfileBlogPostsQuery = (
    args?: UseGetArgs<IPaginatedResponse<IBlog>>,
) => {
    const res = useGet<IPaginatedResponse<IBlog>>(API.PROFILE.BLOG.INDEX, {
        ...args,
    })

    const blogPosts = getArray(res.data?.results)

    return { ...res, blogPosts }
}
