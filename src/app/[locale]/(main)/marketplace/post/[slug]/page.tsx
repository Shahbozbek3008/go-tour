import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import MarketplacePostIndex from "../_components"

export default async function MarketplaceEdit({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    const { slug } = await params
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.MARKETPLACE.SLUG.replace("{slug}", slug)}
        >
            <SlugProvider slug={slug}>
                <MarketplacePostIndex />
            </SlugProvider>
        </PrefetchProvider>
    )
}
