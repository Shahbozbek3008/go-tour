"use client"

import { useGet } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { useChatStore } from "../../../_store/use-chat-store"
import { type ChatSlug } from "../../../_types/chat.slug"
import MessageRequestPrompt from "./message-request"
import SendMessage from "./send-message"
import TimeOffer from "./time-offer"

const Toolbar = () => {
    const { chatId } = useChatStore()
    const { data, refetch } = useGet<ChatSlug>(
        API.CHAT.MESSENGER_SLUG_CHATS.replace("{slug}", String(chatId)),
    )

    const renderContent = () => {
        if (data?.action_required) {
            return <MessageRequestPrompt />
        }
        if (data?.can_send_message) {
            return <SendMessage />
        }
        if (data?.time_to_write) {
            return (
                <TimeOffer
                    onExpire={refetch}
                    time_to_write={data?.time_to_write}
                />
            )
        }
        return null
    }

    return <div className="w-full px-6 pb-6">{renderContent()}</div>
}

export default Toolbar
