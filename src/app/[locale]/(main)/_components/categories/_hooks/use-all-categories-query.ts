import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"

interface Category {
    category: string
    imageUrl: string
    order: number
}

export const useAllCategoriesQuery = (args?: UseGetArgs<Category[]>) => {
    const res = useGet<Category[]>(API.CATEGORIES.ALL, args)
    const allCategories = getArray(res?.data)

    return { ...res, allCategories }
}
