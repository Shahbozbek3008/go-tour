import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import Index from "./_components"

export default async function Page({ params }: PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)

    return (
        <PrefetchProvider endpoint={API.BLOG.LIST_SLUG.replace("{slug}", slug)}>
            <SlugProvider slug={slug}>
                <Index />
            </SlugProvider>
        </PrefetchProvider>
    )
}
