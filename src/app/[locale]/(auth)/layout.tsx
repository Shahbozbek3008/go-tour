import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithChildrenLocale } from "@/types/common"
import LeftSection from "./_components/left-section"

export default function AuthLayout({
    children,
    params,
}: PropsWithChildrenLocale) {
    setLocale(params)
    return (
        <section className="lg:p-2.5 p-8 grid lg:grid-cols-2 gap-[5%] h-screen">
            <LeftSection />
            <main className="flex justify-center items-center py-5">
                <div className="max-w-sm w-full">{children}</div>
            </main>
        </section>
    )
}
