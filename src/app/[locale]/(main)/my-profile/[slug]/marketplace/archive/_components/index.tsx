"use client"
import MarketplaceCard from "@/app/[locale]/(main)/marketplace/_components/card"
import { IconMarketplaceEmpty } from "@/assets/icons/marketplace-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { useProfileMarketplaceItemArchiveQuery } from "../_hooks/use-profile-marketplace-item-archive-query"

export const MarketplaceArchive = () => {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, marketplaceItemArchive } =
        useProfileMarketplaceItemArchiveQuery({
            params: {
                ...params,
                page_size: pageSize,
            },
        })
    return (
        <div>
            {marketplaceItemArchive.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {marketplaceItemArchive.map((item) => (
                        <MarketplaceCard
                            fromArchive
                            item={item}
                            key={item.slug}
                        />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconMarketplaceEmpty />}
                    title={t("noArchivedMarketplace")}
                    description={t("noArchivedMarketplaceDesc")}
                />
            }
            <ParamPagination
                count={data?.count}
                pageSize={pageSize}
                className="mt-12 justify-end"
            />
        </div>
    )
}
