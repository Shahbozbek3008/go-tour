import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import BookmarkNews from "./_components"

export default async function Page({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.BOOKMARK.BLOG}
            options={{ params: { page_size: 12 } }}
        >
            <BookmarkNews />
        </PrefetchProvider>
    )
}
