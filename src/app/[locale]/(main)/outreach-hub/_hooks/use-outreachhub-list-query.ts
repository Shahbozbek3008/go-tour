import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { OutreachhubItem } from "../_types"

export const useOutreachhubListQuery = (
    args?: UseGetArgs<IPaginatedResponse<OutreachhubItem>>,
) => {
    const res = useGet<IPaginatedResponse<OutreachhubItem>>(
        API.OUT_REACH_HUB.LIST,
        { ...args },
    )
    const outreachhubList = getArray(res.data?.results)

    return { ...res, outreachhubList }
}
