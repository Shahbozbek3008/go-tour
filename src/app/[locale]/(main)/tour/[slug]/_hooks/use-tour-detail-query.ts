import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { TourDetailResponse } from "../_types"

export const useTourDetailQuery = (
    args?: UseGetArgs<TourDetailResponse>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<TourDetailResponse>(
        API.TOUR.TOUR_SLUG.replace("{slug}", slug),
        args,
    )

    const detail = res?.data

    return {
        ...res,
        detail,
    }
}
