import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { useFilterStore } from "../_store/use-filter-store"
import { MessengerFolder } from "../_types/folder"
import { useMessengerChatsQuery } from "./use-messenger-chats-query"

export const useMessengerFoldersSlugQuery = (
    args?: UseGetArgs<MessengerFolder>,
) => {
    const { folder } = useFilterStore()
    const res = useGet<MessengerFolder>(
        API.CHAT.MESSENGER_SLUG_FOLDER.replace("{slug}", String(folder)),
        {
            ...args,
            options: {
                enabled: !!folder,
                ...args?.options,
            },
        },
    )
    const { messengerChats } = useMessengerChatsQuery({
        params: {
            folder,
        },
        options: {
            enabled: !!folder,
        },
    })
    const folderChatIds = messengerChats.map((m) => m.id)
    return { ...res, folderChats: messengerChats, folderChatIds, folder }
}
