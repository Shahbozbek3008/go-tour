"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"
import { MARKETPLACE_REQUEST_TYPES } from "../../../../_constants"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"
import BookmarkAction from "./bookmark-action"
import MainInfo from "./main-info"
import PriceInfo from "./price-info"
import ShareAction from "./share-action"

const OfferCard = () => {
    const { data } = useMarketplaceProductQuery()
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (t) => t.key === data?.request_type,
    )

    return (
        <main className="border rounded-lg py-4 px-5 flex flex-col gap-2">
            <hgroup className="hidden md:flex items-center flex-wrap gap-2 justify-between">
                <span
                    className={cn(
                        "rounded-[20px] p-2 px-4 capitalize",
                        requestType?.className,
                    )}
                >
                    <ClientTranslate translationKey={requestType?.title} />
                </span>
                <div className="flex items-center gap-2">
                    <BookmarkAction />
                    <ShareAction />
                </div>
            </hgroup>

            <h3 className="text-3xl font-semibold">{data?.name}</h3>

            <hgroup className="flex flex-col gap-3.5">
                <MainInfo />
                <PriceInfo />
            </hgroup>
        </main>
    )
}

export default OfferCard
