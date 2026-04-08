import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { BlackListPage } from "./_components"

export default async function BlackList({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return <BlackListPage />
}
