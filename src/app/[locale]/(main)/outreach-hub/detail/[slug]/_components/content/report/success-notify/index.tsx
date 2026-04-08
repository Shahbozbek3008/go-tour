"use client"

import { IconCheckCircleGradient } from "@/assets/icons/check-circle-gradient"
import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { Link } from "@/i18n/navigation"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"

const SuccessNotify = () => {
    return (
        <Modal modalKey={MODAL_KEYS.SUCCESS_NOTIFY_MODAL}>
            <Content />
        </Modal>
    )
}

const Content = () => {
    const { closeModal } = useModal(MODAL_KEYS.SUCCESS_NOTIFY_MODAL)

    return (
        <div className="flex flex-col items-center gap-8">
            <IconCheckCircleGradient className="w-20 h-20" />
            <h3 className="text-2xl text-(--text-900) font-medium">
                <ClientTranslate translationKey="thankyouForThe" />
            </h3>
            <p className="text-center text-xl text-(--text-900)">
                <ClientTranslate translationKey="whenYouSeeContent" />{" "}
                <Link href="/" className="text-primary">
                    <ClientTranslate translationKey="privacyPolicy" />
                </Link>
                . <ClientTranslate translationKey="youCanHidePerson" />.
            </p>
            <Button className="w-full text-xl mt-10" onClick={closeModal}>
                <ClientTranslate translationKey="close" />
            </Button>
        </div>
    )
}

export default SuccessNotify
