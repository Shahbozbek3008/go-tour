"use client"

import { useAi } from "../../../_hooks/use-ai"
import Message from "./message"

const ChatMessages = () => {
    const { messages } = useAi()

    return (
        <>
            {messages.map((message, i) => {
                if (!message.aiMessage && !message.userMessage) return
                return (
                    <Message
                        key={message.id || message.created_at}
                        item={message}
                        isLastMessage={messages.length === i + 1}
                    />
                )
            })}
        </>
    )
}

export default ChatMessages
