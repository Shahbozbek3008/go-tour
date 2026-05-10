import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { ReviewsResponse } from "../_types/reviewers"

export const useTourReviewsQuery = (
    args?: UseGetArgs<ReviewsResponse>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<ReviewsResponse>(
        API.TOUR.REVIEWS.replace("{slug}", slug),
        args,
    )

    const reviews = res?.data

    return {
        ...res,
        reviews,
    }
}
