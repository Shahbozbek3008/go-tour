import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithChildrenLocale } from "@/types/common"
import dynamic from "next/dynamic"
import { Navbar } from "./_components/navbar"

const Footer = dynamic(() => import("./_components/footer"))

export default async function Layout({
    children,
    params,
}: PropsWithChildrenLocale) {
    setLocale(params)

    return (
        <PrefetchProvider endpoint={API.TOUR.SHORT_DATA}>
            <PrefetchProvider endpoint={API.TOUR.RECOMMENDED}>
                <div className="min-h-screen flex flex-col justify-between">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
