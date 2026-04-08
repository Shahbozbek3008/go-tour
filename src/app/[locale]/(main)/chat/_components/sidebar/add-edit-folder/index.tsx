"use client"

import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useTranslations } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMessengerFoldersSlugQuery } from "../../../_hooks/use-messenger-folders-slug-query"
import { useFilterStore } from "../../../_store/use-filter-store"
import { CreateFolderForm } from "./_types"
import Actions from "./actions"
import FolderInput from "./input"
import MessengerChatsSection from "./messenger-chats-section"

const AddEditFolderModal = () => {
    return (
        <Modal
            className="max-w-lg pb-8 overflow-y-hidden"
            modalKey={MODAL_KEYS.CHAT_ADD_EDIT_FOLDER}
        >
            <Content />
        </Modal>
    )
}

const Content = () => {
    const t = useTranslations()
    const { invalidateByPatternMatch, invalidateByExactMatch } = useRevalidate()
    const { closeModal } = useModal(MODAL_KEYS.CHAT_ADD_EDIT_FOLDER)
    const { folder } = useFilterStore()

    const { data, folderChatIds } = useMessengerFoldersSlugQuery()
    const { post, patch, isPending } = useRequest()

    const form = useForm<CreateFolderForm>({
        defaultValues: {
            name: "",
            icon: "",
            with_chats: [],
        },
        values:
            folder ?
                {
                    name: data?.name || "",
                    icon: data?.icon || "",
                    with_chats: folderChatIds,
                }
            :   undefined,
    })

    const onSubmit = form.handleSubmit((vals) => {
        if (!folder) {
            post(API.CHAT.MESSENGER_FOLDERS, vals, {
                onSuccess: () => {
                    closeModal()
                    toast.success(t("folderCreated"))
                    invalidateByPatternMatch([API.CHAT.MESSENGER_FOLDERS])
                },
            })
        } else {
            const endpoint = API.CHAT.MESSENGER_SLUG_FOLDER.replace(
                "{slug}",
                String(folder),
            )
            const payload = {
                ...vals,
                added_chats: vals.with_chats.filter(
                    (selectedChatId) => !folderChatIds.includes(selectedChatId),
                ),
                removed_chats: folderChatIds.filter(
                    (prevSelectedChatId) =>
                        !vals.with_chats.includes(prevSelectedChatId),
                ),
            }
            patch(endpoint, payload, {
                onSuccess: () => {
                    closeModal()
                    toast.success(t("folderUpdated"))
                    invalidateByExactMatch([
                        API.CHAT.MESSENGER_FOLDERS,
                        API.CHAT.MESSENGER_CHATS,
                        endpoint,
                    ])
                },
            })
        }
    })

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit}>
                <h4 className="text-xl text-primary font-semibold mb-6">
                    <ClientTranslate
                        translationKey={
                            folder ? "editFolder" : "createNewFolder"
                        }
                    />
                </h4>
                <FolderInput />
                <MessengerChatsSection />
                <Actions isPending={isPending} />
            </form>
        </FormProvider>
    )
}

export default AddEditFolderModal
