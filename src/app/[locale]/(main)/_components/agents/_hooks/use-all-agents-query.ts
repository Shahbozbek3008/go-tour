import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"

export interface TravelAgencyResponse {
    id: number
    phoneNumber1: string | null
    phoneNumber2: string | null
    address: string
    name: string
    logo: string
    rating: number
    reviewsCount: number
    toursCount: number
}

export const useAllAgentsQuery = (
    args?: UseGetArgs<TravelAgencyResponse[]>,
) => {
    const res = useGet<TravelAgencyResponse[]>(API.AGENTS.ALL, args)

    const allAgents = getArray(res?.data)

    return { ...res, allAgents }
}
