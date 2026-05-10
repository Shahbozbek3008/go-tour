import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Tour } from "@/types/api/tour"
import { IPaginatedResponse } from "@/types/common"

export const useTourTopSellingQuery = (
    args?: UseGetArgs<IPaginatedResponse<Tour>>,
) => {
    const res = useGet<IPaginatedResponse<Tour>>(API.TOUR.TOP_SELLING, {
        options: {
            enabled: args?.options?.enabled,
        },
    })

    const topSellingTours = getArray(res?.data?.tours)

    return { ...res, topSellingTours }
}
