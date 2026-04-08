import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithChildrenLocale } from "@/types/common"

export default function Layout({ children, params }: PropsWithChildrenLocale) {
    setLocale(params)
    return (
        <PrefetchProvider
            endpoint={API.BLOG.LIST}
            options={{ params: { page_size: 12 } }}
        >
            <section className="home-container clamp-[pt,6,10] pb-[7%]">
                {children}
            </section>
        </PrefetchProvider>
    )
}
