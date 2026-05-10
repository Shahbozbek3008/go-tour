import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { ComponentIndex } from "./_components"

export default function MyOrders({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.BOOKING.MY}>
            <ComponentIndex />
        </PrefetchProvider>
    )
}
