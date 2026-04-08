"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { ChevronRight } from "lucide-react"
import NewsCard from "../../news/_components/news-card"
import NewsCarousel from "../../news/_components/news-carousel"
import { useNewsGlobalQuery } from "../../news/_hooks/use-news-global-query"

export default function News() {
    const { newsGlobal } = useNewsGlobalQuery()
    const { isArabic } = useLanguage()

    return (
        <section className="bg-background clamp-[py,14,20]">
            <main className="max-w-7xl clamp-[px,5,10] mx-auto text-foreground">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="clamp-[text,3xl,6xl] mb-6">
                        <ClientTranslate translationKey="stayAhead" />
                    </h2>
                    <p className="text-lg mb-10 sm:text-black text-text-800">
                        <ClientTranslate translationKey="stayAheadDesc" />
                    </p>
                </div>

                <div className="flex justify-end mb-7">
                    <Link
                        href={getHref({
                            pathname: "/[locale]/news",
                        })}
                    >
                        <Button variant={"link"}>
                            <ClientTranslate translationKey="exploreAll" />{" "}
                            {isArabic ?
                                <ChevronRight className="rotate-180" />
                            :   <ChevronRight />}
                        </Button>
                    </Link>
                </div>

                <div dir="ltr" className="grid gap-3 xsm:grid-cols-2 sm:hidden">
                    <NewsCarousel />
                    {newsGlobal.slice(3, 6).map((item) => (
                        <NewsCard key={item.title} item={item} />
                    ))}
                </div>

                <div
                    dir="ltr"
                    className="hidden sm:grid sm:grid-cols-[repeat(auto-fill,_minmax(18rem,_auto))] gap-3"
                >
                    <NewsCarousel />
                    {newsGlobal.slice(3).map((item) => {
                        return <NewsCard key={item.title} item={item} />
                    })}
                </div>
            </main>
        </section>
    )
}
