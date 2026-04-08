import { IconComment } from "@/assets/icons/chat/comment"
import { Button } from "@/components/ui/button"

const Empty = () => {
    return (
        <div className="w-full h-full chat-gradient flex flex-col items-center justify-center gap-4.5">
            <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center">
                <IconComment />
            </div>
            <Button size="lg" className="rounded-[20px] cursor-pointer">
                Start Conversation
            </Button>
        </div>
    )
}

export default Empty
