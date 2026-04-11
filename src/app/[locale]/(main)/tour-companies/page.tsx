import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import { TourCompaniesForm } from "./_components"

const TourCompanies = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return <TourCompaniesForm />
}

export default TourCompanies
