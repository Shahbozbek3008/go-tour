"use client"

import { IconAlert } from "@/assets/icons/alert"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "@/i18n/navigation"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useInvestmentForm } from "../../_hooks/use-investment-form"
import { useInvestmentPersist } from "../../_hooks/use-investment-persist"

export default function Content() {
    const { closeModal } = useModal(MODAL_KEYS.INVESTMENT_CANCEL_MODAL)
    const { reset } = useInvestmentPersist()
    const { methods } = useInvestmentForm()
    const { resetChat } = useAiPersist()
    const router = useRouter()

    const handleDiscardAll = () => {
        reset()
        closeModal()
        methods.reset()
        resetChat("investment_add")
        router.back()
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <IconAlert />
            <h3 className="text-(--error-500) text-[24px]">
                Are you sure you want to cancel?
            </h3>
            <p className="text-(--text-900) text-xl text-center">
                This action will discard all the information you’ve entered on
                this page. You will lose any unsaved AI-generated or manually
                edited content.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <Button
                    className="w-full bg-primary-8-lighter hover:bg-primary-16-light text-primary"
                    onClick={closeModal}
                >
                    No, go back
                </Button>
                <Button
                    onClick={handleDiscardAll}
                    variant="destructive"
                    className="w-full"
                >
                    Yes, discard all
                </Button>
            </div>
        </div>
    )
}
