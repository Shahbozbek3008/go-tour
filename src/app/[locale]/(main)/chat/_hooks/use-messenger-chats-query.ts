import { useGet, type UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { type IPaginatedResponse } from "@/types/common"
import { type MessengerChat } from "../_types/chat"

export const useMessengerChatsQuery = (
    args?: UseGetArgs<IPaginatedResponse<MessengerChat>>,
) => {
    const res = useGet<IPaginatedResponse<MessengerChat>>(
        API.CHAT.MESSENGER_CHATS,
        {
            options: {
                refetchOnMount: "always",
                refetchOnWindowFocus: true,
            },
            ...args,
        },
    )

    const messengerChats = getArray(res.data?.results)

    return {
        ...res,
        messengerChats,
    }
}
