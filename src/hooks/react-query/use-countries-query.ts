import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Continent } from "@/types/common/extra"
import { useGet, UseGetArgs } from "./use-get"

interface Country {
    id: string
    name: string
    continent: Continent
    image_url: string
}

export const useCountriesQuery = (args?: UseGetArgs<Country[]>) => {
    const res = useGet<Country[]>(API.GLOBAL.COUNTRY_LIST_FOR_FILTER, {
        params: {
            page_size: 1000,
        },
        ...args,
    })

    const countries = getArray(res.data)
    const continents = countries.reduce<
        {
            continent: Continent
            countries: Country[]
        }[]
    >((acc, country) => {
        const existingContinent = acc.find(
            (c) => c.continent === country.continent,
        )
        if (existingContinent) {
            existingContinent.countries.push(country)
        } else {
            acc.push({
                continent: country.continent,
                countries: [country],
            })
        }
        return acc
    }, [])

    return { ...res, countries, continents }
}
