"use client"

import { IconPlus } from "@/assets/icons/plus"
import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import * as Sortable from "@/components/ui/sortable"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useState } from "react"
import { useMessengerFoldersQuery } from "../../../../_hooks/use-messenger-folders-query"
import { useFilterStore } from "../../../../_store/use-filter-store"
import { type MessengerFolder } from "../../../../_types/folder"
import { FolderItem } from "./folder-item"

const EditFoldersModal = () => {
    return (
        <Modal modalKey={MODAL_KEYS.CHAT_EDIT_FOLDERS} className="max-w-lg">
            <Content />
        </Modal>
    )
}

const Content = () => {
    const { setFolder } = useFilterStore()
    const { patch, isPending } = useRequest()
    const { messengerFolders } = useMessengerFoldersQuery()
    const { invalidateByExactMatch } = useRevalidate()
    const { closeModal } = useModal(MODAL_KEYS.CHAT_EDIT_FOLDERS)
    const { openModal: openCreateFolderModal } = useModal(
        MODAL_KEYS.CHAT_ADD_EDIT_FOLDER,
    )
    const [folders, setFolders] = useState<MessengerFolder[]>(messengerFolders)

    const handleReorder = () => {
        const ordered_folders = folders.map((folder) => folder.id)
        patch(
            API.CHAT.MESSENGER_FOLDERS_REORDER,
            { ordered_folders },
            {
                onSuccess: () => {
                    closeModal()
                    invalidateByExactMatch([API.CHAT.MESSENGER_FOLDERS])
                },
            },
        )
    }

    return (
        <>
            <h4 className="text-xl text-primary font-semibold capitalize">
                <ClientTranslate translationKey="edit" />
            </h4>

            <Group className="my-10">
                <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-(--text-400)">
                        <ClientTranslate translationKey="myFolders" />
                    </p>
                    <Separator />
                </div>
                <Sortable.Root
                    value={folders}
                    onValueChange={setFolders}
                    getItemValue={(folder) => folder.id}
                >
                    <Sortable.Content className="flex flex-col gap-1 mt-5 overflow-y-auto max-h-[450px] scrollbar">
                        {folders?.map((folder) => (
                            <FolderItem
                                key={folder.id}
                                folder={folder}
                                setFolders={setFolders}
                            />
                        ))}
                        <div
                            onClick={() => {
                                closeModal()
                                openCreateFolderModal()
                                setFolder(null)
                            }}
                            className="cursor-pointer flex items-center gap-4 rounded-md bg-(--primary-8-lighter) p-4"
                        >
                            <Button size="icon" className="w-6 h-6">
                                <IconPlus className="w-4 h-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="!p-0 text-sm text-primary"
                            >
                                <ClientTranslate translationKey="createNewFolder" />
                            </Button>
                        </div>
                    </Sortable.Content>
                </Sortable.Root>
            </Group>

            <div className="flex items-center justify-end gap-4">
                <Button
                    size="lg"
                    className="text-text-400"
                    onClick={closeModal}
                    variant={"secondary"}
                >
                    <ClientTranslate translationKey="cancel" />
                </Button>
                <Button
                    size="lg"
                    onClick={handleReorder}
                    isLoading={isPending}
                    disabled={!folders.length}
                >
                    <ClientTranslate translationKey="save" />
                </Button>
            </div>
        </>
    )
}

export default EditFoldersModal
