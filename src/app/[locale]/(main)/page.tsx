import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import Index from "./_components"

export default function Home({ params }: PropsWithLocaleParams) {
    setLocale(params)

    return (
        <PrefetchProvider endpoint={API.BANNER}>
            <PrefetchProvider endpoint={API.TOUR.SEARCH}>
                <PrefetchProvider endpoint={API.TOUR.TOP_SELLING}>
                    <PrefetchProvider endpoint={API.TOUR.PROMOTIONAL}>
                        <PrefetchProvider endpoint={API.CATEGORIES.ALL}>
                            <PrefetchProvider endpoint={API.AGENTS.ALL}>
                                <PrefetchProvider
                                    endpoint={API.DESTINATION.HOME}
                                >
                                    <Index />
                                </PrefetchProvider>
                            </PrefetchProvider>
                        </PrefetchProvider>
                    </PrefetchProvider>
                </PrefetchProvider>
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
