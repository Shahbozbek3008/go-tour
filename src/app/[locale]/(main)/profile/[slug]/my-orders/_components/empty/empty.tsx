import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Link, useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export const EmptyOrders = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[480px]">
            <h2 className="lg:text-4xl text-2xl  font-bold tracking-tight text-foreground mb-4 leading-tight">
                <ClientTranslate translationKey="hereIsNothing" />
            </h2>

            <p className="lg:text-[15px] text-xs  text-muted-foreground max-w-[340px] leading-relaxed mb-10">
                <ClientTranslate translationKey="youHavenTBookedATourYet" />
                <br />
                <ClientTranslate translationKey="findTourInSearch" />
            </p>

            <Button
                className="rounded-lg mb-4"
                onClick={() =>
                    router.push(
                        getHref({
                            pathname: "/[locale]/catalog",
                        }),
                    )
                }
            >
                <ClientTranslate translationKey="browse_products" />
            </Button>

            <Link
                href={getHref({
                    pathname: "/[locale]",
                })}
                className="lg:text-sm text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ClientTranslate translationKey="go_home" />
            </Link>
        </div>
    )
}
