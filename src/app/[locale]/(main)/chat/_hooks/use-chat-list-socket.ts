import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { useEffect, useRef } from "react"
import { WebSocketEventsEnum } from "../_constants/websocket.events"
import { useChatListStore } from "../_store/use-chat-list-store"

const WS_CHAT_LIST_URL = "wss://api-inextlynk.upgrow.uz/ws/chat-list/"

export const useChatListSocket = () => {
    const wsRef = useRef<WebSocket | null>(null)
    const { updateChatPosition } = useChatListStore()

    useEffect(() => {
        const token = ClientTokenService.getAccessToken()
        if (!token) return

        const ws = new WebSocket(`${WS_CHAT_LIST_URL}?token=${token}`)
        wsRef.current = ws

        ws.onopen = () => {
            console.log("Chat list WebSocket connected")
        }

        ws.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data)

                if (data?.type === WebSocketEventsEnum.chat_list_update) {
                    updateChatPosition({
                        chatId: data.chat_id,
                        lastMessage: data.last_message,
                        unreadCount: data.unread_count,
                    })
                }
            } catch (err) {
                console.error("Failed to parse chat list message", err)
            }
        }

        ws.onclose = () => {
            console.log("Chat list WebSocket disconnected")
        }

        return () => {
            ws.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {}
}
