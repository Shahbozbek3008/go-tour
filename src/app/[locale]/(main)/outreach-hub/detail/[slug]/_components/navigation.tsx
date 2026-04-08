"use client"

import Breadcrumb from "@/components/common/breadcrumb"
import { GobackMobile } from "@/components/common/goback-mobile"
import ClientTranslate from "@/components/common/translation/client-translate"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useOutreachhubItemQuery } from "../_hooks/use-outreachhub-item-query"

export default function Navigation() {
    const t = useTranslations()
    const { data, isPreview } = useOutreachhubItemQuery()
    const endPoint = API.OUT_REACH_HUB.BOOKMARK_SLUG.replace(
        "{slug}",
        data?.slug ?? "",
    )
    const endPointRefresh = API.OUT_REACH_HUB.LIST
    const isBookmarked = data?.is_bookmarked
    const slug = data?.slug
    return (
        <div className="home-container clamp-[pt,6,10]">
            <GobackMobile
                bookmarked={isBookmarked}
                bookmarkEndpoint={endPoint}
                invalidateByPatternKeys={[endPointRefresh]}
                backSlug={slug}
                className="md:hidden mb-6"
            />
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[
                    {
                        label: t("outreachhub"),
                        href: getHref({ pathname: "/[locale]/outreach-hub" }),
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
