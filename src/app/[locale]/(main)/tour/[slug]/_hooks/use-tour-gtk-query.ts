import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { GTKItem } from "../_types"

export const useTourGoodToKnowQuery = (
    args?: UseGetArgs<GTKItem[]>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<GTKItem[]>(
        API.TOUR.GOOD_TO_KNOW.replace("{slug}", slug),
        args,
    )

    const gtk = res?.data

    return {
        ...res,
        gtk,
    }
}
