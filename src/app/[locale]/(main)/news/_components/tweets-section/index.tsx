"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import useSearch from "@/hooks/use-search"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { ChevronRight } from "lucide-react"
import { useBlogListQuery } from "../../_hooks/use-blog-list-query"
import TweetCard from "./tweet-card"

interface Props {
    className?: string
}

export default function TweetsSection({ className }: Props) {
    const search = useSearch()
    const { newsList } = useBlogListQuery()

    return (
        <section className={cn(className)}>
            <div className="relative flex items-center justify-between md:justify-center mb-10">
                <h3 className="text-2xl font-semibold text-center">
                    <ClientTranslate translationKey="voicesThatMatter" />
                </h3>
                <div className="md:absolute md:top-4 md:right-0">
                    <Link
                        href={getHref({
                            pathname: "/[locale]/news/tweets",
                            query: search,
                        })}
                    >
                        <Button variant={"link"}>
                            <ClientTranslate translationKey="exploreAll" />{" "}
                            <ChevronRight />
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="md:hidden">
                <Carousel opts={{ align: "start" }}>
                    <CarouselContent>
                        {newsList.map((t, i) => (
                            <CarouselItem key={i} className="basis-[85%]">
                                <TweetCard item={t} className="h-full" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="hidden md:grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-3">
                {newsList.map((t, i) => {
                    return <TweetCard key={i} item={t} />
                })}
            </div>
        </section>
    )
}
