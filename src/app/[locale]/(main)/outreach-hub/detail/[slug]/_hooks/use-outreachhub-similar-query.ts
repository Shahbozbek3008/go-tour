import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { OutreachhubItem } from "../../../_types"

export const useOutreachHubSimilarSlugQuery = (
    args?: UseGetArgs<IPaginatedResponse<OutreachhubItem>>,
) => {
    const slug = useSlug()
    const res = useGet<IPaginatedResponse<OutreachhubItem>>(
        API.OUT_REACH_HUB.SIMILAR_SLUG.replace("{slug}", slug),
        args,
    )
    const similarList = getArray(res.data?.results)

    return { ...res, similarList }
}
