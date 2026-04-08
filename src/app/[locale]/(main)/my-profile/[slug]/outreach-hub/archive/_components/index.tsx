"use client"

import OutreachhubCard from "@/app/[locale]/(main)/outreach-hub/_components/card"
import { IconOutreachHubEmpty } from "@/assets/icons/outreach-hub-empty"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import { useOutreachhubItemsArchive } from "../../_hooks/use-outreach-hub-items-archive"

export default function OutreachArchive() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, outreachhubItemsArchive } = useOutreachhubItemsArchive({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <div>
            {outreachhubItemsArchive.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {outreachhubItemsArchive.map((item) => (
                        <OutreachhubCard
                            fromArchive
                            item={item}
                            key={item.slug}
                        />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconOutreachHubEmpty />}
                    title={t("noArchivedOutreachhub")}
                    description={t("noActiveListingsDesc")}
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
