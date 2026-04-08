"use client"

import { useSlug } from "@/app/_providers/slug-provider"
import PageTabs from "@/components/common/page-tabs"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"

export const TabList = () => {
    const t = useTranslations()
    const { data } = useProfileQuery()
    const slug = useSlug()
    return (
        <PageTabs
            tabs={[
                {
                    href: getHref({
                        pathname:
                            "/[locale]/my-profile/[slug]/bookmark/marketplace",
                        query: { slug: slug },
                    }),
                    label: t("marketplace"),
                    enabled: true,
                    count:
                        (
                            (data?.tabs_data_count?.bookmark?.marketplace ??
                                0) > 0
                        ) ?
                            data?.tabs_data_count?.bookmark?.marketplace
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            "/[locale]/my-profile/[slug]/bookmark/investment",
                        query: { slug: slug },
                    }),
                    label: t("investment"),
                    enabled: true,
                    count:
                        (data?.tabs_data_count?.bookmark?.investment ?? 0) > 0 ?
                            data?.tabs_data_count?.bookmark?.investment
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            "/[locale]/my-profile/[slug]/bookmark/outreach-hub",
                        query: { slug: slug },
                    }),
                    label: t("outreachhub"),
                    enabled: true,
                    count:
                        (
                            (data?.tabs_data_count?.bookmark?.outreach_hub ??
                                0) > 0
                        ) ?
                            data?.tabs_data_count?.bookmark?.outreach_hub
                        :   null,
                },
                {
                    href: getHref({
                        pathname: "/[locale]/my-profile/[slug]/bookmark/news",
                        query: { slug: slug },
                    }),
                    label: t("news"),
                    enabled: true,
                    count:
                        (data?.tabs_data_count?.bookmark?.post ?? 0) > 0 ?
                            data?.tabs_data_count?.bookmark?.post
                        :   null,
                },
            ]}
        />
    )
}
