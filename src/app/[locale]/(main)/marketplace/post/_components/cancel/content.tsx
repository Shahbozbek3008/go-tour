"use client"

import { IconAlert } from "@/assets/icons/alert"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "@/i18n/navigation"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"
import { useMarketplacePersist } from "../../_hooks/use-marketplace-persist"

export default function Content() {
    const { closeModal } = useModal(MODAL_KEYS.MARKETPLACE_CANCEL_MODAL)
    const { reset } = useMarketplacePersist()
    const { methods } = useMarketplaceForm()
    const { resetChat } = useAiPersist()
    const router = useRouter()

    const handleDiscardAll = () => {
        reset()
        closeModal()
        methods.reset()
        resetChat("marketplace_add")
        router.back()
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <IconAlert />
            <h3 className="text-(--error-500) text-[24px]">
                <ClientTranslate translationKey="areYouSureWant" />
            </h3>
            <p className="text-(--text-900) text-xl text-center">
                <ClientTranslate translationKey="areYouSureWantDesc" />
            </p>
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <Button
                    className="w-full bg-primary-8-lighter hover:bg-primary-16-light text-primary"
                    onClick={closeModal}
                >
                    <ClientTranslate translationKey="noGoBack" />
                </Button>
                <Button
                    onClick={handleDiscardAll}
                    variant="destructive"
                    className="w-full"
                >
                    <ClientTranslate translationKey="yesDiscard" />
                </Button>
            </div>
        </div>
    )
}
