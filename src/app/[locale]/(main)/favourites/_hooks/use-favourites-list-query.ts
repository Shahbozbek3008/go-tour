import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Tour } from "@/types/api/tour"
import { IPaginatedResponse } from "@/types/common"

export const useFavouritesListQuery = (
    args?: UseGetArgs<IPaginatedResponse<Tour>>,
) => {
    const res = useGet<IPaginatedResponse<Tour>>(API.TOUR.FAVOURITES_LIST, args)
    const favouritesList = getArray(res.data?.tours)

    return { ...res, favouritesList }
}
