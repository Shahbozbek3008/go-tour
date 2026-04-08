"use client"

import { IconClose } from "@/assets/icons/close"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { Mail, Phone, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { type Partner } from "../../../../_types/user"
import { DeleteChat } from "./delete-chat"

interface UserProfileProps {
    user: Partner | undefined
    onClose: () => void
}

export default function ProfileDrawer({ user, onClose }: UserProfileProps) {
    const t = useTranslations()
    const { isOpen, openModal } = useModal(MODAL_KEYS.DELETE_CHAT)

    return (
        <div className="flex flex-col h-full w-[300px] sm:w-[350px] relative bg-white  shadow-md p-6">
            <Button
                size="icon"
                variant="ghost"
                className="hover:bg-transparent absolute right-2 top-2"
                onClick={onClose}
            >
                <IconClose className="w-6 h-6" stroke="var(--text-secondary)" />
            </Button>

            <div className="flex flex-col items-center shrink-0">
                <div className="relative">
                    <AvatarImageProfile
                        src={user?.profile_image || ""}
                        first_name={user?.first_name}
                        last_name={user?.first_name}
                        wrapperClassName="w-21 h-21"
                        className="object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[var(--success-main)] border-2 border-white" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                    {[user?.first_name, user?.last_name]
                        .filter(Boolean)
                        .join(" ") || t("unknown")}
                </h2>
                {user?.job_title && (
                    <p className="text-sm text-gray-500">{user?.job_title}</p>
                )}
            </div>

            <div className="flex-1 overflow-y-auto mt-10 flex flex-col">
                {user?.about && (
                    <div className="text-center mb-6">
                        <h3 className="text-sm text-(--text-secondary) opacity-40 mb-1 uppercase">
                            <ClientTranslate translationKey="about" />
                        </h3>
                        <p className="text-sm text-gray-500">{user?.about}</p>
                    </div>
                )}

                <div>
                    <h3 className="text-sm text-center  text-(--text-secondary) opacity-40 uppercase mb-2">
                        <ClientTranslate translationKey="personalInformation" />
                    </h3>

                    {user?.email && (
                        <div className="flex items-center gap-3  text-gray-600">
                            <Mail size={22} />
                            <span className="text-sm w-full text-center">
                                {user?.email}
                            </span>
                        </div>
                    )}

                    {user?.phone_number && (
                        <div className="flex items-center gap-3 mt-2 text-gray-600">
                            <Phone size={22} />
                            <span className="text-sm w-full text-center">
                                {user?.phone_number}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-10">
                    <Button
                        size="lg"
                        onClick={openModal}
                        variant="destructive"
                        className="w-full gap-2 flex text-sm justify-center items-center"
                    >
                        <ClientTranslate translationKey="deleteChat" />{" "}
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
            {isOpen && <DeleteChat />}
        </div>
    )
}
