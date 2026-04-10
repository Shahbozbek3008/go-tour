import { useLocale } from "next-intl"

export const useLanguage = () => {
    const locale = useLocale()
    const isUzbek = locale === "uz"
    const isRussian = locale === "ru"

    return { locale, isUzbek, isRussian }
}
