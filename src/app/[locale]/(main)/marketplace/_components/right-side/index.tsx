"use client"

import { IconPlus } from "@/assets/icons/plus"
import { useAi } from "@/components/common/ai-chat/_hooks/use-ai"
import EmptyList from "@/components/common/empty-list"
import ClientTranslate from "@/components/common/translation/client-translate"
import { ParamPagination } from "@/components/filter/param-pagination"
import { Button } from "@/components/ui/button"
import { useMarketplaceListQuery } from "../../_hooks/use-marketplace-list-query"
import MarketplaceCard from "../card"

export default function RightSide() {
    const { data, marketplaceList, isPending } = useMarketplaceListQuery()

    const { openAiModal } = useAi()

    function handleAiClick() {
        openAiModal("marketplace_add")
    }

    return (
        <>
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-medium text-3xl">
                        <ClientTranslate translationKey="marketplace" />
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

                {!marketplaceList.length && !isPending && <EmptyList />}
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(14rem,1fr))] clamp-[gap,4,6]">
                    {marketplaceList.map((item) => (
                        <MarketplaceCard key={item.slug} item={item} />
                    ))}
                </div>

                <ParamPagination
                    pageSize={12}
                    count={data?.count}
                    className="mt-12"
                />
            </main>
        </>
    )
}
