import { useGet, type UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { type IPaginatedResponse } from "@/types/common"
import { type FolderIcon } from "../_types/folder"

export const useMessengerFolderIconsQuery = (
    args?: UseGetArgs<IPaginatedResponse<FolderIcon>>,
) => {
    const res = useGet<IPaginatedResponse<FolderIcon>>(
        API.CHAT.MESSENGER_FOLDER_ICONS,
        {
            params: {
                page_size: 100,
            },
            ...args,
        },
    )

    const iconsList = getArray(res.data?.results)

    return {
        ...res,
        iconsList,
    }
}
