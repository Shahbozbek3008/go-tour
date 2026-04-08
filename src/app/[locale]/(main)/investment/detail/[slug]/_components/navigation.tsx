"use client"

import Breadcrumb from "@/components/common/breadcrumb"
import { GobackMobile } from "@/components/common/goback-mobile"
import ClientTranslate from "@/components/common/translation/client-translate"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useInvestmentItemQuery } from "../_hooks/use-investment-item-query"

export default function Navigation() {
    const t = useTranslations()
    const { data, isPreview } = useInvestmentItemQuery()
    const endPoint = API.INVESTMENT.INVESTMENT_ITEMS.SLUG_BOOKMARK.replace(
        "{slug}",
        data?.slug ?? "",
    )
    const endPointRefresh = API.INVESTMENT.INVESTMENT_ITEMS.INDEX
    const isBookmarked = data?.is_bookmarked
    const slug = data?.slug
    return (
        <>
            <GobackMobile
                bookmarked={isBookmarked}
                bookmarkEndpoint={endPoint}
                invalidateByPatternKeys={[endPointRefresh]}
                backSlug={slug}
                className="md:hidden"
            />
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[
                    {
                        label: t("investment"),
                        href: getHref({ pathname: "/[locale]/investment" }),
                    },
                    { label: data?.name },
                ]}
            />
            {isPreview && (
                <h3 className="text-4xl font-medium text-center mt-6">
                    <ClientTranslate translationKey="preview" />
                </h3>
            )}
        </>
    )
}
