import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { redirect } from "next/navigation"
import { route } from "nextjs-routes"

export default async function Profile({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    const { locale } = await params
    redirect(
        route({
            pathname: "/[locale]/profile/[slug]/my-account",
            query: { locale, slug: "me" },
        }),
    )
}
