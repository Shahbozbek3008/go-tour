"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useCountriesQuery } from "@/hooks/react-query/use-countries-query"
import useSearch from "@/hooks/use-search"
import { useRouter } from "@/i18n/navigation"
import { getArray } from "@/lib/utils/get-array"
import { getHref } from "@/lib/utils/get-href"
import { CheckedState } from "@radix-ui/react-checkbox"
import { GlobeIcon } from "lucide-react"
import { useMemo } from "react"

export const RegionFilter = () => {
    const { continents } = useCountriesQuery()
    const params = useSearch()
    const jsonParams = useSearch({ jsonParse: false })
    const countriesIds = getArray(params.country)
    const router = useRouter()

    const selectedSet = useMemo(() => new Set(countriesIds), [countriesIds])

    const continentCounts = useMemo(() => {
        const map = new Map<string, number>()
        for (const c of continents) {
            let count = 0
            for (const country of c.countries) {
                if (selectedSet.has(country.id)) count++
            }
            map.set(c.continent, count)
        }
        return map
    }, [continents, selectedSet])

    const handleOnCheckedChange = ({
        countryId,
        checked,
    }: {
        countryId: string
        checked: CheckedState
    }) => {
        const isChecked = checked === true
        const next =
            isChecked ?
                [...countriesIds, countryId]
            :   countriesIds.filter((id) => id !== countryId)

        router.replace(
            getHref({
                pathname: "/[locale]/companies",
                query: {
                    ...jsonParams,
                    country: next.length ? JSON.stringify(next) : undefined,
                },
            }),
        )
    }

    return (
        <div className="w-full space-y-3">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="region">
                    <AccordionTrigger className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-base font-medium">
                            <GlobeIcon className="w-4 h-4" />
                            <span>
                                <ClientTranslate translationKey="region" />
                            </span>
                            {countriesIds.length > 0 && (
                                <Badge
                                    variant="outline"
                                    className="ml-2 !p-0 h-6 min-w-6 inline-flex items-center justify-center text-xs font-semibold bg-primary leading-none text-white rounded-full"
                                >
                                    {countriesIds.length}
                                </Badge>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                        <div className="space-y-4">
                            {continents.map((region) => {
                                const selectedInThis =
                                    continentCounts.get(region.continent) ?? 0

                                return (
                                    <Accordion
                                        key={region.continent}
                                        type="single"
                                        collapsible
                                        className="border-none"
                                    >
                                        <AccordionItem value={region.continent}>
                                            <AccordionTrigger className="capitalize text-sm font-medium text-black hover:no-underline">
                                                {region.continent}
                                                {selectedInThis > 0 && (
                                                    <Badge
                                                        variant={"outline"}
                                                        className="ml-1 p-0 h-5 min-w-5 inline-flex items-center justify-center text-tiny font-semibold bg-primary leading-none text-white rounded-full"
                                                    >
                                                        {selectedInThis}
                                                    </Badge>
                                                )}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col gap-3 pl-2 pt-1">
                                                    {region.countries.map(
                                                        (country) => (
                                                            <label
                                                                key={country.id}
                                                                className="flex items-center gap-2 text-sm  cursor-pointer"
                                                            >
                                                                <Checkbox
                                                                    checked={selectedSet.has(
                                                                        country.id,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleOnCheckedChange(
                                                                            {
                                                                                checked,
                                                                                countryId:
                                                                                    country.id,
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                                {country.name}
                                                            </label>
                                                        ),
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
