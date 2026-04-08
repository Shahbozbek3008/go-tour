"use client"

import IconArrowUpRight from "@/assets/icons/arrow-up-right-icon"
import robot_hand from "@/assets/images/home/robot-hand.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { useLanguage } from "@/hooks/use-language"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import { RouteLiteral } from "nextjs-routes"
import { AdditionalPageType } from "../../additional-pages/[slug]/_types"

export default function Privacy() {
    const { isArabic, isUzbek, isRussian } = useLanguage()
    const links: {
        href: RouteLiteral
        page: TranslationKey
        pageType: AdditionalPageType
    }[] = [
        {
            href: getHref({
                pathname: "/[locale]/additional-pages/[slug]",
                query: { slug: "privacy_policy" },
            }),
            page: "privacyPolicy",
            pageType: "privacy_policy",
        },
        {
            href: getHref({
                pathname: "/[locale]/additional-pages/[slug]",
                query: { slug: "terms_of_use" },
            }),
            page: "termsOfUse",
            pageType: "terms_of_use",
        },
        {
            href: getHref({
                pathname: "/[locale]/additional-pages/[slug]",
                query: { slug: "cookie_policy" },
            }),
            page: "cookiePolicy",
            pageType: "cookie_policy",
        },
        {
            href: getHref({
                pathname: "/[locale]/additional-pages/[slug]",
                query: { slug: "nda_confidentiality" },
            }),
            page: "confidentiality",
            pageType: "nda_confidentiality",
        },

        {
            href: getHref({
                pathname: "/[locale]/additional-pages/[slug]",
                query: { slug: "explore_marketplace" },
            }),
            page: "userVerification",
            pageType: "explore_marketplace",
        },
        {
            href: getHref({
                pathname: "/[locale]/additional-pages/[slug]",
                query: { slug: "report_misuse_fraud" },
            }),
            page: "reportAConcern",
            pageType: "report_misuse_fraud",
        },
    ]

    return (
        <section
            style={{
                background:
                    "linear-gradient(114.28deg, #37158C 22.07%, #32147F 77.93%)",
            }}
            className={cn(
                "relative overflow-hidden",
                (isUzbek || isRussian) && "lg:pb-35",
            )}
        >
            <div className="max-w-7xl clamp-[px,5,10] mx-auto max-xs:h-[41.875rem] max-sm:h-[45.625rem] max-md:h-[51.875rem] max-lg:h-[56.25rem] lg:h-[37.5rem] flex flex-col lg:justify-between relative z-10 clamp-[py,3rem,6rem]">
                <main className="lg:max-w-[38.75rem] max-w-full relative z-10">
                    <h2 className="clamp-[text,3xl,6xl] font-medium clamp-[mb,10,14]">
                        <ClientTranslate
                            className={cn(isArabic && "leading-18")}
                            translationKey="builtOnTrust"
                        />
                    </h2>

                    <div className="flex gap-4 flex-wrap lg:max-w-xl">
                        {links.map((l, i) => {
                            return (
                                <Link
                                    key={i}
                                    href={l.href}
                                    className="rounded-4xl border border-muted-foreground hover:border-border clamp-[px,2.5,6] clamp-[py,2.5,3] font-medium hover:font-semibold text-muted-foreground hover:text-background whitespace-nowrap hover:bg-secondary/25 flex items-center gap-2.5 transition-all no-underline [&_svg]:hidden hover:[&_svg]:inline"
                                >
                                    <ClientTranslate translationKey={l.page} />
                                    <IconArrowUpRight
                                        className={cn(
                                            "[&_path]:fill-background",
                                            isArabic && "rotate-270",
                                        )}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </main>
                <Image
                    src={robot_hand}
                    alt="shield on robot hand"
                    className={cn(
                        "absolute lg:-top-50 top-40 max-xs:!top-auto max-xs:!bottom-0 max-sm:top-auto max-sm:-bottom-5 max-lg:left-1/2 max-lg:-translate-x-1/2 object-cover",
                        isArabic ? "lg:-left-50 left-0" : (
                            "lg:-right-50 right-0"
                        ),
                    )}
                />
            </div>
        </section>
    )
}
