import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

export default function Page({ params }: PropsWithLocaleParams) {
    setLocale(params)
    return <div>About Us</div>
}
