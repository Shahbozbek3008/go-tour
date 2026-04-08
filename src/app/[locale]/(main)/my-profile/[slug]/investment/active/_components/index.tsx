"use client"
import InvestmentCard from "@/app/[locale]/(main)/investment/_components/right-side/card"
import { IconInvestmentEmpty } from "@/assets/icons/investment-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { useProfileInvestmentItemsQuery } from "../../_hooks/use-profile-investment-items-query"

export const InvestmentActive = () => {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, activeItems } = useProfileInvestmentItemsQuery({
        params: { ...params, is_archived: false, page_size: pageSize },
    })
    return (
        <>
            {activeItems.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {activeItems.map((item) => (
                        <InvestmentCard fromActive item={item} key={item.id} />
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
