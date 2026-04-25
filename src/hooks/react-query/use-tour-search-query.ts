import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
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
    languages?: string[] | null
    sortBy?: string
    destinationId?: string | null
    startDate?: string | null
    endDate?: string | null
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
