import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { TravelAgencyResponse } from "@/types/api/agents"

export const useAllAgentsQuery = (
    args?: UseGetArgs<TravelAgencyResponse[]>,
) => {
    const res = useGet<TravelAgencyResponse[]>(API.AGENTS.ALL, args)

    const allAgents = getArray(res?.data)

    return { ...res, allAgents }
}
