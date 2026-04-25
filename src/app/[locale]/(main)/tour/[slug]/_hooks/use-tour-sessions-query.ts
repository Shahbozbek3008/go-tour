import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"

export const useTourSessionsQuery = (
    args?: UseGetArgs<any>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<any>(
        API.TOUR.TOUR_SESSIONS.replace("{slug}", slug),
        args,
    )

    const sessions = res?.data

    return {
        ...res,
        sessions,
    }
}
