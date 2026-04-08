import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import MyIdentity from "./_components"

export default function Identity({ params }: PropsWithLocaleParams) {
    setLocale(params)
    return (
        <div className="mt-6">
            <MyIdentity />
        </div>
    )
}
