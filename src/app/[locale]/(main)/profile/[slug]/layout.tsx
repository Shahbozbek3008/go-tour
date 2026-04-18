import { SlugProvider } from "@/app/_providers/slug-provider"
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
        <SlugProvider slug={slug}>
            <ProfileHeader />
            <div className="home-container py-10">
                <TabList />
                <div className="my-8">{children}</div>
            </div>
            {/* </PrefetchProvider>
            </PrefetchProvider> */}
        </SlugProvider>
    )
}
