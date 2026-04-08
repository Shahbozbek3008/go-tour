import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { useChatStore } from "../_store/use-chat-store"
import { Partner } from "../_types/user"

export const usePartnerProfileQuery = (args?: UseGetArgs<Partner>) => {
    const { chatId } = useChatStore()

    const res = useGet<Partner>(
        API.CHAT.MESSENGER_SLUG_PARTNER.replace("{slug}", String(chatId)),
        args,
    )

    return res
}
