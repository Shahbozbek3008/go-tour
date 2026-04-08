"use client"

import { IconPlus } from "@/assets/icons/plus"
import { useAi } from "@/components/common/ai-chat/_hooks/use-ai"
import EmptyList from "@/components/common/empty-list"
import ClientTranslate from "@/components/common/translation/client-translate"
import { ParamPagination } from "@/components/filter/param-pagination"
import { Button } from "@/components/ui/button"
import { useInvestmentListQuery } from "../../_hooks/use-investment-list-query"
import ProductCard from "./card"

export default function RightSide() {
    const { data, investmentList, isPending } = useInvestmentListQuery()

    const { openAiModal } = useAi()

    function handleAiClick() {
        openAiModal("investment_add")
    }

    return (
        <>
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-medium text-3xl">
                        <ClientTranslate translationKey="investment" />
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

                {!investmentList.length && !isPending && <EmptyList />}
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(14rem,1fr))] clamp-[gap,4,6]">
                    {investmentList.map((item) => (
                        <ProductCard key={item.slug} item={item} />
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
