import { useGet } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"

export interface Destination {
    id: number
    nameUz: string
    nameRu: string
    imageUrl: string | null
    sortOrder: number
    countryId: number
    countryName: string
}

export interface DestinationWithTourCount {
    destination: Destination
    tourCount: number
}

export const useTourShortListQuery = () => {
    const res = useGet<DestinationWithTourCount[]>(API.TOUR.SHORT_DATA)
    const tourShortList = getArray(res?.data)

    return { ...res, tourShortList }
}
