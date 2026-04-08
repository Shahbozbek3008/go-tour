import { IconDots } from "@/assets/icons/chat/dots"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { useToggleStore } from "../../../../_store/use-toggle-store"
import { type Partner } from "../../../../_types/user"
import ProfileDrawer from "../profile-drawer"
import { ClearChat } from "./clear-chat"

type MenuType = {
    id: number
    name: TranslationKey
    menuKey: string
}

const MENU: MenuType[] = [
    {
        id: 1,
        name: "viewContact",
        menuKey: "view_contact",
    },
    {
        id: 2,
        name: "muteNotifications",
        menuKey: "mute_notifications",
    },
    {
        id: 3,
        name: "blockContact",
        menuKey: "block_contact",
    },
    {
        id: 4,
        name: "clearChat",
        menuKey: "clear_chat",
    },
    {
        id: 5,
        name: "report",
        menuKey: "report",
    },
]

interface HeaderMenuProps {
    user: Partner | undefined
}

const HeaderMenu = ({ user }: HeaderMenuProps) => {
    const { userOpen, setUserOpen } = useToggleStore()
    const { isOpen, openModal } = useModal(MODAL_KEYS.CLEAR_CHAT)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "outline-none shadow-none",
                            "focus:outline-none focus:ring-0 focus:ring-transparent focus:border-none focus:shadow-none",
                        )}
                    >
                        <IconDots />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="!rounded-md">
                    <DropdownMenuGroup className="!rounded-md text-sm font-medium">
                        {MENU.map((menu) => {
                            return (
                                <DropdownMenuItem
                                    key={menu.id}
                                    onClick={() => {
                                        if (menu.menuKey === "view_contact") {
                                            setUserOpen(true)
                                        } else if (
                                            menu.menuKey === "clear_chat"
                                        ) {
                                            openModal()
                                        }
                                    }}
                                >
                                    <p className="text-(--text-secondary) hover:text-(--text-secondary)">
                                        <ClientTranslate
                                            translationKey={menu.name}
                                        />
                                    </p>
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
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
                                user={user}
                                onClose={() => setUserOpen(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {isOpen && <ClearChat />}
        </>
    )
}

export default HeaderMenu
