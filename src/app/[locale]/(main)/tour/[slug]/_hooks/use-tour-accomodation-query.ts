import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { AccommodationOption } from "../_types"

export const useTourAccommodationQuery = (
    args?: UseGetArgs<AccommodationOption[]>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<AccommodationOption[]>(
        API.TOUR.ACCOMMODATION.replace("{slug}", slug),
        args,
    )

    const accommodation = res?.data

    return {
        ...res,
        accommodation,
    }
}
