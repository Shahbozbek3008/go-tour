import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import Index from "./_components"

export default function Page({ params }: PropsWithLocaleParams) {
    setLocale(params)

    return (
        <PrefetchProvider
            endpoint={API.NOTIFICATIONS.EXTRA_NOTIFICATIONS}
            options={{
                params: {
                    source_type: undefined,
                },
            }}
        >
            <Index />
        </PrefetchProvider>
    )
}
