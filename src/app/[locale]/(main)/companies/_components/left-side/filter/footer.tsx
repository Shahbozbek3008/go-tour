"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import useSearch from "@/hooks/use-search"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function FilterFooter() {
    const params = useSearch()
    const router = useRouter()
    const handleClear = () => {
        router.replace(getHref({ pathname: "/[locale]/companies" }))
    }
    return (
        <div className="max-md:flex max-md:items-center max-md:justify-between max-md:gap-2">
            <Button
                onClick={handleClear}
                disabled={!params.country && !params.business_type}
                className="max-md:bg-white max-md:text-black flex-1 md:w-full"
            >
                <ClientTranslate translationKey="clear" />{" "}
                <span className="md:hidden">
                    <ClientTranslate translationKey="all" />
                </span>
            </Button>
            <Button className="md:hidden flex-1" variant={"gradient"}>
                <ClientTranslate translationKey="apply" />
            </Button>
        </div>
    )
}
