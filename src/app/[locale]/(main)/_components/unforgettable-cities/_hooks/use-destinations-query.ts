import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"

// ─── Domain Types ────────────────────────────────────────────────────────────

export type Destination = {
    id: number
    name: string
    country: string
    image: string | null
    rating: number
    toursCount: number
    description: string | null
    region?: string
    featured?: boolean
}

// Shape returned by the hook
export type DestinationsResponse = {
    featured: Destination | null
    popular: Destination[]
}
export const useDestinationsQuery = (
    args?: UseGetArgs<DestinationsResponse>,
) => {
    const res = useGet(API.DESTINATION.HOME, args)

    const featured = res?.data?.featured
    const popular = getArray(res?.data?.popular)

    return { ...res, featured, popular }
}
