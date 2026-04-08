"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/react-query/use-get"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { useState } from "react"
import { useChatStore } from "../../../../_store/use-chat-store"
import { ChatSlug } from "../../../../_types/chat.slug"

type ActionTypes = "block" | "accept" | "clear"

const MessageRequestPrompt = () => {
    const { chatId } = useChatStore()
    const { data } = useGet<ChatSlug>(
        API.CHAT.MESSENGER_SLUG_CHATS.replace("{slug}", String(chatId)),
    )
    const { patch, isPending } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const [activeAction, setActiveAction] = useState<ActionTypes | null>(null)

    const actionEndpoints: Record<ActionTypes, string> = {
        accept: API.CHAT.MESSENGER_CHATS_SLUG_ACCEPT,
        block: API.CHAT.MESSENGER_CHATS_SLUG_BLOCK,
        clear: API.CHAT.MESSENGER_CHATS_SLUG_CLEAR,
    }

    const handleAction = (action: ActionTypes) => {
        const endpoint = actionEndpoints[action]?.replace(
            "{slug}",
            String(chatId),
        )
        if (!endpoint) return

        setActiveAction(action)

        const invalidateKeys = [
            API.CHAT.MESSENGER_SLUG_CHATS.replace("{slug}", String(chatId)),
            ...(action === "clear" ? [API.CHAT.MESSENGER_MESSAGES] : []),
        ]

        patch(
            endpoint,
            {},
            {
                onSuccess: () => invalidateByExactMatch(invalidateKeys),
                onSettled: () => setActiveAction(null),
            },
        )
    }

    return (
        <Group className="flex flex-col gap-2">
            <div className="flex flex-col items-center rounded-lg bg-white w-full py-6">
                <h4 className="text-xl text-(--text-800)">
                    <ClientTranslate translationKey="youHaveReceivedMessage" />{" "}
                    <span className="text-primary">
                        {data?.other_user.first_name}
                    </span>
                </h4>
                <p className="text-(--text-300) text-base">
                    <ClientTranslate translationKey="acceptingWillAllowMessage" />
                </p>
            </div>

            <div className="w-full flex items-center justify-between py-2 px-12 bg-white rounded-lg">
                <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => handleAction("block")}
                    isLoading={isPending && activeAction === "block"}
                    className="!p-0 hover:bg-transparent text-(--error-o-main) hover:text-(--error-o-main) text-xl"
                >
                    <ClientTranslate translationKey="block" />
                </Button>
                <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => handleAction("clear")}
                    isLoading={isPending && activeAction === "clear"}
                    className="!p-0 hover:bg-transparent text-(--error-o-main) hover:text-(--error-o-main) text-xl"
                >
                    <ClientTranslate translationKey="delete" />
                </Button>
                <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => handleAction("accept")}
                    isLoading={isPending && activeAction === "accept"}
                    className="!p-0 hover:bg-transparent text-primary hover:text-primary text-xl"
                >
                    <ClientTranslate translationKey="accept" />
                </Button>
            </div>
        </Group>
    )
}

export default MessageRequestPrompt
