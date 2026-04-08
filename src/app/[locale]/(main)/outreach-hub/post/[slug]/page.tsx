import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import OutreachHubPostIndex from "../_components"

export default async function OutreachHubItemEdit({
    params,
}: PropsWithLocaleSlug) {
    setLocale(params)
    const { slug } = await params
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.OUTREACH_HUB.SLUG.replace("{slug}", slug)}
        >
            <SlugProvider slug={slug}>
                <OutreachHubPostIndex />
            </SlugProvider>
        </PrefetchProvider>
    )
}
