import PageTabs from "@/components/common/page-tabs"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"

export const TabList = () => {
    const t = useTranslations()

    return (
        <PageTabs
            className="bg-transparent"
            tabs={[
                {
                    href: getHref({
                        pathname: "/[locale]/my-profile/[slug]/my-account",
                        query: {
                            locale: "uz",
                            slug: "me",
                        },
                    }),
                    label: t("myAccount"),
                    enabled: true,
                },
                {
                    href: getHref({
                        pathname: "/[locale]/my-profile/[slug]/my-orders",
                        query: {
                            locale: "uz",
                            slug: "me",
                        },
                    }),
                    label: t("myOrders"),
                    enabled: true,
                },
            ]}
        />
    )
}
