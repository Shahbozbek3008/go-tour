import { IconAlert } from "@/assets/icons/alert"
import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useChatStore } from "../../../../_store/use-chat-store"

export const ClearChat = () => {
    const { chatId, clearMessages } = useChatStore()
    const { patch, isPending } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const { closeModal } = useModal(MODAL_KEYS.CLEAR_CHAT)

    const clearChat = () => {
        patch(
            API.CHAT.MESSENGER_CHATS_SLUG_CLEAR.replace(
                "{slug}",
                String(chatId),
            ),
            {},
            {
                onSuccess: () => {
                    closeModal()
                    clearMessages()
                    invalidateByExactMatch([
                        API.CHAT.MESSENGER_MESSAGES,
                        API.CHAT.MESSENGER_SLUG_CHATS.replace(
                            "{slug}",
                            String(chatId),
                        ),
                    ])
                },
            },
        )
    }

    return (
        <Modal modalKey={MODAL_KEYS.CLEAR_CHAT} className="!w-[500px]">
            <div className="flex flex-col items-center gap-8">
                <IconAlert />
                <h3 className="text-(--error-500) text-2xl text-center">
                    <ClientTranslate translationKey="areYouClearChat" />
                </h3>
                <p className="text-(--text-900) text-xl text-center">
                    <ClientTranslate translationKey="thisActionClearedDesc" />
                </p>
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <Button
                        className="w-full bg-primary-8-lighter hover:bg-primary-16-right text-primary"
                        onClick={closeModal}
                    >
                        <ClientTranslate translationKey="no" />
                    </Button>
                    <Button
                        onClick={clearChat}
                        className="w-full"
                        isLoading={isPending}
                        variant="destructive"
                    >
                        <ClientTranslate translationKey="yes" />
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
