import { useLocale } from "next-intl"

export const useLanguage = () => {
    const locale = useLocale()
    const isArabic = locale === "ar"
    const isUzbek = locale === "uz"
    const isRussian = locale === "ru"

    return { locale, isArabic, isUzbek, isRussian }
}
