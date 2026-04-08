import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useAiModal } from "./use-ai-modal"
import { AiChatType, useAiPersist } from "./use-ai-persist"

export const useAi = () => {
    const { redirectToSignIn } = useNoneAuthorized()
    const { openModal } = useAiModal()
    const { setAiState, chatType, chats } = useAiPersist()

    const messages = chats[chatType].messages

    function openAiModal(chatType: AiChatType) {
        redirectToSignIn(() => {
            setAiState({
                chatType,
            })
            openModal()
        })
    }

    return { openAiModal, messages }
}
