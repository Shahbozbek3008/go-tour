import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { PropsWithChildren } from "react"
import { ProfileHeader } from "./_components/header"
import { TabList } from "./_components/tab-list"

export default async function Layout({
    params,
    children,
}: PropsWithChildren & PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)

    return (
        <PrefetchProvider endpoint={API.DESTINATION.ALL_DESTINATIONS}>
            <SlugProvider slug={slug}>
                <ProfileHeader />
                <div className="home-container py-6 md:py-10">
                    <TabList />
                    <div className="my-5 md:my-8 pb-24 md:pb-0">{children}</div>
                </div>
            </SlugProvider>
        </PrefetchProvider>
    )
}
