import { AIChatModal } from "@/components/common/ai-chat"
import MediaViewerModal from "@/components/common/media-viewer-modal"
import { Toaster } from "@/components/ui/sonner"
import { routing } from "@/i18n/routing"
import { setupServerFetchInterceptors } from "@/lib/api/setup-server-fetch-interceptors"
import { PropsWithChildrenLocale } from "@/types/common"
import { Metadata } from "next"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Public_Sans } from "next/font/google"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Providers from "../_providers"
import "../globals.css"
import FallbackLoader from "./_components/fallback-loader"

const publicSans = Public_Sans({
    variable: "--font-public-sans",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "iNEXLYNK",
    description: "Developed by upgrow.uz",
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<PropsWithChildrenLocale>) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)
    setupServerFetchInterceptors()

    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body
                suppressHydrationWarning
                className={`${publicSans.variable} antialiased`}
            >
                <Suspense fallback={<FallbackLoader />}>
                    <Providers>
                        {children}
                        <Toaster />
                        <MediaViewerModal />
                        <AIChatModal />
                    </Providers>
                </Suspense>
            </body>
        </html>
    )
}
