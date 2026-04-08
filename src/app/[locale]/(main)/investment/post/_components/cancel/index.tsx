import Modal from "@/components/common/modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import Content from "./content"

export const Cancel = () => {
    return (
        <Modal
            className="max-w-xl"
            modalKey={MODAL_KEYS.INVESTMENT_CANCEL_MODAL}
        >
            <Content />
        </Modal>
    )
}
