import { LocaleParams } from "@/types/common"
import { setRequestLocale } from "next-intl/server"

export const setLocale = async (params: LocaleParams) => {
    const { locale } = await params
    setRequestLocale(locale)
}
