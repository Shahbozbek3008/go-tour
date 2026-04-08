"use client"

import Breadcrumb from "@/components/common/breadcrumb"
import { GobackMobile } from "@/components/common/goback-mobile"
import ClientTranslate from "@/components/common/translation/client-translate"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useMarketplaceProductQuery } from "../_hooks/use-marketplace-product-query"

export default function Navigation() {
    const t = useTranslations()
    const { data, isPreview } = useMarketplaceProductQuery()
    const endPoint = API.MARKETPLACE.BOOKMARK_SLUG.replace(
        "{slug}",
        data?.slug ?? "",
    )
    const endPointRefresh = API.MARKETPLACE.INDEX
    const isBookmarked = data?.is_bookmarked
    const slug = data?.slug
    return (
        <div className="px-4 lg:px-0">
            <GobackMobile
                bookmarked={isBookmarked}
                bookmarkEndpoint={endPoint}
                invalidateByPatternKeys={[endPointRefresh]}
                backSlug={slug}
                className="md:hidden px-5"
            />
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[
                    {
                        label: t("marketplace"),
                        href: getHref({ pathname: "/[locale]/marketplace" }),
                    },
                    { label: data?.name },
                ]}
            />
            {isPreview && (
                <h3 className="text-4xl font-medium text-center mt-6">
                    <ClientTranslate translationKey="preview" />
                </h3>
            )}
        </div>
    )
}
