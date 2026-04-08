import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import SetNewPassword from "./_components"

export default function Page({ params }: PropsWithLocaleParams) {
    setLocale(params)
    return <SetNewPassword />
}
