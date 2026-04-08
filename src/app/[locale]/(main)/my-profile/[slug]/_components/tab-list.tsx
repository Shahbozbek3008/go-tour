"use client"
import { useSlug } from "@/app/_providers/slug-provider"
import { IconBookmark } from "@/assets/icons/bookmark"
import { IconBookmarkActive } from "@/assets/icons/bookmark-active"
import { IconBuildingStore } from "@/assets/icons/building-store"
import { IconBuildingStoreActive } from "@/assets/icons/building-store-active"
import { IconChartLineActive } from "@/assets/icons/chart-line-active"
import IconChartLine from "@/assets/icons/chart-line-icon"
import { IconHeartBeat } from "@/assets/icons/heartbeat"
import { IconHeartBeatActive } from "@/assets/icons/heartbeat-active"
import { IconSpeakerPhone } from "@/assets/icons/speaker-phone"
import { IconSpeakerPhoneActive } from "@/assets/icons/speaker-phone-active"
import { IconUsercheck } from "@/assets/icons/user-check"
import { IconUserCheckActive } from "@/assets/icons/user-check-active"
import { IconUsers } from "@/assets/icons/users"
import { IconUsersActive } from "@/assets/icons/users-active"
import PageTabs from "@/components/common/page-tabs"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useOtherUserInfoQuery } from "../profile-other/_hooks/use-other-user-info-query"

export default function TabList() {
    const t = useTranslations()
    const slug = useSlug()
    const isMe = slug === "me"
    const { data: profileData } = useProfileQuery()
    const { data: otherProfileData } = useOtherUserInfoQuery({
        options: {
            enabled: !isMe,
        },
    })

    const data = isMe ? profileData : otherProfileData

    return (
        <PageTabs
            tabs={[
                {
                    href: getHref({
                        pathname:
                            isMe ?
                                "/[locale]/my-profile/[slug]/profile"
                            :   "/[locale]/my-profile/[slug]/profile-other",
                        query: { slug },
                    }),
                    label: t("profile"),
                    enabled: true,
                    icon: <IconUsercheck />,
                    activeIcon: <IconUserCheckActive />,
                },
                {
                    href: getHref({
                        pathname: "/[locale]/my-profile/[slug]/my-network",
                        query: { slug: slug },
                    }),
                    label: t("myNetwork"),
                    enabled: isMe,
                    icon: <IconUsers />,
                    activeIcon: <IconUsersActive />,
                    count:
                        (data?.tabs_data_count?.network?.total ?? 0) > 0 ?
                            data?.tabs_data_count?.network?.total
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            isMe ?
                                "/[locale]/my-profile/[slug]/marketplace"
                            :   "/[locale]/my-profile/[slug]/marketplace-other",
                        query: { slug: slug },
                    }),
                    label: t("marketplace"),
                    enabled: true,
                    icon: <IconBuildingStore />,
                    activeIcon: <IconBuildingStoreActive />,
                    count:
                        (data?.tabs_data_count?.marketplace?.total ?? 0) > 0 ?
                            data?.tabs_data_count?.marketplace?.total
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            isMe ?
                                "/[locale]/my-profile/[slug]/investment"
                            :   "/[locale]/my-profile/[slug]/investment-other",
                        query: { slug: slug },
                    }),
                    label: t("investment"),
                    enabled: true,
                    icon: <IconChartLine />,
                    activeIcon: <IconChartLineActive />,
                    count:
                        (data?.tabs_data_count?.investment?.total ?? 0) > 0 ?
                            data?.tabs_data_count?.investment?.total
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            isMe ?
                                "/[locale]/my-profile/[slug]/outreach-hub"
                            :   "/[locale]/my-profile/[slug]/outreach-hub-other",
                        query: { slug: slug },
                    }),
                    label: t("outreachhub"),
                    enabled: true,
                    icon: <IconHeartBeat />,
                    activeIcon: <IconHeartBeatActive />,
                    count:
                        (data?.tabs_data_count?.outreach_hub?.total ?? 0) > 0 ?
                            data?.tabs_data_count?.outreach_hub?.total
                        :   null,
                },
                {
                    href: getHref({
                        pathname: "/[locale]/my-profile/[slug]/bookmark",
                        query: { slug: slug },
                    }),
                    label: t("bookmark"),
                    enabled: isMe,
                    icon: <IconBookmark />,
                    activeIcon: <IconBookmarkActive />,
                    count:
                        (data?.tabs_data_count?.bookmark?.total ?? 0) > 0 ?
                            data?.tabs_data_count?.bookmark?.total
                        :   null,
                },
                {
                    href: getHref({
                        pathname:
                            isMe ?
                                "/[locale]/my-profile/[slug]/blogs"
                            :   "/[locale]/my-profile/[slug]/blogs-other",
                        query: { slug: slug },
                    }),
                    label: t("blogs"),
                    enabled: true,
                    icon: <IconSpeakerPhone />,
                    activeIcon: <IconSpeakerPhoneActive />,
                    count:
                        (data?.tabs_data_count?.post?.total ?? 0) > 0 ?
                            data?.tabs_data_count?.post?.total
                        :   null,
                },
            ]}
            className="bg-transparent"
        />
    )
}
