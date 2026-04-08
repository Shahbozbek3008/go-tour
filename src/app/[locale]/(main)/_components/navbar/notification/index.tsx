import IconBell from "@/assets/icons/bell-icon"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Notification() {
    const { data } = useProfileQuery()
    const count = Number(data?.unread_notifications_count || 0)

    return (
        <div className="relative">
            <Link href={getHref({ pathname: "/[locale]/notification" })}>
                <IconBell />
            </Link>
            {count > 0 && (
                <span className="absolute top-0 right-0 min-w-4 min-h-4 gradient-2 flex rounded-xl justify-center items-center  text-[10px] font-bold">
                    {count}
                </span>
            )}
        </div>
    )
}
