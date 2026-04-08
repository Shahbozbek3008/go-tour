import PageTabs from "@/components/common/page-tabs"
import { setLocale } from "@/lib/next-intl/set-locale"
import { getHref } from "@/lib/utils/get-href"
import { PropsWithChildrenLocale } from "@/types/common"
import { useTranslations } from "next-intl"

export default function Layout({ params, children }: PropsWithChildrenLocale) {
    const t = useTranslations()
    setLocale(params)
    return (
        <>
            <PageTabs
                tabs={[
                    {
                        href: getHref({
                            pathname: "/[locale]/account/identity",
                        }),
                        label: t("myIdentity"),
                        enabled: true,
                    },
                    {
                        href: getHref({
                            pathname: "/[locale]/account/business",
                        }),
                        label: t("myBusiness"),
                        enabled: true,
                    },
                ]}
            />
            {children}
        </>
    )
}
