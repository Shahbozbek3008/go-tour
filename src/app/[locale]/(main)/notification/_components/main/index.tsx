import useSearch from "@/hooks/use-search"
import { format } from "date-fns"
import { SOURCE_TYPE } from "../../_constants/source-type"
import { useNotificationsListQuery } from "../../_hooks/use-notifications-list-query"
import { Notification } from "../../_types/notification"
import ChatCard from "./chat-card"
import DateHeader from "./date-header"
import InfoCard from "./info-card"
import MessageCard from "./message-card"
import SupportCard from "./support-card"

export default function Main() {
    const search = useSearch()
    const { notificationsList } = useNotificationsListQuery({
        params: {
            source_type:
                search?.category === "all" ? undefined : search?.category,
        },
    })

    const groupedByDate = notificationsList?.reduce(
        (acc: Record<string, Notification[]>, notif: Notification) => {
            const date = format(new Date(notif.created_at), "yyyy-MM-dd")
            if (!acc[date]) acc[date] = []
            acc[date].push(notif)
            return acc
        },
        {},
    )

    const sortedDates = Object.keys(groupedByDate ?? {}).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    )

    return (
        <div className="flex flex-col">
            {sortedDates.map((date) => (
                <div key={date} className="grid gap-4">
                    <DateHeader date={format(new Date(date), "MMMM d, yyyy")} />
                    {groupedByDate?.[date].map((item) => {
                        switch (item.source_type_display) {
                            case SOURCE_TYPE.system:
                                return (
                                    <SupportCard key={item.id} support={item} />
                                )
                            case SOURCE_TYPE.user:
                                return <MessageCard key={item.id} item={item} />
                            case SOURCE_TYPE.chat:
                                return <ChatCard key={item.id} item={item} />
                            case SOURCE_TYPE.post:
                                return <InfoCard key={item.id} item={item} />
                            default:
                                return null
                        }
                    })}
                </div>
            ))}
        </div>
    )
}
