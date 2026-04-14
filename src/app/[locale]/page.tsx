import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import Index from "./(main)/_components"

export default function Home({ params }: PropsWithLocaleParams) {
    setLocale(params)

    return (
        <>
            {/* <PrefetchProvider
                endpoint={API.MARKETPLACE.HOME_PAGE_PRODUCT_CATEGORIES}
                options={{ params: { page_size: 10 } }}
            >
                <PrefetchProvider
                    endpoint={API.MARKETPLACE.HOME_PAGE_SERVICE_CATEGORIES}
                    options={{ params: { page_size: 10 } }}
                >
                    <PrefetchProvider endpoint={API.EXTRA.PARTNERS}> */}
            <Index />
            {/* </PrefetchProvider>
                </PrefetchProvider>
            </PrefetchProvider> */}
        </>
    )
}
