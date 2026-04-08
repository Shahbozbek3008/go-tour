"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useFirstMessageSlugStore } from "@/hooks/store/use-first-message-slug-store"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { Paperclip, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import {
    ChangeEvent,
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent,
} from "react"
import { useChatSocket } from "../../../../_hooks/use-chat-socket"
import { useChatStore } from "../../../../_store/use-chat-store"
import { FilePreviewModal } from "./file-preview"

const SendMessage = () => {
    const t = useTranslations()
    const { chatId } = useChatStore()
    const { post, isPending } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const [message, setMessage] = useState("")
    const { sendMessage, connected } = useChatSocket()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    // const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const { openModal } = useModal(MODAL_KEYS.CHAT_EXTRA_MEDIA_MODAL)
    const { marketplaceSlug, investmentSlug, outreachHubSlug, clearSlug } =
        useFirstMessageSlugStore()

    const handleSend = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        if (!message.trim()) return

        sendMessage(message)

        const payload: {
            chat?: string
            text: string
            marketplace_items?: string[]
            investment_items?: string[]
            outreach_hub_items?: string[]
        } = {
            chat: chatId ?? undefined,
            text: message,
        }

        if (marketplaceSlug) {
            payload.marketplace_items = [marketplaceSlug]
            clearSlug()
        }
        if (investmentSlug) {
            payload.investment_items = [investmentSlug]
            clearSlug()
        }
        if (outreachHubSlug) {
            payload.outreach_hub_items = [outreachHubSlug]
            clearSlug()
        }

        setMessage("")
        post(API.CHAT.MESSENGER_MESSAGES, payload, {
            onSuccess: () => {
                setMessage("")
                invalidateByExactMatch([
                    API.CHAT.MESSENGER_SLUG_CHATS.replace(
                        "{slug}",
                        String(chatId),
                    ),
                ])
            },
        })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setSelectedFile(file)
        openModal()
    }

    return (
        <>
            <form onSubmit={handleSend} className="w-full">
                <div className="flex flex-col gap-2 w-full">
                    <Group className="relative w-full bg-white flex items-center rounded-md px-2 gap-3">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.currentTarget.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t("typeYourMessageHere")}
                            wrapperClassName="w-full"
                            className="max-w-[85%] w-full flex-1 resize-none border-0 max-h-52 min-h-14 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base scrollbar"
                        />

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        <div className="absolute right-2 bottom-2 flex items-center gap-2">
                            <Button
                                size="icon"
                                type="button"
                                variant="ghost"
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                type="submit"
                                isLoading={isPending}
                                disabled={!connected || !message.trim()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 flex items-center gap-2 rounded-md"
                            >
                                <ClientTranslate translationKey="send" />
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </Group>
                </div>
            </form>

            {selectedFile && <FilePreviewModal selectedFile={selectedFile} />}
        </>
    )
}

export default SendMessage
