"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { useEffect } from "react"
import { useNotificationsListQuery } from "../_hooks/use-notifications-list-query"
import Categories from "./categories"
import Empty from "./empty"
import NotificationsSkeleton from "./loading"
import Main from "./main"

export default function Index() {
    const search = useSearch()
    const { post } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const { notificationsList, isLoading } = useNotificationsListQuery({
        params: {
            source_type:
                search?.category === "all" ? undefined : search?.category,
        },
    })

    const handleReadAll = () => {
        post(
            API.NOTIFICATIONS.EXTRA_NOTIFICATIONS_READ_ALL,
            {},
            {
                onSuccess: () => {
                    invalidateByExactMatch([
                        API.NOTIFICATIONS.EXTRA_NOTIFICATIONS,
                        API.PROFILE.INFO.ME,
                    ])
                },
            },
        )
    }

    useEffect(() => {
        handleReadAll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="max-w-5xl mx-auto clamp-[px,5,10] py-[5%]">
            <hgroup className="flex items-center justify-center gap-4 mb-10">
                <h3 className="text-xl font-semibold">
                    <ClientTranslate translationKey="notification" />
                </h3>
                {/* <Button
                    variant="ghost"
                    isLoading={isPending}
                    onClick={handleReadAll}
                    className="text-primary md:text-base text-sm font-medium"
                >
                    <IconDoubleCheck />
                    <ClientTranslate translationKey="markAllasRead" />
                </Button> */}
            </hgroup>
            <Categories />
            {isLoading ?
                <NotificationsSkeleton />
            : notificationsList.length > 0 ?
                <Main />
            :   <Empty />}
        </section>
    )
}
