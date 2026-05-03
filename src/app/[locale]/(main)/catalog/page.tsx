import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { CatalogLayout } from "./_components/catalog-layout"

const Catalog = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.TOUR.SEARCH}>
            <PrefetchProvider endpoint={API.DESTINATION.ALL_DESTINATIONS}>
                <CatalogLayout />
            </PrefetchProvider>
        </PrefetchProvider>
    )
}

export default Catalog
