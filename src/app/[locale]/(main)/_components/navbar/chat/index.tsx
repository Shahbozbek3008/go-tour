"use client"

import IconChat from "@/assets/icons/chat-icon"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Chat() {
    const { data } = useProfileQuery()
    const count = Number(data?.chat_messages_count) || 0

    return (
        <div className="relative">
            <Link href={getHref({ pathname: "/[locale]/chat" })}>
                <IconChat />
            </Link>
            {count > 0 && (
                <span className="absolute top-0 -right-2 min-w-4 min-h-4 px-1 flex items-center justify-center rounded-xl gradient-2 text-[10px] font-bold text-white">
                    {count}
                </span>
            )}
        </div>
    )
}
