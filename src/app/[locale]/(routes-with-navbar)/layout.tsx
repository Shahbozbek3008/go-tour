import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithChildrenLocale } from "@/types/common"
import { Navbar } from "../(main)/_components/navbar"

export default function Layout({ params, children }: PropsWithChildrenLocale) {
    setLocale(params)
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex-1">{children}</main>
        </div>
    )
}
