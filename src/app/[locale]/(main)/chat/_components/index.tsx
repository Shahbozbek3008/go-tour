"use client"

import Group from "@/components/semantic/group"
import useSearch from "@/hooks/use-search"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useChatStore } from "../_store/use-chat-store"
import { useFilterStore } from "../_store/use-filter-store"
import { useToggleStore } from "../_store/use-toggle-store"
import ChatWindow from "./chat-window"
import Empty from "./chat-window/empty"
import Sidebar from "./sidebar"

const Index = () => {
    const router = useRouter()
    const search = useSearch()
    const { isCollapsed, userOpen, profileOpen, closeAll } = useToggleStore()
    const { chatId, setChatId } = useChatStore()
    const { setFolder } = useFilterStore()

    useEffect(() => {
        if (search?.chat_id) {
            setChatId(search.chat_id)
        }
    }, [search.chat_id, setChatId])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setChatId(null)
                setFolder(null)
                router.push(
                    getHref({
                        pathname: "/[locale]/chat",
                    }),
                )
            }
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [router, setChatId, setFolder])

    return (
        <div className="p-6">
            <Group className="flex h-[calc(100vh-150px)] items-start justify-center relative rounded-md shadow-[var(--chat-shadow)] overflow-hidden">
                <motion.div
                    layout
                    className="border-r h-full"
                    initial={false}
                    animate={{
                        width: isCollapsed ? "80px" : "448px", // w-112 = 28rem = 448px
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    <Sidebar />
                </motion.div>
                <motion.div
                    layout
                    className="flex-1 h-full"
                    initial={false}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    {chatId ?
                        <ChatWindow />
                    :   <Empty />}
                </motion.div>
                {(profileOpen || userOpen) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 w-full h-full bg-primary z-40"
                        onClick={closeAll}
                    />
                )}
            </Group>
        </div>
    )
}

export default Index
