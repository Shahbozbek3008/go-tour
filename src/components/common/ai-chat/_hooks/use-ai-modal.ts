import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"

export const useAiModal = () => {
    const modal = useModal(MODAL_KEYS.AI_MODAL)
    return modal
}
