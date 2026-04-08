"use client"
import { IconPlus } from "@/assets/icons/plus"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function IsMeButtons() {
    return (
        <>
            <Button variant="gradient" size="lg">
                <IconPlus /> <ClientTranslate translationKey="postaListing" />
            </Button>
            <Link
                href={getHref({
                    pathname: "/[locale]/news/post",
                })}
            >
                <Button variant="gradient" size="lg">
                    <IconPlus /> <ClientTranslate translationKey="createBlog" />
                </Button>
            </Link>
        </>
    )
}
