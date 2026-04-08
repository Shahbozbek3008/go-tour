"use client"

import IconShareSquare from "@/assets/icons/share-square-icon"
import ClientImg from "@/components/common/client-img"
import { Button } from "@/components/ui/button"
import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { NewsGlobal } from "../../_types"

interface Props {
    item: NewsGlobal
}

export default function NewsCard({ item }: Props) {
    return (
        <main className="flex flex-col gap-3 shadow rounded-xl">
            <div className="rounded-xl overflow-hidden relative">
                <ClientImg
                    src={item.url_to_image}
                    alt={item.title || "news image"}
                    wrapperClassName="aspect-video"
                />
                <div className="flex gap-2 absolute top-2.5 right-2.5 z-10">
                    {/* <ToggleBookmark item={item} /> */}
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="hover:bg-background/20 h-7 w-7 rounded-full bg-foreground/60"
                        onClick={() => {
                            navigator.share({
                                url: location.href,
                                title: "INexlynk",
                                text: item.title,
                            })
                        }}
                    >
                        <IconShareSquare />
                    </Button>
                </div>
                {/* {item.videos && (
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-7 w-7 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-foreground/80 hover:bg-foreground/80"
                    >
                        <IconPlay />
                    </Button>
                )} */}
            </div>
            <div className="p-2 pt-0 flex flex-col gap-3">
                <p className="text-sm text-text700">
                    {formatRelativeDate(item.published_at)}
                </p>
                <a
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="line-clamp-3 font-semibold hover:text-info hover:no-underline"
                >
                    {item.title}
                </a>
                {/* <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 mr-2 text-sm">
                        <IconEye className="[&_circle]:stroke-foreground [&_path]:stroke-foreground [&_circle]:fill-foreground" />
                        {item}
                    </p>
                    <ToggleLike item={item} />
                </div> */}
            </div>
        </main>
    )
}
