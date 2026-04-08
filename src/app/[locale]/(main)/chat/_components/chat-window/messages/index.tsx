"use client"

import Group from "@/components/semantic/group"
import { useInfinite } from "@/hooks/react-query/use-infinite"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { useCallback, useEffect, useRef } from "react"
import { usePartnerProfileQuery } from "../../../_hooks/use-partner-profile-query"
import { useChatStore } from "../../../_store/use-chat-store"
import { type MessengerMessage } from "../../../_types/message"
import EmptyMessages from "./empty"
import Message from "./message"

const ChatMessages = () => {
    const { data: partnerProfile } = usePartnerProfileQuery()
    const { chatId, messages, setMessages } = useChatStore()
    const { data } = useProfileQuery()
    const bottomRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const res = useInfinite<MessengerMessage>(API.CHAT.MESSENGER_MESSAGES, {
        params: {
            chat_id: chatId,
        },
        deps: [chatId],
        options: {
            refetchOnWindowFocus: true,
        },
    })

    useEffect(() => {
        if (res.data) {
            const formatted = getArray(res.data)
                .map(({ user, ...rest }) => ({
                    ...rest,
                    user,
                    pending: false,
                    me: user?.user_id === data?.user_id,
                }))
                .sort(
                    (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime(),
                )

            const unique = Array.from(
                new Map(formatted.map((m) => [m?.id, m])).values(),
            )

            setMessages(unique)
        }
        // eslint-disable-next-line
    }, [res.data, data?.user_id])

    useEffect(() => {
        if (messages?.length) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleScroll = useCallback(() => {
        const el = containerRef.current
        if (!el || res.isFetchingNextPage) return

        if (el.scrollTop === 0 && res.hasNextPage) {
            const prevHeight = el.scrollHeight
            res.fetchNextPage().then(() => {
                requestAnimationFrame(() => {
                    if (el) {
                        const newHeight = el.scrollHeight
                        el.scrollTop = newHeight - prevHeight
                    }
                })
            })
        }
    }, [res])

    return (
        <Group
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full h-full flex flex-col gap-2 p-6 overflow-y-auto scrollbar"
        >
            {res.isFetchingNextPage && (
                <div className="w-full flex items-center justify-center py-2">
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-center gap-2"
                    >
                        <span
                            className="inline-block w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            )}

            {messages?.length > 0 ?
                messages.map((message, index) => (
                    <Message
                        key={message.id}
                        item={message}
                        previousMessage={
                            index > 0 ? messages[index - 1] : undefined
                        }
                    />
                ))
            :   <EmptyMessages partnerProfile={partnerProfile} />}

            <div ref={bottomRef} />
        </Group>
    )
}

export default ChatMessages
