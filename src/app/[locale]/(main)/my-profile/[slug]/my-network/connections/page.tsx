import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { ConnectionsPage } from "./_components"

export default async function Connections({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return <ConnectionsPage />
}
