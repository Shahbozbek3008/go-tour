import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { InvitationsPage } from "./_components"

export default async function Invitations({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return <InvitationsPage />
}
