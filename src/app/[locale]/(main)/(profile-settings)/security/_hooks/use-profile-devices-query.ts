import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { IProfileDevices } from "../types"

export const useProfileDevicesQuery = (
    args?: UseGetArgs<IPaginatedResponse<IProfileDevices>>,
) => {
    const res = useGet<IPaginatedResponse<IProfileDevices>>(
        API.PROFILE.DEVICES,
        {
            ...args,
        },
    )

    const devices = getArray(res.data?.results)

    return { ...res, devices }
}
