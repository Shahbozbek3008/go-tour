import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { InclusionsResponse } from "../_types"

export const useTourIncludedQuery = (
    args?: UseGetArgs<InclusionsResponse>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<InclusionsResponse>(
        API.TOUR.INCLUDED.replace("{slug}", slug),
        args,
    )

    const included = res?.data

    return {
        ...res,
        included,
    }
}
