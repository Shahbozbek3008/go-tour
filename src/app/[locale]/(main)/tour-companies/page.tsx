import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

const TourCompanies = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return <div>TourCompanies</div>
}

export default TourCompanies
