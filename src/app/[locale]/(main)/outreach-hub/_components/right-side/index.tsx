"use client"

import { IconPlus } from "@/assets/icons/plus"
import { useAi } from "@/components/common/ai-chat/_hooks/use-ai"
import EmptyList from "@/components/common/empty-list"
import ClientTranslate from "@/components/common/translation/client-translate"
import { ParamPagination } from "@/components/filter/param-pagination"
import { Button } from "@/components/ui/button"
import useSearch from "@/hooks/use-search"
import { useOutreachhubListQuery } from "../../_hooks/use-outreachhub-list-query"
import OutreachhubCard from "../card"

export default function RightSide() {
    const params = useSearch()
    const { data, outreachhubList, isPending } = useOutreachhubListQuery({
        params: {
            ...params,
            page_size: 12,
        },
    })
    const { openAiModal } = useAi()

    function handleAiClick() {
        openAiModal("outreach_hub_add")
    }

    return (
        <>
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-medium text-3xl">
                        <ClientTranslate translationKey="outreachhub" />
                    </h2>
                    <Button
                        variant="gradient"
                        size="lg"
                        onClick={handleAiClick}
                    >
                        <IconPlus />{" "}
                        <span className="hidden xsm:inline">
                            <ClientTranslate translationKey="postaListing" />
                        </span>
                    </Button>
                </div>

                {!outreachhubList.length && !isPending && <EmptyList />}
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(14rem,1fr))] clamp-[gap,4,6]">
                    {outreachhubList.map((item) => (
                        <OutreachhubCard key={item.slug} item={item} />
                    ))}
                </div>

                <ParamPagination
                    count={data?.count}
                    pageSize={12}
                    className="mt-12"
                />
            </main>
        </>
    )
}
