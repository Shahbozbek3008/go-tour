import { useGet } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"

export type Banner = {
    imageUrl: string | null
    imageUrlRu: string | null
    tourId: number | null
    active: boolean
    tourCategory: string | null
    agentId: number | null
    icon: string
    titleUz: string
    titleRu: string
    badge: string | null
    order: number
    type: "LINK_FOR_MOBILE" | string
    link: string | null
    androidLink: string | null
    iosLink: string | null
    destinationId: number | null
}
export const useBannerListQuery = () => {
    const res = useGet<{ data: Banner[] }>(API.BANNER)
    const banners = getArray(res.data?.data)

    return { ...res, banners }
}
