"use client"

import { Button } from "@/components/ui/button"
import { useLastPage } from "@/hooks/use-last-page"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function AuthButtons() {
    const { setLastPage } = useLastPage()

    return (
        <div className="flex items-center gap-2">
            <Link href={getHref({ pathname: "/[locale]/sign-in" })}>
                <Button
                    onClick={setLastPage}
                    variant={"ghost"}
                    className="text-background"
                >
                    Log in
                </Button>
            </Link>
            <Link href={getHref({ pathname: "/[locale]/sign-up" })}>
                <Button onClick={setLastPage} variant={"gradient"}>
                    Sign up
                </Button>
            </Link>
        </div>
    )
}
