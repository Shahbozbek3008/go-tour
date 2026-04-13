import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"

export default function MyOrders({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.PROFILE.INFO.DISPLAY_PERMISSION}>
            <PrefetchProvider endpoint={API.PROFILE.BUSINESS}>
                <p>my orders</p>
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
