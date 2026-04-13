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
        // <PrefetchProvider
        //     endpoint={API.BLOG.NEWS}
        //     options={{ params: { page_size: 13 } }}
        // >
        //     <PrefetchProvider endpoint={API.EXTRA.MAIN_SITE_INFO}>
        //         <PrefetchProvider
        //             endpoint={API.EXTRA.ADDITIONAL_PAGES}
        //             options={{ params: { page_size: 100 } }}
        //         >
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        //         </PrefetchProvider>
        //     </PrefetchProvider>
        // </PrefetchProvider>
    )
}
