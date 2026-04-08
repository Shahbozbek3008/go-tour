"use client"

import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref, RouteWithoutLocale } from "@/lib/utils/get-href"
import { Input, InputProps } from "../ui/input"

interface Props extends InputProps {
    searchKey?: string
    currentPageKey?: string
}

export default function FilterInput({
    searchKey = SEARCH_PARAMS.SEARCH,
    currentPageKey = SEARCH_PARAMS.PAGE,
    ...props
}: Props) {
    // const { t } = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const jsonParams = useSearch({ jsonParse: false })

    const onChange = (val: string) => {
        requestAnimationFrame(() => {
            router.replace(
                getHref({
                    pathname,
                    query: {
                        ...jsonParams,
                        [searchKey]: val ? JSON.stringify(val) : undefined,
                        [currentPageKey]: undefined,
                    },
                } as RouteWithoutLocale),
            )
        })
    }

    return (
        <Input
            type="search"
            handleDebouncedInputValue={onChange}
            // placeholder={t("search")}
            {...props}
        />
    )
}
