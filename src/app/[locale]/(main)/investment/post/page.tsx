import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import InvestmentFormIndex from "./_components"

const Page = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)

    return <InvestmentFormIndex />
}

export default Page
