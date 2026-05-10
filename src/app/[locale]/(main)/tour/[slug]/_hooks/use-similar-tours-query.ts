import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { Tour } from "@/types/api/tour"

export const useSimilarToursQuery = (
    args?: UseGetArgs<IPaginatedResponse<Tour>>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)

    const res = useGet<IPaginatedResponse<Tour>>(
        API.TOUR.SIMILAR.replace("{slug}", slug),
        args,
    )

    const similarTours = getArray(res?.data?.tours)

    return {
        ...res,
        similarTours,
    }
}
