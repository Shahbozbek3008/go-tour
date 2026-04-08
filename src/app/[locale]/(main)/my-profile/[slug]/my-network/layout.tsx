import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { PropsWithChildren } from "react"
import { TabList } from "./_components/tab-list"

export default async function Layout({
    params,
    children,
}: PropsWithChildren & PropsWithLocaleSlug) {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.PROFILE.NETWORK.CONNECTIONS}>
            <PrefetchProvider endpoint={API.PROFILE.NETWORK.INVITATIONS}>
                <PrefetchProvider endpoint={API.PROFILE.NETWORK.BLOCKS}>
                    <TabList />
                    <div className="my-6">{children}</div>
                </PrefetchProvider>
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
