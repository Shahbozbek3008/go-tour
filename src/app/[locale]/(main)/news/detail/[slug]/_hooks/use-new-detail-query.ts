import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { NewsItemDetail } from "../../../_types"

export const useNewDetailQuery = (args?: UseGetArgs<NewsItemDetail>) => {
    const slug = useSlug()
    const res = useGet<NewsItemDetail>(
        API.BLOG.LIST_SLUG.replace("{slug}", slug),
        args,
    )

    return res
}
