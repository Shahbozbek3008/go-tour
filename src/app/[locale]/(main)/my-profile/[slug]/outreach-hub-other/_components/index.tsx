"use client"

import OutreachhubCard from "@/app/[locale]/(main)/outreach-hub/_components/card"
import { IconOutreachHubEmpty } from "@/assets/icons/outreach-hub-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../_components/empty"
import { useOtherOutreachHubItemQuery } from "../_hooks/use-other-outreach-hub-item-query"

export default function OutReachHubOtherPage() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, otherOutreachHubItems } = useOtherOutreachHubItemQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <>
            {otherOutreachHubItems.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {otherOutreachHubItems.map((item) => (
                        <OutreachhubCard item={item} key={item.slug} />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconOutreachHubEmpty />}
                    title={t("noActiveOutreachhub")}
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
