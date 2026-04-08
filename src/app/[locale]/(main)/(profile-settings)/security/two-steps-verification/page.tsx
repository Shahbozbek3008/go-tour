import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import PageComponents from "./_components"

export default function TwoStepsVerification({
    params,
}: PropsWithLocaleParams) {
    setLocale(params)

    return <PageComponents />
}
