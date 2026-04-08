"use client"

import OutreachhubCard from "@/app/[locale]/(main)/outreach-hub/_components/card"
import { IconOutreachHubEmpty } from "@/assets/icons/outreach-hub-empty"
import Modal from "@/components/common/modal"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import InformationModal from "../../_components/information-modal"
import { useOutreachhubItemQuery } from "../../_hooks/use-outreach-hub-items-query"

export default function OutreachActive() {
    const t = useTranslations()
    const params = useSearch()
    const pageSize = 12
    const { data, outreachhubItems } = useOutreachhubItemQuery({
        params: {
            ...params,
            page_size: pageSize,
        },
    })
    return (
        <>
            {outreachhubItems.length > 0 ?
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.6rem,1fr))]">
                    {outreachhubItems.map((item) => (
                        <OutreachhubCard
                            fromActive
                            item={item}
                            key={item.slug}
                        />
                    ))}
                </div>
            :   <Empty
                    emptyIcon={<IconOutreachHubEmpty />}
                    title={t("noActiveOutreachhub")}
                    description={t("noActiveListingsDesc")}
                />
            }

            <Modal
                modalKey="outreach-hub-update-modal"
                className="sm:max-w-[57.375rem] w-full"
            >
                <InformationModal />
            </Modal>

            <ParamPagination
                count={data?.count}
                pageSize={pageSize}
                className="mt-12 justify-end"
            />
        </>
    )
}
