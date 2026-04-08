"use client"

import { IconArrowRightOutline } from "@/assets/icons/chat/arrow-right-outline"
import { IconEdit } from "@/assets/icons/chat/edit"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import { motion } from "framer-motion"
import parse from "html-react-parser"
import { MessagesSquareIcon } from "lucide-react"
import { useMessengerFoldersQuery } from "../../../_hooks/use-messenger-folders-query"
import { useFilterStore } from "../../../_store/use-filter-store"
import { useToggleStore } from "../../../_store/use-toggle-store"
import EditFoldersModal from "./edit-folders-modal"
import TabsSkeleton from "./tabs-skeleton"

const Tabs = () => {
    const { folder, setFolder } = useFilterStore()
    const { isLoading, messengerFolders } = useMessengerFoldersQuery()
    const { openModal } = useModal(MODAL_KEYS.CHAT_EDIT_FOLDERS)
    const { toggleIsCollapsed, isCollapsed } = useToggleStore()

    const handleTabClick = (id: string) => {
        setFolder(id)
    }

    return (
        <>
            <motion.div
                layout
                initial={false}
                className="h-full border-r flex flex-col overflow-y-auto"
                animate={{
                    width: "80px",
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    },
                }}
            >
                {isLoading ?
                    <TabsSkeleton count={6} />
                :   <>
                        {isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={toggleIsCollapsed}
                                    className="w-full rounded-none py-8 px-8"
                                >
                                    <IconArrowRightOutline />
                                </Button>
                            </motion.div>
                        )}
                        <motion.div
                            layout
                            className={cn(
                                "flex flex-col items-center py-4 w-full cursor-pointer border-t",
                                !folder ?
                                    "bg-blue-500 text-white"
                                :   "text-gray-500 hover:bg-gray-100",
                            )}
                            onClick={() => {
                                setFolder(null)
                                if (isCollapsed) {
                                    toggleIsCollapsed()
                                }
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessagesSquareIcon />
                            <motion.span
                                className="mt-1 text-xs font-medium text-center capitalize line-clamp-1"
                                layout
                            >
                                <ClientTranslate translationKey="all" />
                            </motion.span>
                        </motion.div>
                        {messengerFolders?.map((tab) => (
                            <motion.div
                                layout
                                key={tab.id}
                                className={cn(
                                    "flex flex-col items-center py-3 px-2 cursor-pointer",
                                    folder === tab?.id ?
                                        "bg-blue-500 text-white"
                                    :   "text-gray-500 hover:bg-gray-100",
                                )}
                                onClick={() => {
                                    handleTabClick(tab.id)
                                    if (isCollapsed) {
                                        toggleIsCollapsed()
                                    }
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    layout
                                    className={cn(
                                        "w-6 h-6",
                                        folder === tab.id ?
                                            "text-white"
                                        :   "text-gray-500",
                                    )}
                                >
                                    {parse(
                                        tab?.icon_url?.replace(
                                            /fill=".*?"/g,
                                            'fill="currentColor"',
                                        ),
                                    )}
                                </motion.div>

                                <motion.span
                                    layout
                                    className="mt-1 text-xs line-clamp-1 font-medium text-center"
                                >
                                    {tab?.name}
                                </motion.span>
                            </motion.div>
                        ))}
                        <motion.div
                            layout
                            className={cn(
                                "flex flex-col items-center py-3 px-2 cursor-pointer border-t",
                            )}
                            onClick={openModal}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div layout>
                                <IconEdit />
                            </motion.div>
                            <motion.span
                                layout
                                className="mt-1 text-xs font-medium text-center"
                            >
                                <ClientTranslate translationKey="edit" />
                            </motion.span>
                        </motion.div>
                    </>
                }
            </motion.div>

            <EditFoldersModal />
        </>
    )
}

export default Tabs
