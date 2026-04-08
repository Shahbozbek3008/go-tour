import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"

export const useMediaViewerModal = () => {
    const modal = useModal(MODAL_KEYS.MEDIA_VIEWER_MODAL)

    return { ...modal }
}
