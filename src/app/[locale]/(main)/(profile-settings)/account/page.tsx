import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import { redirect } from "next/navigation"
import { route } from "nextjs-routes"

export default async function Page({ params }: PropsWithLocaleParams) {
    setLocale(params)
    const { locale } = await params
    redirect(
        route({ pathname: "/[locale]/account/identity", query: { locale } }),
    )
}
