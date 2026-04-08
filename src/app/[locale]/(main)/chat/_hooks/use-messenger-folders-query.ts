import { useGet, type UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { type IPaginatedResponse } from "@/types/common"
import { type MessengerFolder } from "../_types/folder"

export const useMessengerFoldersQuery = (
    args?: UseGetArgs<IPaginatedResponse<MessengerFolder>>,
) => {
    const res = useGet<IPaginatedResponse<MessengerFolder>>(
        API.CHAT.MESSENGER_FOLDERS,
        {
            params: {
                page_size: 100,
            },
            ...args,
        },
    )

    const messengerFolders = getArray(
        res.data?.results?.sort((a, b) => a?.order_number - b?.order_number),
    )

    return {
        ...res,
        messengerFolders,
    }
}
