import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"

const ChatEmpty = () => {
    return (
        <div className={cn("h-full w-full  flex items-center justify-center")}>
            <p className="text-sm  text-(--text-700)">
                <ClientTranslate translationKey="thereAreNoMessages" />
            </p>
        </div>
    )
}

export default ChatEmpty
