"use client"
import InvestmentCard from "@/app/[locale]/(main)/investment/_components/right-side/card"
import { IconInvestmentEmpty } from "@/assets/icons/investment-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { useProfileBookmarkInvestmentQuery } from "../../_hooks/use-profile-bookmark-investment-query"

export default function BookmarkInvestment() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, bookmarkInvestment } = useProfileBookmarkInvestmentQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <>
            {bookmarkInvestment.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {bookmarkInvestment.map((item) => (
                        <InvestmentCard item={item} key={item.slug} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconInvestmentEmpty />}
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
