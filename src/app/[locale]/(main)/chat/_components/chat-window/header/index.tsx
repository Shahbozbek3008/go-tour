"use client"

import { IconPhone } from "@/assets/icons/chat/phone"
import { IconSearch } from "@/assets/icons/chat/search"
import { IconVideoCall } from "@/assets/icons/chat/video-call"
import AvatarImageProfile from "@/components/common/avatar-image"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { usePartnerProfileQuery } from "../../../_hooks/use-partner-profile-query"
import { useToggleStore } from "../../../_store/use-toggle-store"
import HeaderMenu from "./menu"
import ProfileDrawer from "./profile-drawer"

const Header = () => {
    const t = useTranslations()
    const { userOpen, setUserOpen } = useToggleStore()
    const { data: partnerProfile } = usePartnerProfileQuery()

    return (
        <div className="flex items-center justify-between bg-white py-4.5 px-6">
            <Group className="flex items-center gap-4">
                <div className="relative">
                    <Group onClick={() => setUserOpen(true)}>
                        <AvatarImageProfile
                            first_name={partnerProfile?.first_name}
                            last_name={partnerProfile?.last_name}
                            src={partnerProfile?.profile_image || ""}
                            width={40}
                            height={40}
                        />
                    </Group>

                    {partnerProfile?.chat_status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-(--success-main) border-2 border-white" />
                    )}
                </div>

                <div
                    className="flex flex-col cursor-pointer"
                    onClick={() => setUserOpen(true)}
                >
                    <p className="text-sm text-(--text-secondary) opacity-90">
                        {[partnerProfile?.first_name, partnerProfile?.last_name]
                            .filter(Boolean)
                            .join(" ") || t("unknown")}
                    </p>
                    <p className="text-xs text-(--text-secondary) opacity-70">
                        {partnerProfile?.job_title ?? "-"}
                    </p>
                </div>
            </Group>

            <div className="flex items-center gap-3">
                <Button size="icon" variant="ghost">
                    <IconPhone />
                </Button>
                <Button size="icon" variant="ghost">
                    <IconVideoCall />
                </Button>
                <Button size="icon" variant="ghost">
                    <IconSearch className="w-5.5 h-5.5" stroke="#808390" />
                </Button>
                <HeaderMenu user={partnerProfile} />
            </div>

            <AnimatePresence>
                {userOpen && (
                    <>
                        <motion.div
                            initial={{ x: 350, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 350, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute top-0 right-0 z-49 h-full"
                        >
                            <ProfileDrawer
                                user={partnerProfile}
                                onClose={() => setUserOpen(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header
