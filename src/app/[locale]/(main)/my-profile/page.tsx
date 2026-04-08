import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { redirect } from "next/navigation"
import { route } from "nextjs-routes"

export default async function MyProfile({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    const { locale } = await params
    redirect(
        route({
            pathname: "/[locale]/my-profile/[slug]/profile",
            query: { locale, slug: "me" },
        }),
    )
}
