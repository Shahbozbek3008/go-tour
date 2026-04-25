"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/hooks/use-language"
import { useTourIncludedQuery } from "../../../_hooks"
import { ExclusionList } from "./exclusion-list"
import { InclusionList } from "./inclusion-list"

export const Inclusions = () => {
    const { isRussian } = useLanguage()

    const { included, isLoading } = useTourIncludedQuery()

    if (isLoading || !included) return null

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-7">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    {isRussian ? "Включено в стоимость" : "Narxga kiritilgan"}
                </h2>
                <Separator />
            </div>
            <InclusionList items={included?.included || []} />
            <Separator className="my-2" />
            <ExclusionList items={included?.notIncluded || []} />
        </div>
    )
}
