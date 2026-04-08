"use client"
import MarketplaceCard from "@/app/[locale]/(main)/marketplace/_components/card"
import { IconBookmarkEmpty } from "@/assets/icons/bookmark-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { useProfileBookmarkMarketplaceQuery } from "../../_hooks/use-profile-bookmark-marketplace-query"

export default function BookmarkMarketplace() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, bookmarkMarketplace } = useProfileBookmarkMarketplaceQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <>
            {bookmarkMarketplace.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {bookmarkMarketplace.map((item) => (
                        <MarketplaceCard item={item} key={item.slug} />
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
