import { IconLogo } from "@/assets/icons/logo"
import Modal from "@/components/common/modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import RightSection from "./right-section"

export const AIChatModal = () => {
    return (
        <Modal
            modalKey={MODAL_KEYS.AI_MODAL}
            className="w-[90%] max-w-7xl rounded-2xl overflow-y-hidden"
        >
            <AiChat />
        </Modal>
    )
}

interface Props {
    className?: string
}

const AiChat = ({ className }: Props) => {
    return (
        <div className={cn("grid grid-cols-4", className)}>
            {/* <div className="col-span-1 border-border border-r mr-5">
                <Sidebar />
            </div> */}
            <div className="col-span-full relative">
                <IconLogo />
                <RightSection />
            </div>
        </div>
    )
}

export default AiChat
