"use client"

import IconShareSquare from "@/assets/icons/share-square-icon"
import ClientImg from "@/components/common/client-img"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useEmblaState } from "@/hooks/use-embla-state"
import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { cn } from "@/lib/utils/shadcn"
import Autoplay from "embla-carousel-autoplay"
import { useNewsGlobalQuery } from "../_hooks/use-news-global-query"

interface Props {
    className?: string
}

export default function NewsCarousel({ className }: Props) {
    const { setApi, selectedIndex, scrollTo } = useEmblaState()
    const { newsGlobal } = useNewsGlobalQuery()
    const news = newsGlobal.slice(0, 3)

    return (
        <Carousel
            setApi={setApi}
            className={cn(
                "col-span-full sm:col-span-2 rounded-xl overflow-hidden text-background",
                className,
            )}
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent className="ml-0">
                {news.map((item) => {
                    return (
                        <CarouselItem
                            key={item.title}
                            className="relative pl-0 aspect-video"
                        >
                            {/* {item.videos && (
                                <BackgroundVideo
                                    src={item.main_image_url}
                                ></BackgroundVideo>
                            )} */}
                            {item.url_to_image && (
                                <ClientImg
                                    src={item.url_to_image}
                                    alt={item.title || "image news"}
                                />
                            )}
                            <article
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 50.24%, rgba(0, 0, 0, 0.32) 60.19%, rgba(0, 0, 0, 0.8) 100%)",
                                }}
                                className="absolute left-0 top-0 shadow-[inset_0_4px_154px_0px_var(--primary)] w-full h-full flex flex-col justify-end p-3"
                            >
                                <p className="font-medium text-lg mb-7">
                                    {item.title}
                                </p>
                            </article>
                            <header className="absolute top-0 left-0 w-full h-full flex justify-end p-1.5 gap-2">
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    className="hover:bg-background/20 h-6 w-6"
                                    onClick={() => {
                                        navigator.share({
                                            url: location.href,
                                            title: "INexLynk",
                                            text: "text of news",
                                        })
                                    }}
                                >
                                    <IconShareSquare />
                                </Button>
                            </header>
                            <footer className="absolute bottom-0 left-0 p-1.5 pl-3 w-full flex justify-between items-center gap-2 text-sm">
                                <p className="text-muted-foreground">
                                    {formatRelativeDate(item.published_at)}
                                </p>
                            </footer>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-foreground/20 rounded-2xl px-2 py-1">
                {news?.map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            "w-1 h-1 rounded-full bg-background/40 transition-all cursor-pointer",
                            i === selectedIndex && "w-4 bg-background",
                        )}
                        onClick={() => scrollTo(i)}
                    ></span>
                ))}
            </div>
            <CarouselPrevious className="left-3 text-foreground bg-background/80" />
            <CarouselNext className="right-3 text-foreground bg-background/80" />
        </Carousel>
    )
}
