import { SlugProvider } from "@/app/_providers/slug-provider"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { PropsWithChildren } from "react"
import { ProfileSlugHeader } from "./_components/header"
import { TabList } from "./_components/tab-list"

export default async function Layout({
    params,
    children,
}: PropsWithChildren & PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)

    return (
        <SlugProvider slug={slug}>
            {/* <PrefetchProvider
                endpoint={API.PROFILE.OTHER.USER_INFO.replace(
                    "{user_id}",
                    slug,
                )}
            >
                <PrefetchProvider
                    endpoint={API.PROFILE.INFO.DISPLAY_PERMISSION}
                > */}
            <ProfileSlugHeader />
            <div className="lg:p-15 px-6 py-10">
                <TabList />
                <div className="my-8">{children}</div>
            </div>
            {/* </PrefetchProvider>
            </PrefetchProvider> */}
        </SlugProvider>
    )
}
