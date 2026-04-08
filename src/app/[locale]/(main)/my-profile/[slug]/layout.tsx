import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import ProfileSettingsTitle from "@/components/common/profile-settings-title"
import { serverGetRequest } from "@/lib/api/server-requests"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { ProfileInfo } from "@/types/common/profile"
import { PropsWithChildren } from "react"
import Header from "./_components"
import TabList from "./_components/tab-list"
import BreadCrumbProfile from "./bread-crumb-profile"

export default async function Layout({
    params,
    children,
}: PropsWithChildren & PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)
    const isMe = slug === "me"
    const res =
        isMe ? null : (
            await serverGetRequest<ProfileInfo>(
                API.PROFILE.OTHER.USER_INFO.replace("{user_id}", slug),
            )
        )

    return (
        <SlugProvider slug={slug}>
            <PrefetchProvider
                endpoint={API.PROFILE.OTHER.USER_INFO.replace(
                    "{user_id}",
                    slug,
                )}
            >
                <PrefetchProvider
                    endpoint={API.PROFILE.INFO.DISPLAY_PERMISSION}
                >
                    <div className="home-container clamp-[mt,4,10] clamp-[mb,14,19]">
                        <BreadCrumbProfile isMe={isMe} res={res} />
                        <ProfileSettingsTitle />
                        <Header />
                        <div className="mt-6">
                            <TabList />
                        </div>
                        <div className="my-8">{children}</div>
                    </div>
                </PrefetchProvider>
            </PrefetchProvider>
        </SlugProvider>
    )
}
