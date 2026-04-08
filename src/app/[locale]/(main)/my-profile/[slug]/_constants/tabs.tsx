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
import { PageTab } from "@/components/common/page-tabs"
import { getHref } from "@/lib/utils/get-href"
import { RouteLiteral } from "nextjs-routes"

export const getLayoutTabs = ({
    isMe,
    slug,
}: {
    isMe: boolean
    slug: string
}): (PageTab & { postLink?: RouteLiteral })[] => [
    {
        href: getHref({
            pathname:
                isMe ?
                    "/[locale]/my-profile/[slug]/profile"
                :   "/[locale]/my-profile/[slug]/profile-other",
            query: { slug },
        }),
        label: "Profile",
        enabled: true,
        icon: <IconUsercheck />,
        activeIcon: <IconUserCheckActive />,
    },
    {
        href: getHref({
            pathname: "/[locale]/my-profile/[slug]/my-network/connections",
            query: { slug: slug },
        }),
        label: "My Network",
        enabled: isMe,
        icon: <IconUsers />,
        activeIcon: <IconUsersActive />,
    },
    {
        href: getHref({
            pathname:
                isMe ?
                    "/[locale]/my-profile/[slug]/marketplace"
                :   "/[locale]/my-profile/[slug]/marketplace-other",
            query: { slug: slug },
        }),
        label: "Marketplace",
        enabled: true,
        icon: <IconBuildingStore />,
        activeIcon: <IconBuildingStoreActive />,
        postLink: getHref({ pathname: "/[locale]/marketplace/post" }),
    },
    {
        href: getHref({
            pathname:
                isMe ?
                    "/[locale]/my-profile/[slug]/investment"
                :   "/[locale]/my-profile/[slug]/investment-other",
            query: { slug: slug },
        }),
        label: "Investment",
        enabled: true,
        icon: <IconChartLine />,
        activeIcon: <IconChartLineActive />,
        postLink: getHref({ pathname: "/[locale]/investment/post" }),
    },
    {
        href: getHref({
            pathname:
                isMe ?
                    "/[locale]/my-profile/[slug]/outreach-hub"
                :   "/[locale]/my-profile/[slug]/outreach-hub-other",
            query: { slug: slug },
        }),
        label: "Outreach Hub",
        enabled: true,
        icon: <IconHeartBeat />,
        activeIcon: <IconHeartBeatActive />,
        postLink: getHref({ pathname: "/[locale]/outreach-hub/post" }),
    },
    {
        href: getHref({
            pathname: "/[locale]/my-profile/[slug]/bookmark",
            query: { slug: slug },
        }),
        label: "Bookmark",
        enabled: isMe,
        icon: <IconBookmark />,
        activeIcon: <IconBookmarkActive />,
    },
    {
        href: getHref({
            pathname: "/[locale]/my-profile/[slug]/blogs",
            query: { slug: slug },
        }),
        label: "Blogs",
        enabled: true,
        icon: <IconSpeakerPhone />,
        activeIcon: <IconSpeakerPhoneActive />,
    },
]
