import Modal from "@/components/common/modal"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { Send } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useChatSocket } from "../../../../_hooks/use-chat-socket"
import { useChatStore } from "../../../../_store/use-chat-store"

interface FilePreviewProps {
    selectedFile: File | null
}

export const FilePreviewModal = ({ selectedFile }: FilePreviewProps) => {
    return (
        <Modal modalKey={MODAL_KEYS.CHAT_EXTRA_MEDIA_MODAL} className="w-100">
            <FilePreview selectedFile={selectedFile} />
        </Modal>
    )
}

const FilePreview = ({ selectedFile }: FilePreviewProps) => {
    const { chatId } = useChatStore()
    const { post, isPending } = useRequest()
    const { sendFileMessage } = useChatSocket()
    const [, setUploading] = useState(false)
    const { invalidateByExactMatch } = useRevalidate()
    const { closeModal } = useModal(MODAL_KEYS.CHAT_EXTRA_MEDIA_MODAL)

    const handleFileSend = async () => {
        if (!selectedFile) return
        setUploading(true)

        const formData = new FormData()
        formData.append("file", selectedFile)

        post(API.EXTRA.MEDIA, formData, {
            onSuccess: (res) => {
                post(
                    API.CHAT.MESSENGER_MESSAGES,
                    {
                        chat: chatId,
                        files: [res?.file],
                    },
                    {
                        onSuccess: () => {
                            sendFileMessage(res?.file)
                            invalidateByExactMatch([
                                API.CHAT.MESSENGER_SLUG_CHATS.replace(
                                    "{slug}",
                                    String(chatId),
                                ),
                            ])
                            closeModal()
                        },
                    },
                )
            },
        })
    }

    return (
        <Group className="flex flex-col gap-4">
            <div className="flex justify-center items-center rounded-md">
                {selectedFile?.type.startsWith("image/") ?
                    <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="preview"
                        className="max-h-60 w-full object-contain"
                        width={200}
                        height={200}
                    />
                :   <p className="text-gray-700">{selectedFile?.name}</p>}
            </div>
            <div className="flex justify-end">
                <Button
                    size="icon"
                    isLoading={isPending}
                    onClick={handleFileSend}
                    className="bg-blue-600 w-25 hover:bg-blue-700 text-white px-5 flex items-center gap-2 rounded-md"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </Group>
    )
}
