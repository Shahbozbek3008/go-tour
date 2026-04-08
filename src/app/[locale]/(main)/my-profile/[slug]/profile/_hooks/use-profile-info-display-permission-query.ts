import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { IProfileDisplayPermission } from "../types"

export const useProfileInfoDisplayPermissionQuery = (
    args?: UseGetArgs<IProfileDisplayPermission>,
) => {
    const res = useGet<IProfileDisplayPermission>(
        API.PROFILE.INFO.DISPLAY_PERMISSION,
        { ...args },
    )

    return { ...res }
}
