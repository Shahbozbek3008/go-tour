import { Toaster } from "@/components/ui/sonner"
import { routing } from "@/i18n/routing"
import { setupServerFetchInterceptors } from "@/lib/api/setup-server-fetch-interceptors"
import { PropsWithChildrenLocale } from "@/types/common"
import { Metadata } from "next"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Providers from "../_providers"
import "../globals.css"
import FallbackLoader from "./_components/fallback-loader"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: "Go Tour",
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
        <html lang={locale}>
            <body
                suppressHydrationWarning
                className={`${inter.variable} antialiased`}
            >
                <Suspense fallback={<FallbackLoader locale={locale} />}>
                    <Providers>
                        {children}
                        <Toaster />
                    </Providers>
                </Suspense>
            </body>
        </html>
    )
}
