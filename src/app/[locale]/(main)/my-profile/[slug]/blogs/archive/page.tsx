import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { BlogArchive } from "./_components"

export default async function Page({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.BLOG.ARCHIVE}
            options={{ params: { page_size: 12 } }}
        >
            <BlogArchive />
        </PrefetchProvider>
    )
}
