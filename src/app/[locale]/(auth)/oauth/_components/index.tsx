"use client"

import { useLastPagePersist } from "@/hooks/store/use-last-page-persist"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Index() {
    const [mounted, setMounted] = useState(false)
    const searchParams = useSearchParams()
    const { lastPage } = useLastPagePersist()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            const access = searchParams.get("access")
            const refresh = searchParams.get("refresh")

            if (access) {
                ClientTokenService.setAccessToken(access)
            }
            if (refresh) {
                ClientTokenService.setRefreshToken(refresh)
            }
            location.replace(lastPage)
        }
    }, [lastPage, mounted, searchParams])

    return null
}
