import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { IBlog } from "../../blogs/types"

export const useProfileBookmarkBlogQuery = (
    args?: UseGetArgs<IPaginatedResponse<IBlog>>,
) => {
    const res = useGet<IPaginatedResponse<IBlog>>(API.PROFILE.BOOKMARK.BLOG, {
        ...args,
    })

    const bookmarkBlog = getArray(res.data?.results)

    return { ...res, bookmarkBlog }
}
