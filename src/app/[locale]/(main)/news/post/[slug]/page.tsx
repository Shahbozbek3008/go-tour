import { SlugProvider } from "@/app/_providers/slug-provider"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import NewsPostIndex from "../_components"

export default async function NewsEdit({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    const { slug } = await params
    return (
        <SlugProvider slug={slug}>
            <NewsPostIndex />
        </SlugProvider>
    )
}
