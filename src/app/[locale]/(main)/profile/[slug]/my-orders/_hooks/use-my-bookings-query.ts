import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"

export const useMyBookingsQuery = (args?: UseGetArgs<any[]>) => {
    const res = useGet<any[]>(API.BOOKING.MY, args)

    const allBookings = getArray(res?.data)

    console.log(allBookings, "all-bookings")

    return { ...res, allBookings }
}
