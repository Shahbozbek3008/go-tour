import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import { FavouriteLayout } from "./_components"

const Favourites = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.TOUR.FAVOURITES_LIST}>
            <FavouriteLayout />
        </PrefetchProvider>
    )
}

export default Favourites
