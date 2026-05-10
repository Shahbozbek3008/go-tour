import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { MyAccountForm } from "./_components"

export default function MyAccount({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return <MyAccountForm />
}
