import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import Index from "./_components"
import { AdditionalPageType } from "./_types"

export default async function PrivacyPolicyDetail({
    params,
}: PropsWithLocaleSlug<AdditionalPageType>) {
    const { slug } = await params
    setLocale(params)
    return (
        <PrefetchProvider
            endpoint={API.EXTRA.ADDITIONAL_PAGE_SLUG.replace("{slug}", slug)}
        >
            <SlugProvider slug={slug}>
                <Index />
            </SlugProvider>
        </PrefetchProvider>
    )
}
