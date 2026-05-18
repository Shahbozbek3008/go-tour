import { API } from "@/lib/constants/api-endpoints"
import { ServerCurrencyService } from "@/lib/cookies/server-currency-service"
import { ServerTokenService } from "@/lib/cookies/server-token-service"
import { NextIntlClientProvider } from "next-intl"
import { CurrencyProvider } from "./currency-provider"
import { ModalProvider } from "./modal-provider"
import PrefetchProvider from "./prefetch-provider"
import ReactQueryProvider from "./react-query"

export default async function Providers({
    children,
}: {
    children: React.ReactNode
}) {
    const accessToken = await ServerTokenService.getAccessToken()
    const initialCurrency = await ServerCurrencyService.getCurrency()

    console.log(accessToken, "access-token")
    return (
        <NextIntlClientProvider>
            <ReactQueryProvider>
                <CurrencyProvider initialCurrency={initialCurrency}>
                    <PrefetchProvider
                        endpoint={API.PROFILE.INFO.ME}
                        enabled={!!accessToken}
                    >
                        <ModalProvider>{children}</ModalProvider>
                    </PrefetchProvider>
                </CurrencyProvider>
            </ReactQueryProvider>
        </NextIntlClientProvider>
    )
}
