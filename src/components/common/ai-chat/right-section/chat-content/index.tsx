"use client"

import { Button } from "@/components/ui/button"
import { Scroller } from "@/components/ui/scroller"
import { MUTATION_KEYS } from "@/lib/constants/mutation-keys"
import { cn } from "@/lib/utils/shadcn"
import { useIsMutating } from "@tanstack/react-query"
import { ArrowDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useAi } from "../../_hooks/use-ai"
import ChatMessages from "./chat-messages"
import Empty from "./empty"

export default function ChatContent() {
    const { messages } = useAi()

    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)

    const isMutating = useIsMutating({ mutationKey: [MUTATION_KEYS.AI_CHAT] })

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
        }
    }

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                chatContainerRef.current
            setIsScrolledToBottom(scrollHeight < scrollTop + clientHeight + 20)
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [isMutating])

    return (
        <Scroller
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-y-auto scrollbar pr-4 scroll-smooth"
        >
            <ChatMessages />
            {!messages.length && <Empty />}
            {!isScrolledToBottom && (
                <Button
                    variant={"outline"}
                    onClick={scrollToBottom}
                    size="icon"
                    icon={<ArrowDown size={16} />}
                    className={cn(
                        "absolute bottom-4 left-1/2 -translate-x-1/2 z-10 shadow-lg rounded-full",
                    )}
                    aria-label="Scroll to Bottom"
                />
            )}
        </Scroller>
    )
}
