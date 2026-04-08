import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { IBlog } from "../types"

export const useProfileBlogPostsSlugQuery = (
    slug: string,
    args?: UseGetArgs<IBlog>,
) => {
    const res = useGet<IBlog>(API.PROFILE.BLOG.SLUG.replace("{slug}", slug), {
        ...args,
    })

    return { ...res }
}
