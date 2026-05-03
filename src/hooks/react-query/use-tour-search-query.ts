import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { useInfinite, UseInfiniteArgs } from "@/hooks/react-query/use-infinite"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Tour } from "@/types/api/tour"
import { IPaginatedResponse } from "@/types/common"

type TourSearchBody = {
    categories?: string[] | null
    minPrice?: number | null
    maxPrice?: number | null
    duration?: string | null
    rate?: string | null
    promotional?: boolean | null
    guaranteed?: boolean | null
    hasReviews?: boolean | null
    languages?: string[] | null
    visaRequired?: boolean | null
    childDiscount?: number | null
    sortBy?: string
    agentId?: string | null
    destinationId?: string | null
    startDate?: string | null
    endDate?: string | null
    destinationIds?: number[] | null
}

export const useTourSearch = (
    args?: Omit<UseGetArgs<IPaginatedResponse<Tour>>, "data"> & {
        data?: TourSearchBody
    },
) => {
    const res = useGet<IPaginatedResponse<Tour>>(
        API.TOUR.SEARCH,
        {
            ...args,
            options: {
                ...args?.options,
                staleTime: 1000 * 60 * 5,
                refetchOnMount: "always",
                refetchOnWindowFocus: true,
            },
        },
        "POST",
    )
    const tours = getArray(res?.data?.tours)
    return { ...res, tours }
}

export const useInfiniteTourSearch = (
    args?: Omit<UseInfiniteArgs<Tour>, "data" | "method"> & {
        data?: TourSearchBody
    },
) => {
    const res = useInfinite<Tour>(API.TOUR.SEARCH, {
        ...args,
        method: "POST",
        cursorKey: "page",
        options: {
            ...args?.options,
            staleTime: 1000 * 60 * 5,
        },
    })

    return res
}
