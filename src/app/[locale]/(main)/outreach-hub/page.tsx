import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import Index from "./_components"

export default async function Page({ params }: PropsWithLocaleParams) {
    setLocale(params)

    return (
        <>
            <PrefetchProvider
                endpoint={API.GLOBAL.COUNTRY_LIST_FOR_FILTER}
                options={{
                    params: {
                        page_size: 1000,
                    },
                }}
            >
                <PrefetchProvider
                    endpoint={API.OUT_REACH_HUB.LIST}
                    options={{
                        params: {
                            page_size: 12,
                        },
                    }}
                >
                    <Index />
                </PrefetchProvider>
            </PrefetchProvider>
        </>
    )
}
