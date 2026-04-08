"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useLanguage } from "@/hooks/use-language"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { formatDate } from "@/lib/utils/format-date"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { memo } from "react"
import { useChatStore } from "../../../_store/use-chat-store"
import { useToggleStore } from "../../../_store/use-toggle-store"
import { type MessengerChat } from "../../../_types/chat"
import { formatUser } from "../../../_utils/chat"

interface ChatUserProps {
    user: MessengerChat
}

const ChatUser = ({ user }: ChatUserProps) => {
    const { locale } = useLanguage()
    const { isCollapsed } = useToggleStore()
    const { isDeleted, other, displayName, jobTitle, isOnline } = formatUser(
        user,
        locale,
    )
    const router = useRouter()
    const { data } = useProfileQuery()
    const { invalidateByExactMatch } = useRevalidate()
    const { patch } = useRequest()
    const { chatId } = useChatStore()
    const isActive = chatId === user.id

    const onSelectUser = () => {
        if (
            user?.last_message !== null &&
            user?.last_message?.user_id !== data?.user_id
        ) {
            patch(
                API.CHAT.MESSENGER_MESSAGES_SLUG_READ.replace(
                    "{slug}",
                    user?.last_message?.id,
                ),
                {},
                {
                    onSuccess: () => {
                        invalidateByExactMatch([
                            API.CHAT.MESSENGER_CHATS,
                            API.PROFILE.INFO.ME,
                        ])
                    },
                },
            )
        }
        router.push(
            getHref({
                pathname: "/[locale]/chat",
                query: { chat_id: user?.id },
            }),
        )
    }

    return (
        <div
            onClick={onSelectUser}
            className={cn(
                "p-3 flex relative items-start justify-between cursor-pointer rounded-md transition-colors",
                isActive ?
                    "bg-primary text-white"
                :   "hover:bg-gray-50 text-gray-900",
            )}
        >
            <div className="flex items-center gap-4 cursor-pointer overflow-hidden">
                <div className="relative flex-shrink-0">
                    <AvatarImageProfile
                        wrapperClassName="w-10 h-10"
                        src={other?.profile_image || ""}
                        first_name={other?.first_name || ""}
                        last_name={other?.last_name || ""}
                        fallbackClassName="text-gray-900"
                    />

                    {!isDeleted && isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-(--success-main) border-2 border-white" />
                    )}
                </div>

                <div
                    className={cn(
                        "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
                        isCollapsed ? "max-w-0 opacity-0" : (
                            "max-w-50 opacity-100"
                        ),
                    )}
                >
                    <p className="text-sm whitespace-nowrap max-w-42 truncate">
                        {displayName}
                    </p>
                    <p
                        className={cn(
                            "text-xs whitespace-nowrap max-w-40 truncate",
                            isActive ? "text-white" : (
                                "text-(--text-secondary) opacity-70"
                            ),
                        )}
                    >
                        {jobTitle}
                    </p>
                </div>
            </div>

            <p
                className={cn(
                    "text-xs overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap",
                    isCollapsed ? "max-w-0 opacity-0" : "max-w-25 opacity-100",
                    isActive ? "text-white" : (
                        "text-(--text-secondary) opacity-40"
                    ),
                )}
            >
                {formatDate(user?.created_at)}
            </p>
            {user?.unread_count > 0 && (
                <span
                    className={cn(
                        "absolute top-9 right-2  min-w-4 min-h-4 px-1 flex items-center justify-center rounded-xl  text-[10px] font-bold text-white",
                        isActive ? "bg-white text-primary" : "gradient-2",
                    )}
                >
                    {user?.unread_count}
                </span>
            )}
        </div>
    )
}

export default memo(ChatUser)
