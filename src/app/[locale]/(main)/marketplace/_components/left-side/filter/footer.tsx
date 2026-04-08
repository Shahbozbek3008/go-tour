"use client"

import { IconRankingUsers } from "@/assets/icons/ranking-users"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import useSearch from "@/hooks/use-search"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function FilterFooter() {
    const params = useSearch()
    const router = useRouter()
    const { updateChat } = useAiPersist()
    const handleClear = () => {
        router.replace(getHref({ pathname: "/[locale]/marketplace" }))
        updateChat<"marketplace_filter">(
            {
                categories: [],
                countries: [],
                requestTypes: [],
                tags: [],
            },
            "marketplace_filter",
        )
    }
    return (
        <>
            <div className="md:hidden flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <IconRankingUsers />
                    <div>
                        <ClientTranslate translationKey="topRankingUsers" />
                    </div>
                </div>
                <Switch />
            </div>

            <div className="max-md:flex max-md:items-center max-md:justify-between max-md:gap-2">
                <Button
                    onClick={handleClear}
                    disabled={
                        !params.countries &&
                        !params.category &&
                        !params.request_type
                    }
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
        </>
    )
}
