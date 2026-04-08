"use client"

import { ScrollPagination } from "@/components/common/scroll-pagination"
import { Input } from "@/components/ui/input"
import { Scroller } from "@/components/ui/scroller"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useInfiniteMessengerChatsQuery } from "../../../../_hooks/use-infinite-messenger-chats-query"
import { useMessengerChatsQuery } from "../../../../_hooks/use-messenger-chats-query"
import ChatItem from "./chat-item"

export default function MessengerChatsSection() {
    const t = useTranslations()
    const [search, setSearch] = useState<string | undefined>("")
    const { messengerChats } = useMessengerChatsQuery({
        params: { search },
    })
    const {
        infiniteMessengerChats,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteMessengerChatsQuery()
    const chats = search ? messengerChats : infiniteMessengerChats

    return (
        <>
            <div className="flex flex-col gap-2 mt-6 mb-3 border-b border-stroke-gray">
                <Input
                    type="text"
                    placeholder={t("searchMembers")}
                    className="w-full border-none shadow-none border-b border-(--stroke-gray) focus:border-(--stroke-gray) outline-none text-base text-gray-700 placeholder-(--text-400) pb-2"
                    handleDebouncedInputValue={(val) => {
                        setSearch(val || undefined)
                    }}
                />
            </div>
            <Scroller className="flex flex-col gap-1 mb-14 overflow-y-auto max-h-96">
                {chats.map((user) => {
                    return <ChatItem key={user?.id} item={user} />
                })}

                <ScrollPagination
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </Scroller>
        </>
    )
}
