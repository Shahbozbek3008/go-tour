import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { useCallback, useEffect, useRef, useState } from "react"
import { WebSocketEventsEnum } from "../_constants/websocket.events"
import { useChatStore } from "../_store/use-chat-store"
import { UIMessage } from "../_types/message"

const WS_BASE_URL = "wss://api-inextlynk.upgrow.uz/ws/chat/"

export const useChatSocket = () => {
    const { chatId, addMessage, updateOrAddMessage } = useChatStore()
    const wsRef = useRef<WebSocket | null>(null)
    const [connected, setConnected] = useState(false)
    const [error, setError] = useState<Event | null>(null)
    const { data: profile } = useProfileQuery()

    useEffect(() => {
        if (!chatId) {
            console.warn("Invalid or missing chatId for WebSocket")
            return
        }
        const token = ClientTokenService.getAccessToken()
        if (!token) {
            console.warn("Missing auth token for WebSocket")
            return
        }

        const wsUrl = `${WS_BASE_URL}${chatId}/?token=${token}`
        const ws = new WebSocket(wsUrl)
        wsRef.current = ws

        ws.onopen = () => {
            console.log("WebSocket connected")
            setConnected(true)
        }

        ws.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data)
                if (
                    data?.type === WebSocketEventsEnum.message_created &&
                    data?.message
                ) {
                    const msg: UIMessage = {
                        chat_id: data.message?.chat_id,
                        id: data.message?.id,
                        text: data.message?.text,
                        created_at: data.message?.created_at,
                        me: data?.message?.user_id === profile?.user_id,
                        user_id: data?.message?.user_id,
                        updated_at: data?.message?.updated_at,
                        pending: false,
                        files: data.message?.files ?? [],
                        user: undefined,
                    }
                    if (data?.message?.user_id !== profile?.user_id) {
                        updateOrAddMessage(msg)
                    }
                }
            } catch (err) {
                console.error("Failed to parse WS message", err)
            }
        }

        ws.onclose = () => {
            console.log("WebSocket disconnected")
            setConnected(false)
        }

        ws.onerror = (ev) => {
            setError(ev)
        }

        return () => {
            ws.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId])

    const sendMessage = useCallback(
        (text: string) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
                console.warn("WebSocket is not connected")
                return
            }

            const tempId = Date.now().toString()

            const msg: UIMessage = {
                chat_id: chatId!,
                id: tempId,
                text,
                created_at: new Date().toISOString(),
                me: true,
                user_id: profile?.user_id ?? "",
                updated_at: new Date().toISOString(),
                pending: true,
            }

            addMessage(msg)

            wsRef.current.send(JSON.stringify({ text }))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chatId, profile?.user_id],
    )

    const sendFileMessage = useCallback(
        (fileUrl: string) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
                console.warn("WebSocket is not connected")
                return
            }

            const tempId = Date.now().toString()

            const msg: UIMessage = {
                chat_id: chatId!,
                id: tempId,
                text: "",
                created_at: new Date().toISOString(),
                me: true,
                user_id: profile?.user_id ?? "",
                updated_at: new Date().toISOString(),
                pending: true,
            }

            addMessage({ ...msg, files: [{ id: tempId, file_url: fileUrl }] })

            wsRef.current.send(JSON.stringify({ files: [fileUrl] }))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chatId, profile?.user_id],
    )

    return { sendMessage, connected, error, sendFileMessage }
}
