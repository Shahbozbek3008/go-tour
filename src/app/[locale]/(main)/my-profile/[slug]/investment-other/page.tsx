import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import InvestmentOtherPage from "./_components"

export default async function Page({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    const { slug } = await params
    return (
        <PrefetchProvider
            endpoint={API.PROFILE.INVESTMENT.OTHER_USER_ID.replace(
                "{user_id}",
                slug,
            )}
            options={{ params: { page_size: 12 } }}
        >
            <InvestmentOtherPage />
        </PrefetchProvider>
    )
}
