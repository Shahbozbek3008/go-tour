import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import ProfileIndex from "./_components"

export default function Profile({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.PROFILE.INFO.DISPLAY_PERMISSION}>
            <PrefetchProvider endpoint={API.PROFILE.BUSINESS}>
                <ProfileIndex />
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
