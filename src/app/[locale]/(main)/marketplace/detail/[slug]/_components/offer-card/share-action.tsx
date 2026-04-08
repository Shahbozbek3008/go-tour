"use client"

import { IconShareGradient } from "@/assets/icons/share-gradient"
import { Button } from "@/components/ui/button"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

export default function ShareAction() {
    const { data, isPreview } = useMarketplaceProductQuery()
    return (
        <Button
            variant={"ghost"}
            icon={<IconShareGradient />}
            onClick={() => {
                if (isPreview) return
                navigator.share({
                    url: location.href,
                    title: "INexLynk",
                    text: data?.slug,
                })
            }}
        />
    )
}
