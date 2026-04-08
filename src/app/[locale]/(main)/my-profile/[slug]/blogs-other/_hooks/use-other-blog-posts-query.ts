import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { IBlog } from "../../blogs/types"

export const useOtherBlogPostsQuery = (
    args?: UseGetArgs<IPaginatedResponse<IBlog>>,
) => {
    const slug = useSlug()
    const res = useGet<IPaginatedResponse<IBlog>>(
        API.PROFILE.BLOG.OTHER_USER_ID.replace("{user_id}", slug),
        {
            ...args,
        },
    )

    const otherBlogPosts = getArray(res.data?.results)

    return { ...res, otherBlogPosts }
}
