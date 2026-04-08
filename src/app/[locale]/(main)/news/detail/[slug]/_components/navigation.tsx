"use client"

import Breadcrumb from "@/components/common/breadcrumb"
import { GobackMobile } from "@/components/common/goback-mobile"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useNewDetailQuery } from "../_hooks/use-new-detail-query"

export default function Navigation() {
    const t = useTranslations()
    const { data } = useNewDetailQuery()
    const endPoint = API.BLOG.BOOKMARK_SLUG.replace("{slug}", data?.slug ?? "")
    const endPointRefresh = API.BLOG.INDEX
    const isBookmarked = data?.is_bookmarked
    const slug = data?.slug
    return (
        <>
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[
                    {
                        label: t("news"),
                        href: getHref({ pathname: "/[locale]/news" }),
                    },
                    { label: data?.name },
                ]}
            />
            <GobackMobile
                title={t("news")}
                bookmarked={isBookmarked}
                bookmarkEndpoint={endPoint}
                invalidateByPatternKeys={[endPointRefresh]}
                backSlug={slug}
                className="md:hidden"
            />
        </>
    )
}
