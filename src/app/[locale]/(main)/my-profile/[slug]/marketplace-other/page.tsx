import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import MarketplaceOtherPage from "./_components"

export default async function Page({ params }: PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.MARKETPLACE.OTHER_USER_ID.replace(
                "{user_id}",
                slug,
            )}
            options={{ params: { page_size: 12 } }}
        >
            <MarketplaceOtherPage />
        </PrefetchProvider>
    )
}
