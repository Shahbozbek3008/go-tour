import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { IMyNetwork } from "../_constants/types"

export const useConnectionsQuery = (
    args?: UseGetArgs<IPaginatedResponse<IMyNetwork>>,
) => {
    const res = useGet<IPaginatedResponse<IMyNetwork>>(
        API.PROFILE.NETWORK.CONNECTIONS,
        {
            ...args,
        },
    )

    const connections = getArray(res.data?.results)

    return { ...res, connections }
}
