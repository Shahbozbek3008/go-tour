import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import SecurityPage from "./_components"

export default function Security({ params }: PropsWithLocaleParams) {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.PROFILE.DEVICES}>
            <SecurityPage />
        </PrefetchProvider>
    )
}
