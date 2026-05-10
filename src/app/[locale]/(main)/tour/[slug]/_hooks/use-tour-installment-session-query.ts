import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { InstallmentOption } from "../_types"

export const useTourInstallmentSessionQuery = (
    args?: UseGetArgs<InstallmentOption[]>,
    sessionId?: string,
) => {
    const res = useGet<InstallmentOption[]>(
        API.TOUR.INSTALLMENT_SESSION.replace("{slug}", String(sessionId)),
        args,
    )

    const installmentSession = res?.data

    return {
        ...res,
        installmentSession,
    }
}
