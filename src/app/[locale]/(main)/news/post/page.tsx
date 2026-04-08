import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import NewsPostIndex from "./_components"

export default function Post({ params }: PropsWithLocaleSlug) {
    setLocale(params)

    return (
        <>
            <NewsPostIndex />
        </>
    )
}
