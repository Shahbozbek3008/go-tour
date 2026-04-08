"use client"

import IconGoogle from "@/assets/icons/google-icon"
import { Button } from "@/components/ui/button"
import { API } from "@/lib/constants/api-endpoints"
import { BASE_URL } from "@/lib/constants/base-url"
import { getDeviceInfo } from "@/lib/firebase/get-device-info"
import { getHref } from "@/lib/utils/get-href"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"

export default function GoogleAuth() {
    const locale = useLocale()
    const [redirectUrl, setRedirectUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setRedirectUrl(
            `${window.location.origin}/${locale}${getHref({ pathname: "/[locale]/oauth" })}`,
        )
    }, [locale])

    const handleAuth = async () => {
        setIsLoading(true)
        const device = await getDeviceInfo()
        const params = { ...device, redirect_url: redirectUrl }
        const queryString = new URLSearchParams(params).toString()

        window.location.href = `${BASE_URL}${API.AUTH.REGISTER.GOOGLE_AUTH}/?${queryString}`
    }

    return (
        <Button
            onClick={handleAuth}
            isLoading={isLoading}
            variant={"outline"}
            className="w-full p-3"
        >
            <IconGoogle />
        </Button>
    )
}
