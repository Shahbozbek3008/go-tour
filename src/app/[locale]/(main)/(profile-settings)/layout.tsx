import { IconLock } from "@/assets/icons/lock"
import { IconLockActive } from "@/assets/icons/look-active"
import { IconUsercheck } from "@/assets/icons/user-check"
import { IconUserCheckActive } from "@/assets/icons/user-check-active"
import Breadcrumb from "@/components/common/breadcrumb"
import PageTabs from "@/components/common/page-tabs"
import ProfileSettingsTitle from "@/components/common/profile-settings-title"
import { setLocale } from "@/lib/next-intl/set-locale"
import { getHref } from "@/lib/utils/get-href"
import { PropsWithChildrenLocale } from "@/types/common"
import { useTranslations } from "next-intl"

export default function Layout({ params, children }: PropsWithChildrenLocale) {
    const t = useTranslations()
    setLocale(params)
    return (
        <div className="home-container flex flex-col gap-6 clamp-[mt,4,10] clamp-[mb,14,19]">
            <Breadcrumb
                crumbs={[{ label: t("profileSettings") }]}
                className="hidden md:flex"
            />
            <ProfileSettingsTitle />
            <PageTabs
                className="bg-transparent"
                tabs={[
                    {
                        href: getHref({ pathname: "/[locale]/account" }),
                        label: t("account"),
                        enabled: true,
                        icon: <IconUsercheck />,
                        activeIcon: <IconUserCheckActive />,
                    },
                    {
                        href: getHref({ pathname: "/[locale]/security" }),
                        label: t("security"),
                        enabled: true,
                        icon: <IconLock />,
                        activeIcon: <IconLockActive />,
                    },
                ]}
            />
            {children}
        </div>
    )
}
