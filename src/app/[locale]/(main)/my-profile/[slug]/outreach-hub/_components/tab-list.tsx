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
                            "/[locale]/my-profile/[slug]/outreach-hub/active",
                        query: { slug: slug },
                    }),
                    label: t("active"),
                    enabled: true,
                    count:
                        (data?.tabs_data_count?.outreach_hub?.active ?? 0) > 0 ?
                            data?.tabs_data_count?.outreach_hub?.active
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            "/[locale]/my-profile/[slug]/outreach-hub/archive",
                        query: { slug: slug },
                    }),
                    label: t("archive"),
                    enabled: true,
                    count:
                        (
                            (data?.tabs_data_count?.outreach_hub?.archive ??
                                0) > 0
                        ) ?
                            data?.tabs_data_count?.outreach_hub?.archive
                        :   null,
                },
            ]}
        />
    )
}
