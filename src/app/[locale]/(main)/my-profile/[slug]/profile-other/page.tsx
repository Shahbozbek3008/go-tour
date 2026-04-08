import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import ProfileIndex from "./_components"

export default async function Profile({ params }: PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.OTHER.USER_INFO.replace("{user_id}", slug)}
        >
            <ProfileIndex />
        </PrefetchProvider>
    )
}
