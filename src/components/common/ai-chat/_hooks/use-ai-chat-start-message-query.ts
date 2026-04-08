import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { AiChatStartMessage } from "../_types"
import { useAiPersist } from "./use-ai-persist"

export const useAiChatStartMessageQuery = (
    args?: UseGetArgs<AiChatStartMessage>,
) => {
    const { data, ...res } = useGet<AiChatStartMessage>(
        API.EXTRA.AI_CHAT_START_MESSAGE,
        args,
    )
    const { chatType } = useAiPersist()

    function getStartMessage() {
        switch (chatType) {
            case "home":
                return data?.home_page
            case "register":
                return data?.registration
            case "marketplace_add":
                return data?.marketplace_create
            case "investment_add":
                return data?.investment_create
            case "outreach_hub_add":
                return data?.outreach_hub_create
            case "marketplace_filter":
                return data?.marketplace_filter
            case "investment_filter":
                return data?.investment_filter
            case "outreach_hub_filter":
                return data?.outreach_hub_filter
            default:
                return ""
        }
    }

    return { ...res, data, startMessage: getStartMessage() }
}
