import { useInfinite, UseInfiniteArgs } from "@/hooks/react-query/use-infinite"
import { API } from "@/lib/constants/api-endpoints"
import { MessengerChat } from "../_types/chat"

export const useInfiniteMessengerChatsQuery = (
    args?: UseInfiniteArgs<MessengerChat>,
) => {
    const { data: infiniteMessengerChats, ...other } =
        useInfinite<MessengerChat>(API.CHAT.MESSENGER_CHATS, args)

    return { ...other, infiniteMessengerChats }
}
