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
                            "/[locale]/my-profile/[slug]/my-network/connections",
                        query: { slug: slug },
                    }),
                    label: t("connections"),
                    enabled: true,
                    count:
                        (data?.tabs_data_count?.network?.connection ?? 0) > 0 ?
                            data?.tabs_data_count?.network?.connection
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            "/[locale]/my-profile/[slug]/my-network/invititations",
                        query: { slug: slug },
                    }),
                    label: t("invitations"),
                    enabled: true,
                    count:
                        (data?.tabs_data_count?.network?.invitation ?? 0) > 0 ?
                            data?.tabs_data_count?.network?.invitation
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            "/[locale]/my-profile/[slug]/my-network/black-list",
                        query: { slug: slug },
                    }),
                    label: t("blackList"),
                    enabled: true,
                    count:
                        (data?.tabs_data_count?.network?.blacklist ?? 0) > 0 ?
                            data?.tabs_data_count?.network?.blacklist
                        :   null,
                },
            ]}
        />
    )
}
