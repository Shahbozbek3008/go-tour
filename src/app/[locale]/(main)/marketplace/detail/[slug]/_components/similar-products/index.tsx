"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import MarketplaceCard from "../../../../_components/card"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"
import { useMarketplaceSimilarSlugQuery } from "../../_hooks/use-marketplace-similar-slug-query"

const SimilarProducts = () => {
    const { isPreview } = useMarketplaceProductQuery()

    if (isPreview) return

    return <Content />
}

const Content = () => {
    const { similarList } = useMarketplaceSimilarSlugQuery({
        params: { page_size: 4 },
    })

    return (
        <div className="px-4 flex flex-col gap-6">
            <h4 className="text-2xl font-semibold">
                <ClientTranslate translationKey="similarListings" />
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {similarList.map((item) => (
                    <MarketplaceCard key={item.slug} item={item} />
                ))}
            </div>
        </div>
    )
}

export default SimilarProducts
