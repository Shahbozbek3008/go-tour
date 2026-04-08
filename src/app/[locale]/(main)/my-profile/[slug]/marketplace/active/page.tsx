import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { MarketplaceActive } from "./_components"

export default async function Page({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return <MarketplaceActive />
}
