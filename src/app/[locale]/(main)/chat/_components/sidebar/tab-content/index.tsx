"use client"

import { IconArrowRightOutline } from "@/assets/icons/chat/arrow-right-outline"
import { IconEdit } from "@/assets/icons/chat/edit"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { useChatListSocket } from "../../../_hooks/use-chat-list-socket"
import { useMessengerChatsQuery } from "../../../_hooks/use-messenger-chats-query"
import { useFilterStore } from "../../../_store/use-filter-store"
import { useToggleStore } from "../../../_store/use-toggle-store"
import ChatUser from "../chat-user"
import ChatEmpty from "../empty"
import Loader from "./loader"

export default function TabContent() {
    const { folder, search } = useFilterStore()
    const { isCollapsed, toggleIsCollapsed } = useToggleStore()

    const { openModal } = useModal(MODAL_KEYS.CHAT_ADD_EDIT_FOLDER)

    const { isLoading, messengerChats } = useMessengerChatsQuery({
        params: { folder, search, page_size: 1000 },
    })

    useChatListSocket()

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                width: isCollapsed ? 0 : "auto",
                opacity: isCollapsed ? 0 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            className={cn(
                "flex flex-col gap-5 overflow-y-auto p-4 scrollbar flex-1",
                isCollapsed && "pointer-events-none p-0",
            )}
        >
            <motion.div layout className="flex items-center justify-between">
                {!folder ?
                    <div></div>
                :   <Button
                        size="icon"
                        variant="ghost"
                        className="!p-0"
                        onClick={openModal}
                    >
                        <IconEdit />
                    </Button>
                }

                <Group className="flex items-center gap-6">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={toggleIsCollapsed}
                        className="rotate-180 transition-transform duration-200"
                    >
                        <IconArrowRightOutline />
                    </Button>
                </Group>
            </motion.div>

            <AnimatePresence mode="wait">
                {isLoading ?
                    <Loader />
                : messengerChats.length > 0 ?
                    <motion.div
                        layout
                        className="flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {messengerChats.map((user) => (
                            <ChatUser key={user.id} user={user} />
                        ))}
                    </motion.div>
                :   !isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChatEmpty />
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>
    )
}
