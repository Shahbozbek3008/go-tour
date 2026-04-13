import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

const Favourites = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return <div className="w-full">favourites</div>
}

export default Favourites
