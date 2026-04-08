"use client"
import InvestmentCard from "@/app/[locale]/(main)/investment/_components/right-side/card"
import { IconInvestmentEmpty } from "@/assets/icons/investment-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../_components/empty"
import { useOtherMarketplaceItemQuery } from "../_hooks/use-other-investment-item-query"

export default function InvestmentOtherPage() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, otherMarketplaceItems } = useOtherMarketplaceItemQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <>
            {otherMarketplaceItems.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {otherMarketplaceItems.map((item) => (
                        <InvestmentCard item={item} key={item.id} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconInvestmentEmpty />}
                    title={t("noActiveListings")}
                    description={t("noActiveListingsDesc")}
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
