import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import { MyAccountForm } from "./_components"

export default function MyAccount({ params }: PropsWithLocaleSlug) {
    setLocale(params)
    return (
        // <PrefetchProvider endpoint={API.PROFILE.INFO.DISPLAY_PERMISSION}>
        //     <PrefetchProvider endpoint={API.PROFILE.BUSINESS}>
        <MyAccountForm />
        // </PrefetchProvider>
        // </PrefetchProvider>
    )
}
