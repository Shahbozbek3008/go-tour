"use client"
import OutreachhubCard from "@/app/[locale]/(main)/outreach-hub/_components/card"
import { IconBookmarkEmpty } from "@/assets/icons/bookmark-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { useBookmarkOutreachhubQuery } from "../../_hooks/use-profile-bookmark-outreach-hub-query"

export default function BookmarkOutreachHub() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, bookmarkOutreachhub } = useBookmarkOutreachhubQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <>
            {bookmarkOutreachhub.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {bookmarkOutreachhub.map((item) => (
                        <OutreachhubCard shared item={item} key={item.slug} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconBookmarkEmpty />}
                    title={t("youHaveNotBookmarked")}
                    description={t("youHaveNotBookmarkedDesc")}
                />
            }

            <ParamPagination
                count={data?.count}
                pageSize={pageSize}
                className="mt-12 justify-end"
            />
        </>
    )
}
