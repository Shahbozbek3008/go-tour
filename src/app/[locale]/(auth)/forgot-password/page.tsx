import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import Index from "./_components"

export default function Page({ params }: PropsWithLocaleParams) {
    setLocale(params)
    return (
        <>
            <Index />
        </>
    )
}
