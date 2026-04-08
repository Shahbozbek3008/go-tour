import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useCreateFolderForm } from "./_hooks/use-create-folder-form"

interface Props {
    isPending: boolean
}

export default function Actions({ isPending }: Props) {
    const { watchIcon, watchChats } = useCreateFolderForm()
    const { closeModal } = useModal(MODAL_KEYS.CHAT_ADD_EDIT_FOLDER)

    return (
        <div className="absolute bottom-4 right-5 bg-background flex items-center justify-end gap-4">
            <Button
                size="lg"
                onClick={closeModal}
                className="bg-(--Opacity-Color-Secondary-secondary-8) hover:bg-(--Opacity-Color-Secondary-secondary-8) text-(--text-400)"
            >
                <ClientTranslate translationKey="cancel" />
            </Button>
            <Button
                type="submit"
                size="lg"
                isLoading={isPending}
                className="rounded-md w-24"
                disabled={!watchIcon || !watchChats.length}
            >
                <ClientTranslate translationKey="save" />
            </Button>
        </div>
    )
}
