import { AiPersistStateMessage } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import Group from "@/components/semantic/group"
import { cn } from "@/lib/utils/shadcn"

interface MessageProps {
    item: AiPersistStateMessage
    isLastMessage: boolean
}

const Message = ({ item, isLastMessage }: MessageProps) => {
    return (
        <div
            className={cn(
                "flex w-full mb-4",
                item.userMessage && "justify-end",
                item.aiMessage && "justify-start",
            )}
        >
            {item.userMessage && (
                <div className="max-w-[60%] py-3.5 px-5 text-sm bg-primary text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
                    {item.userMessage}
                </div>
            )}
            {item.aiMessage && (
                <div className="relative max-w-[60%] border-gradient !rounded-2xl !rounded-bl-none">
                    <Group className="p-[1px]">
                        <div className="text-foreground text-sm py-3.5 px-5">
                            {isLastMessage ?
                                <TypingAnimation>
                                    {item.aiMessage}
                                </TypingAnimation>
                            :   item.aiMessage}
                        </div>
                    </Group>
                </div>
            )}
        </div>
    )
}

export default Message
