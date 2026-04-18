import { API } from "@/lib/constants/api-endpoints"
import { ServerTokenService } from "@/lib/cookies/server-token-service"
import { NextIntlClientProvider } from "next-intl"
import { ModalProvider } from "./modal-provider"
import PrefetchProvider from "./prefetch-provider"
import ReactQueryProvider from "./react-query"

export default async function Providers({
    children,
}: {
    children: React.ReactNode
}) {
    const accessToken = await ServerTokenService.getAccessToken()
    return (
        <NextIntlClientProvider>
            <ReactQueryProvider>
                <PrefetchProvider
                    endpoint={API.PROFILE.INFO.ME}
                    enabled={!!accessToken}
                >
                    <PrefetchProvider
                        endpoint={API.EXTRA.AI_CHAT_START_MESSAGE}
                    >
                        <ModalProvider>{children}</ModalProvider>
                    </PrefetchProvider>
                </PrefetchProvider>
            </ReactQueryProvider>
        </NextIntlClientProvider>
    )
}
