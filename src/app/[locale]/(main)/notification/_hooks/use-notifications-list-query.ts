import { useGet, type UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { type IPaginatedResponse } from "@/types/common"
import { Notification } from "../_types/notification"

export const useNotificationsListQuery = (
    args?: UseGetArgs<IPaginatedResponse<Notification>>,
) => {
    const res = useGet<IPaginatedResponse<Notification>>(
        API.NOTIFICATIONS.EXTRA_NOTIFICATIONS,
        {
            ...args,
        },
    )

    const notificationsList = getArray(res.data?.results)

    return {
        ...res,
        notificationsList,
    }
}
