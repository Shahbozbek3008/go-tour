import { IconAlert } from "@/assets/icons/alert"
import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { getHref } from "@/lib/utils/get-href"
import { useChatListStore } from "../../../../_store/use-chat-list-store"
import { useChatStore } from "../../../../_store/use-chat-store"
import { useToggleStore } from "../../../../_store/use-toggle-store"

export const DeleteChat = () => {
    const router = useRouter()
    const { chatId, setChatId } = useChatStore()
    const { removeChat } = useChatListStore()
    const { closeAll } = useToggleStore()
    const { invalidateByExactMatch } = useRevalidate()
    const { remove, isPending } = useRequest()
    const { closeModal } = useModal(MODAL_KEYS.DELETE_CHAT)

    const onDelete = () => {
        remove(
            API.CHAT.MESSENGER_SLUG_CHATS.replace("{slug}", String(chatId)),
            null,
            {
                onSuccess: () => {
                    closeModal()
                    closeAll()
                    router.push(
                        getHref({
                            pathname: "/[locale]/chat",
                        }),
                    )
                    setChatId(null)
                    removeChat(String(chatId))
                    invalidateByExactMatch([API.CHAT.MESSENGER_CHATS])
                },
            },
        )
    }

    return (
        <Modal modalKey={MODAL_KEYS.DELETE_CHAT} className="!w-[500px]">
            <div className="flex flex-col items-center gap-8">
                <IconAlert />
                <h3 className="text-(--error-500) text-2xl text-center">
                    <ClientTranslate translationKey="areYouSureYouWantDel" />
                </h3>
                <p className="text-(--text-900) text-xl text-center">
                    <ClientTranslate translationKey="deletingThisChatWill" />
                </p>
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <Button
                        className="w-full bg-primary-8-lighter hover:bg-primary-16-right text-primary"
                        onClick={closeModal}
                    >
                        <ClientTranslate translationKey="no" />
                    </Button>
                    <Button
                        onClick={onDelete}
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
