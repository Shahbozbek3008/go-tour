"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils/shadcn"
import { type NotificationTabsCount } from "@/types/common"
import { CATEGORIES } from "../_constants/categories"
import { useNotificationsListQuery } from "../_hooks/use-notifications-list-query"

export default function Categories() {
    const search = useSearch()
    const router = useRouter()
    const pathname = usePathname()

    const currentCategory = search?.category ?? CATEGORIES[0].category_key

    const { data } = useNotificationsListQuery({
        params: {
            source_type:
                currentCategory === "all" ? undefined : currentCategory,
        },
    })

    const counts: NotificationTabsCount = data?.notification_tabs_count ?? {
        chat: 0,
        post: 0,
        system: 0,
        user: 0,
    }

    const getCount = (key: string) => {
        if (key === "all") {
            return counts.chat + counts.post + counts.system + counts.user
        }
        return counts[key as keyof NotificationTabsCount] ?? 0
    }

    return (
        <ul
            className={cn(
                "flex lg:justify-center justify-start gap-4 pb-2 overflow-x-auto overscroll-x-contain",
            )}
        >
            {CATEGORIES.map((c) => {
                const isActive = currentCategory === c.category_key
                const count = getCount(c.category_key)

                return (
                    <li
                        key={c.name}
                        className={cn(
                            "cursor-pointer text-nowrap md:bg-primary-8-lighter rounded-[6px] py-2 px-5 flex items-center gap-1.5 transition-all hover:bg-primary/20 md:font-medium font-semibold border border-[#e6e6e6] md:border-0 sm:text-base text-sm",
                            isActive &&
                                "text-background bg-primary md:bg-primary hover:bg-primary",
                        )}
                        onClick={() => {
                            if (!isActive) {
                                router.push({
                                    pathname,
                                    query: { category: c.category_key },
                                })
                            }
                        }}
                    >
                        <ClientTranslate
                            className="capitalize"
                            translationKey={c.name}
                        />
                        {count > 0 && (
                            <span
                                className={cn(
                                    "w-4 h-4 rounded-full bg-primary text-[0.625rem] text-background grid place-items-center",
                                    isActive && "text-primary bg-background",
                                )}
                            >
                                {count}
                            </span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
