import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Destination } from "@/types/api/destination"

export const useAllDestinationsQuery = (args?: UseGetArgs<Destination[]>) => {
    const res = useGet<Destination[]>(API.DESTINATION.ALL_DESTINATIONS, args)

    const allDestinations = getArray(res?.data)

    return { ...res, allDestinations }
}
