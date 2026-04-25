import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { TourDay } from "../_types"

export const useTourProgramQuery = (
    args?: UseGetArgs<TourDay[]>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<TourDay[]>(
        API.TOUR.PROGRAM.replace("{slug}", slug),
        args,
    )

    const program = res?.data

    return {
        ...res,
        program,
    }
}
