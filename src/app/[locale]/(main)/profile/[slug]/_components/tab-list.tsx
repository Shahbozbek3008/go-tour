"use client"

import PageTabs from "@/components/common/page-tabs"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

export const TabList = () => {
    const t = useTranslations()
    const params = useParams()
    const locale = (params?.locale as string) || "uz"
    const slug = (params?.slug as string) || "me"

    return (
        <PageTabs
            tabs={[
                {
                    href: getHref({
                        pathname: "/[locale]/profile/[slug]/my-account",
                        query: {
                            locale: (locale as string) || "uz",
                            slug: (slug as string) || "me",
                        },
                    } as any),
                    label: t("myAccount"),
                    enabled: true,
                },
                {
                    href: getHref({
                        pathname: "/[locale]/profile/[slug]/my-orders",
                        query: {
                            locale: (locale as string) || "uz",
                            slug: (slug as string) || "me",
                        },
                    } as any),
                    label: t("myOrders"),
                    enabled: true,
                },
            ]}
        />
    )
}
