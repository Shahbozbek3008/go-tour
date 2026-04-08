"use client"

import { Button } from "@/components/ui/button"
import { SquarePenIcon } from "lucide-react"
import { useAiPersist } from "../../_hooks/use-ai-persist"

const ChatList = () => {
    const { setNewChat, chatType } = useAiPersist()

    return (
        <div className="flex flex-col gap-6">
            <Button
                onClick={() => {
                    setNewChat(chatType)
                }}
                size="sm"
                variant="ghost"
                className="text-gray-800 justify-start"
            >
                <SquarePenIcon size={20} />
                New chat
            </Button>

            {/* <div className="flex flex-col gap-4">
                {CHAT_LIST.map((group) => (
                    <div key={group.id} className="flex flex-col">
                        <span className="text-xs text-(--gray-700) capitalize mb-2">
                            {group.date}
                        </span>
                        {group.chats.map((chat) => (
                            <span
                                key={chat.id}
                                className={cn(
                                    "truncate text-sm pl-3 py-1.5 cursor-pointer",
                                )}
                            >
                                {chat.title}
                            </span>
                        ))}
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default ChatList
