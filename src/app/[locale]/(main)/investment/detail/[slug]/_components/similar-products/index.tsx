"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import InvestmentCard from "../../../../_components/right-side/card"
import { useInvestmentSimilarSlugQuery } from "../../_hooks/use-investment-similar-slug-query"

const SimilarProducts = () => {
    const { similarList } = useInvestmentSimilarSlugQuery({
        params: { page_size: 4 },
    })

    return (
        <div className="flex flex-col gap-6 pt-6">
            <h4 className="text-2xl font-semibold">
                <ClientTranslate translationKey="similarListings" />
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {similarList.map((item) => {
                    return <InvestmentCard key={item.id} item={item} />
                })}
            </div>
        </div>
    )
}

export default SimilarProducts
